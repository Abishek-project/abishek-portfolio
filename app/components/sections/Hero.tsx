"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onIntro } from "@/lib/scroll";
import { useLocalTime } from "@/lib/useLocalTime";
import { Profile } from "@/constants";
import Magnetic from "../Magnetic";
import Aurora from "../Aurora";

// Rotating word in the headline: "I build ___ end to end."
const buildWords = ["AI agents", "full-stack apps", "mobile apps", "cloud platforms"];
const intro =
  "4+ years shipping AI agents, full-stack platforms and mobile apps for healthcare, banking, e-commerce and construction teams. AWS Certified Solutions Architect.";

/** Editorial headline on the left; name, intro and actions on the right. */
const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const time = useLocalTime(false);

  useGSAP(
    () => {
      const split = SplitText.create(name.current, {
        type: "chars",
        mask: "chars",
      });

      gsap.set(split.chars, { yPercent: 110 });
      gsap.set(".hero-rise", { yPercent: 110 });
      gsap.set(".hero-fade", { autoAlpha: 0, y: 24 });
      gsap.set(".hero-line", { scaleX: 0 });

      // Rotate the word (starts once the intro has played)
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      gsap.set(words, { yPercent: 110 });
      const cycle = gsap.timeline({ repeat: -1, paused: true });
      words.forEach((word, i) => {
        const next = words[(i + 1) % words.length];
        cycle
          .to(word, { yPercent: -110, duration: 0.8, ease: "power3.inOut" }, "+=1.8")
          // immediateRender off: otherwise building the loop hides the first word
          .fromTo(
            next,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.8,
              ease: "power3.inOut",
              immediateRender: false,
            },
            "<"
          );
      });

      const tl = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power4.out" },
          onComplete: () => cycle.play(),
        })
        .to(".hero-rise", { yPercent: 0, duration: 1.3, stagger: 0.09 }, 0.1)
        .to(words[0], { yPercent: 0, duration: 1.3 }, 0.19)
        .to(split.chars, { yPercent: 0, duration: 1.4, stagger: 0.05 }, 0.45)
        .to(".hero-line", { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.5)
        .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.7);

      const offIntro = onIntro(() => tl.play());

      // Hover the name: letters roll out and back in, tinted violet → cyan; roll back to white on leave
      const chars = split.chars as HTMLElement[];
      const lit = chars.map((_, i) => gsap.utils.interpolate("#a78bfa", "#22d3ee", i / (chars.length - 1)));
      const paper = "#efece6";
      let roll: gsap.core.Timeline | null = null;
      const rollTo = (colors: (i: number) => string) => {
        if (tl.progress() < 1) return;
        roll?.kill();
        roll = gsap.timeline();
        chars.forEach((c, i) => {
          roll!
            .to(c, { yPercent: -110, duration: 0.28, ease: "power2.in" }, i * 0.035)
            .set(c, { yPercent: 110, color: colors(i) })
            .to(c, { yPercent: 0, duration: 0.5, ease: "power3.out" });
        });
      };
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const el = name.current!;
        const enter = () => rollTo((i) => lit[i]);
        const leave = () => rollTo(() => paper);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        return () => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        };
      });

      // Scroll-out: name letters drift apart, content lifts and fades
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(
          split.masks,
          {
            yPercent: (i: number) => -40 - Math.abs(i - (split.masks.length - 1) / 2) * 18,
            ease: "none",
          },
          0
        )
        .to(".hero-content", { yPercent: 18, autoAlpha: 0.15, ease: "none" }, 0);

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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent"
      />

      {/* Top meta row */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        <p className="hero-fade">( {Profile.tagline} )</p>
        <p className="hero-fade">
          {Profile.location}
          <span className="mx-2 text-line">/</span>
          <span className="tabular-nums text-paper/80">{time || "--:--"}</span> IST
        </p>
      </div>

      <div className="hero-content relative grid flex-1 content-center gap-12 py-10 md:py-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <p className="hero-fade mb-6 inline-flex items-center gap-3 rounded-full border border-line bg-ink/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            {Profile.title}
            <span className="hidden sm:inline">· AWS Certified</span>
          </p>

          <h2 className="font-display text-[min(calc((100vw-2.5rem)/8.5),6.75rem,12.5svh)] md:text-[min(calc((100vw-5rem)/8.6),6.75rem,12.5svh)] lg:text-[min(calc((58.33vw-3.5rem)/8.6),6.75rem,12.5svh)] font-bold leading-[1] tracking-[-0.035em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-rise block">I build</span>
            </span>
            <span className="relative block h-[1.1em] overflow-hidden">
              {buildWords.map((word) => (
                <span key={word} className="hero-word absolute inset-0 whitespace-nowrap text-gradient">
                  {word}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-rise block text-paper/40">end to end.</span>
            </span>
          </h2>
        </div>

        {/* Name + intro on the right */}
        <div className="flex flex-col lg:col-span-5 lg:pb-3">
          <p className="hero-fade font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            ( Hello, I&apos;m )
          </p>
          <h1
            ref={name}
            className="mt-3 whitespace-nowrap font-display text-[calc((100vw-2.5rem)/7.3)] font-extrabold uppercase leading-[0.82] tracking-[-0.04em] md:text-[calc((100vw-5rem)/7.3)] lg:text-[calc((41.67vw-3.25rem)/7.3)]"
            aria-label={`${Profile.name}, ${Profile.title}`}
          >
            {Profile.firstName}
          </h1>

          <div className="hero-line mt-6 h-px w-full origin-left bg-line" />

          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between lg:flex-col lg:items-start lg:justify-start">
            <p className="hero-fade max-w-md text-lg leading-relaxed text-paper/75 md:text-xl">{intro}</p>

            <div className="hero-fade flex items-center gap-6">
              <Magnetic>
                <a
                  href="#projects"
                  data-cursor="View"
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-paper text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-transform duration-500 hover:scale-105"
                >
                  See my
                  <br />
                  work
                </a>
              </Magnetic>
              <a
                href="#about"
                aria-label="Scroll to the About section"
                className="group inline-flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-paper"
              >
                <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-line transition-colors duration-300 group-hover:border-paper/60">
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
                Scroll
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
