"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { Profile, Stats } from "@/constants";
import SectionLabel from "../SectionLabel";

const About = () => {
  const root = useRef<HTMLElement>(null);
  const copy = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // Words light up as you scroll through the paragraph
      SplitText.create(copy.current, {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.12 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: {
                trigger: copy.current,
                start: "top 80%",
                end: "bottom 45%",
                scrub: true,
              },
            }
          ),
      });

      // Count-up stats
      gsap.utils.toArray<HTMLElement>(".stat").forEach((stat, i) => {
        const num = stat.querySelector<HTMLElement>(".stat-num")!;
        const target = Number(num.dataset.value);
        const counter = { v: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: stat, start: "top 88%" } })
          .from(stat, { y: 60, autoAlpha: 0, duration: 1, ease: "power3.out", delay: i * 0.08 })
          .from(stat.querySelector(".stat-bar"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, "<0.1")
          .to(counter, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => (num.textContent = String(Math.round(counter.v))),
          }, "<");
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="relative px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="01" title="About me" />

      <p
        ref={copy}
        className="mt-16 max-w-6xl font-display text-[clamp(1.9rem,4.6vw,4.2rem)] font-semibold leading-[1.08] tracking-tight"
      >
        {Profile.about}
      </p>

      <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
        {Stats.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-bar h-px w-full origin-left bg-gradient-to-r from-violet to-cyan" />
            <p className="mt-6 font-display text-6xl font-bold tracking-tight md:text-7xl">
              <span className="stat-num" data-value={s.value}>
                0
              </span>
              <span className="text-gradient">{s.suffix}</span>
            </p>
            <p className="mt-3 max-w-[16rem] text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
