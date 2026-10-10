"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Experiences } from "@/constants";
import SectionLabel from "../SectionLabel";
import SplitReveal from "../SplitReveal";

const Experience = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Timeline fill tracks scroll progress through the jobs
      gsap.fromTo(
        ".xp-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".xp-list",
            start: "top 65%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".xp-item").forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 75%" },
          defaults: { ease: "power4.out" },
        });
        tl.from(item.querySelector(".xp-dot"), { scale: 0, duration: 0.6, ease: "back.out(3)" })
          .from(item.querySelectorAll(".xp-rise"), { yPercent: 110, duration: 1.1, stagger: 0.08 }, 0)
          .from(item.querySelectorAll(".xp-fade"), { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.06 }, 0.25)
          .from(item.querySelectorAll(".xp-point"), { x: -24, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.4);

        // Card dims when not in focus
        gsap.fromTo(
          item,
          { opacity: 0.35 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top 80%", end: "top 45%", scrub: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="experience" className="relative px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="03" title="Experience" />

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SplitReveal className="font-display text-[clamp(3rem,8vw,5.25rem)] lg:text-[clamp(3rem,5vw,5.25rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]">
              Where I&apos;ve <span className="text-gradient">worked</span>
            </SplitReveal>
            <p className="mt-6 max-w-sm text-paper/60">
              Building secure, high-performance products for fintech, enterprise and
              consumer teams.
            </p>
          </div>
        </div>

        <div className="xp-list relative lg:col-span-8">
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line">
            <div className="xp-fill h-full w-full origin-top bg-gradient-to-b from-violet to-cyan" />
          </div>

          <div className="flex flex-col gap-24">
            {Experiences.map((xp, i) => (
              <article key={xp.company} className="xp-item relative pl-12 md:pl-16">
                <span className="xp-dot absolute left-0 top-2 block h-[15px] w-[15px] rounded-full border-2 border-ink bg-cyan shadow-[0_0_20px_#22d3ee]" />

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  <span className="overflow-hidden">
                    <span className="xp-rise block">0{i + 1}</span>
                  </span>
                  <span className="overflow-hidden">
                    <span className="xp-rise block">{xp.duration}</span>
                  </span>
                </div>

                <h3 className="mt-4 overflow-hidden font-display text-4xl font-bold tracking-tight md:text-6xl">
                  <span className="xp-rise block">{xp.title}</span>
                </h3>
                <p className="mt-2 overflow-hidden text-xl md:text-2xl">
                  <span className="xp-rise block text-gradient">@ {xp.company}</span>
                </p>

                <p className="xp-fade mt-6 max-w-2xl text-lg text-paper/70">{xp.description}</p>

                <ul className="mt-8 flex flex-col">
                  {xp.points.map((point) => (
                    <li
                      key={point}
                      className="xp-point group flex gap-4 border-t border-line py-4 text-paper/70 transition-colors duration-300 hover:text-paper"
                    >
                      <span className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full bg-violet transition-transform duration-300 group-hover:scale-150" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {xp.stack && (
                  <p className="xp-fade mt-4 font-mono text-xs uppercase tracking-[0.18em] text-cyan">
                    {xp.stack}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
