"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onIntro } from "@/lib/scroll";
import { useLocalTime } from "@/lib/useLocalTime";
import { Profile } from "@/constants";
import Magnetic from "../Magnetic";
import Aurora from "../Aurora";

const chips = ["AI agents", "Full-stack apps", "Mobile apps", "AWS Certified"];

/**
 * Centred, interactive hero. The giant name reacts to the cursor
 * (letters lift and light up as it passes), with a soft spotlight that follows it.
 */
const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const time = useLocalTime(false);

  useGSAP(
    () => {
      const split = SplitText.create(name.current, { type: "chars" });
      const chars = split.chars as HTMLElement[];
      const line = SplitText.create(".hs-tagline", { type: "words", mask: "words" });
      // background-clip text doesn't survive per-word transforms, so colour each word itself
      gsap.utils.toArray<HTMLElement>(".hs-grad > div > div, .hs-grad > div").forEach((w) => {
        if (!w.querySelector("div")) w.classList.add("text-gradient");
      });

      gsap.set(chars, { yPercent: 115, transformOrigin: "50% 100%" });
      gsap.set(line.words, { yPercent: 110 });
      gsap.set(".hs-fade", { autoAlpha: 0, y: 20 });
      gsap.set(".hs-chip", { autoAlpha: 0, y: 16, scale: 0.92 });

      const intro = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .to(chars, { yPercent: 0, duration: 1.4, stagger: { each: 0.06, from: "center" } }, 0.1)
        .to(line.words, { yPercent: 0, duration: 1.1, stagger: 0.05 }, 0.55)
        .to(".hs-chip", { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.07, ease: "back.out(1.6)" }, 0.85)
        .to(".hs-fade", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.9);

      const offIntro = onIntro(() => intro.play());

      const mm = gsap.matchMedia();

      // Cursor-reactive name + spotlight (pointer devices, motion allowed)
      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current!;
        gsap.set(".hs-glow", { xPercent: -50, yPercent: -50, x: section.clientWidth / 2, y: section.clientHeight / 2 });
        const glowX = gsap.quickTo(".hs-glow", "x", { duration: 0.9, ease: "power3.out" });
        const glowY = gsap.quickTo(".hs-glow", "y", { duration: 0.9, ease: "power3.out" });
        const lifts = chars.map((c) => gsap.quickTo(c, "y", { duration: 0.6, ease: "power3.out" }));
        const stretch = chars.map((c) => gsap.quickTo(c, "scaleY", { duration: 0.6, ease: "power3.out" }));

        const move = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          glowX(e.clientX - r.left);
          glowY(e.clientY - r.top);
          if (intro.progress() < 1) return;
          chars.forEach((c, i) => {
            const b = c.getBoundingClientRect();
            const dx = e.clientX - (b.left + b.width / 2);
            const dy = e.clientY - (b.top + b.height / 2);
            const f = Math.max(0, 1 - Math.hypot(dx, dy * 0.8) / (b.width * 2.2));
            lifts[i](-f * b.height * 0.1);
            stretch[i](1 + f * 0.08);
            c.style.setProperty("--lit", f.toFixed(3));
          });
        };
        const leave = () => {
          chars.forEach((c, i) => {
            lifts[i](0);
            stretch[i](1);
            c.style.setProperty("--lit", "0");
          });
        };
        section.addEventListener("pointermove", move);
        section.addEventListener("pointerleave", leave);
        return () => {
          section.removeEventListener("pointermove", move);
          section.removeEventListener("pointerleave", leave);
        };
      });

      // Scroll-out: letters drift apart from the centre, content fades
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        })
        .to(name.current, { yPercent: -30, scale: 0.92, ease: "none" }, 0)
        .to(chars, { xPercent: (i: number) => (i - (chars.length - 1) / 2) * 22, ease: "none" }, 0)
        .to(".hs-content", { autoAlpha: 0, yPercent: 10, ease: "none" }, 0);

      return () => {
        offIntro();
        mm.revert();
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-24 md:px-10 md:pb-8 md:pt-28"
    >
      {/* Atmosphere */}
      <Aurora className="pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="hs-glow pointer-events-none absolute left-0 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.28),rgba(34,211,238,0.10)_45%,transparent_70%)] opacity-0 mix-blend-screen blur-2xl transition-opacity duration-700 [@media(hover:hover)]:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <p className="hs-fade hs-content mb-8 inline-flex items-center gap-3 rounded-full border border-line bg-ink/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          {Profile.title}
          <span className="hidden sm:inline">· {Profile.currentCompany}</span>
        </p>

        {/* Padding gives the letters room to lift without being clipped */}
        <div className="w-full overflow-hidden pt-[0.06em]">
          <h1
            ref={name}
            className="hs-name whitespace-nowrap font-display text-[calc((100vw-2.5rem)/7.3)] font-extrabold uppercase leading-[0.86] tracking-[-0.04em] md:text-[calc((100vw-5rem)/7.3)]"
            aria-label={`${Profile.name}, ${Profile.title}`}
          >
            {Profile.firstName}
          </h1>
        </div>

        <div className="hs-content flex flex-col items-center">
          <p className="hs-tagline mt-8 max-w-[20ch] md:max-w-none md:whitespace-nowrap font-display text-[clamp(1.5rem,3.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            Software that <span className="hs-grad">thinks, scales</span> and ships.
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {chips.map((chip) => (
              <li
                key={chip}
                className="hs-chip rounded-full border border-line bg-paper/[0.04] px-4 py-2 text-sm text-paper/80 backdrop-blur-md transition-colors duration-300 hover:border-paper/40 hover:text-paper"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="hs-fade mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Magnetic>
              <a
                href="#contact"
                data-cursor="Say hi"
                className="inline-flex items-center gap-3 rounded-full bg-paper px-5 py-4 sm:px-7 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-transform duration-500 hover:scale-105"
              >
                Let&apos;s talk
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center rounded-full border border-line px-5 py-4 sm:px-7 font-mono text-xs uppercase tracking-[0.18em] text-paper/80 transition-colors duration-300 hover:border-paper/60 hover:text-paper"
              >
                View work
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Bottom meta row */}
      <div className="hs-fade hs-content relative mt-10 flex items-end justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <p className="whitespace-nowrap">
          {Profile.location.split(",")[0]}
          <span className="hidden sm:inline">,{Profile.location.split(",")[1]}</span>
          <span className="mx-2 text-line">/</span>
          <span className="tabular-nums text-paper/80">{time || "--:--"}</span> IST
        </p>
        <a
          href="#about"
          aria-label="Scroll to the About section"
          className="group inline-flex items-center gap-3 transition-colors duration-300 hover:text-paper"
        >
          Scroll
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line transition-colors duration-300 group-hover:border-paper/60">
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="h-4 w-4 motion-safe:animate-[scrollarrow_1.8s_cubic-bezier(.65,0,.35,1)_infinite]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v12M3 9l5 5 5-5" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
