"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SkillGroups, type Skill } from "@/constants";
import SectionLabel from "../SectionLabel";
import SplitReveal from "../SplitReveal";

const allSkills = SkillGroups.flatMap((g) => g.skills);
const rowA = allSkills.slice(0, Math.ceil(allSkills.length / 2));
const rowB = allSkills.slice(Math.ceil(allSkills.length / 2));

const Pill = ({ skill }: { skill: Skill }) => (
  <div className="flex shrink-0 items-center gap-4 rounded-full border border-line bg-white/[0.03] py-3 pl-3 pr-7 backdrop-blur-sm">
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06]">
      <Image src={skill.image} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
    </span>
    <span className="whitespace-nowrap font-display text-2xl font-semibold md:text-3xl">
      {skill.name}
    </span>
  </div>
);

const MarqueeRow = ({ skills, reverse }: { skills: Skill[]; reverse?: boolean }) => (
  <div className="flex overflow-hidden">
    <div className={`marquee-track flex gap-4 pr-4 ${reverse ? "is-reverse" : ""}`}>
      {/* Two copies so the loop is seamless */}
      {[...skills, ...skills].map((s, i) => (
        <Pill key={`${s.name}-${i}`} skill={s} />
      ))}
    </div>
  </div>
);

const Skills = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Infinite marquees whose speed and direction react to scroll velocity
      const loops = gsap.utils.toArray<HTMLElement>(".marquee-track").map((track) => {
        const reverse = track.classList.contains("is-reverse");
        const loop = gsap.fromTo(
          track,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: 40, ease: "none", repeat: -1 }
        );
        // Start deep into the repeats so a negative timeScale never hits time 0
        return loop.totalTime(loop.duration() * 1000);
      });

      let direction = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          direction = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
          loops.forEach((loop) =>
            gsap.to(loop, { timeScale: boost * direction, duration: 0.2, overwrite: true })
          );
          gsap.to(".marquee-skew", {
            skewX: gsap.utils.clamp(-8, 8, self.getVelocity() / -250),
            duration: 0.3,
            overwrite: true,
          });
        },
      });

      // Ease back to cruising speed after scrolling stops
      let idle: ReturnType<typeof setTimeout>;
      const settle = () => {
        clearTimeout(idle);
        idle = setTimeout(() => {
          loops.forEach((loop) =>
            gsap.to(loop, { timeScale: direction, duration: 1.2, ease: "power2.out", overwrite: true })
          );
          gsap.to(".marquee-skew", { skewX: 0, duration: 0.8, ease: "power3.out" });
        }, 120);
      };
      window.addEventListener("scroll", settle, { passive: true });

      // Category columns
      gsap.utils.toArray<HTMLElement>(".skill-group").forEach((group) => {
        gsap
          .timeline({ scrollTrigger: { trigger: group, start: "top 85%" } })
          .from(group.querySelector(".sg-line"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
          .from(group.querySelectorAll(".sg-item"), {
            y: 30,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: "power3.out",
          }, "<0.3");
      });

      return () => {
        clearTimeout(idle);
        window.removeEventListener("scroll", settle);
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="skills" className="relative overflow-hidden py-28 md:py-40">
      <div className="px-5 md:px-10">
        <SectionLabel index="02" title="Toolkit" />
        <SplitReveal className="mt-16 font-display text-[clamp(3rem,9vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]">
          Skills <span className="text-outline">&amp; Stack</span>
        </SplitReveal>
      </div>

      <div className="marquee-skew mt-16 flex flex-col gap-4">
        <MarqueeRow skills={rowA} />
        <MarqueeRow skills={rowB} reverse />
      </div>

      <div className="mt-24 grid gap-12 px-5 md:grid-cols-3 md:px-10">
        {SkillGroups.map((group, gi) => (
          <div key={group.title} className="skill-group">
            <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span>{group.title}</span>
              <span>0{gi + 1}</span>
            </div>
            <div className="sg-line mt-3 h-px w-full origin-left bg-line" />
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {group.skills.map((s) => (
                <li
                  key={s.name}
                  className="sg-item group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 transition-colors duration-300 hover:border-line hover:bg-white/[0.03]"
                >
                  <Image
                    src={s.image}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain grayscale transition duration-300 group-hover:grayscale-0"
                  />
                  <span className="text-sm text-paper/80">{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
