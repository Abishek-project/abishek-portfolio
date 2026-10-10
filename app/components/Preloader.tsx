"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { finishIntro } from "@/lib/scroll";

const WORDS = ["Design", "Develop", "Deliver"];

const Preloader = () => {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const done = () => {
        document.documentElement.classList.remove("is-loading");
        finishIntro();
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(root.current, { autoAlpha: 0 });
        done();
        return;
      }

      const counter = { value: 0 };
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.from(".pl-meta", { yPercent: 100, duration: 0.8, stagger: 0.08 })
        .to(
          counter,
          {
            value: 100,
            duration: 2.2,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current)
                count.current.textContent = String(
                  Math.round(counter.value)
                ).padStart(3, "0");
            },
          },
          0.2
        )
        .fromTo(
          ".pl-bar",
          { scaleX: 0 },
          { scaleX: 1, duration: 2.2, ease: "power2.inOut" },
          0.2
        );

      // Cycle the words while counting
      WORDS.forEach((_, i) => {
        const at = 0.3 + i * 0.7;
        tl.fromTo(
          `.pl-word-${i}`,
          { yPercent: 0 },
          { yPercent: -100, duration: 0.5, ease: "power3.out" },
          at
        );
        if (i < WORDS.length - 1)
          tl.to(
            `.pl-word-${i}`,
            { yPercent: -200, duration: 0.5, ease: "power3.in" },
            at + 0.55
          );
      });

      tl.to(".pl-meta, .pl-count, .pl-word", {
        yPercent: "-=110",
        duration: 0.7,
        stagger: 0.03,
        ease: "power3.in",
      })
        .add(done, "-=0.1")
        .to(
          ".pl-panel",
          {
            yPercent: -100,
            duration: 1.1,
            stagger: 0.08,
            ease: "expo.inOut",
          },
          "-=0.25"
        )
        .set(root.current, { display: "none" });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="pl-panel h-full flex-1 bg-[#0d0b13]" />
        ))}
      </div>

      <div className="relative h-full flex flex-col justify-between p-5 md:p-10 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <div className="flex justify-between">
          <div className="overflow-hidden">
            <p className="pl-meta">Abishek J</p>
          </div>
          <div className="overflow-hidden">
            <p className="pl-meta">Portfolio ©{new Date().getFullYear()}</p>
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-6">
            <div className="relative h-[1.1em] overflow-hidden font-display text-3xl md:text-5xl normal-case tracking-tight text-paper">
              {WORDS.map((w, i) => (
                <span
                  key={w}
                  className={`pl-word pl-word-${i} absolute left-0 top-full`}
                >
                  {w}
                </span>
              ))}
              <span className="invisible">Develop</span>
            </div>
            <div className="overflow-hidden leading-none">
              <span
                ref={count}
                className="pl-count block font-display font-bold text-[22vw] md:text-[12vw] leading-[0.85] tracking-tighter text-paper"
              >
                000
              </span>
            </div>
          </div>
          <div className="mt-6 h-px w-full bg-line">
            <div className="pl-bar h-full w-full origin-left bg-gradient-to-r from-violet to-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
