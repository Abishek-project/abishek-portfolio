"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onIntro } from "@/lib/scroll";
import { Profile } from "@/constants";
import Magnetic from "../Magnetic";

const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(name.current, {
        type: "chars",
        mask: "chars",
      });

      gsap.set(split.chars, { yPercent: 110 });
      gsap.set(".hero-fade", { autoAlpha: 0, y: 24 });
      gsap.set(".hero-line", { scaleX: 0 });

      const intro = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .to(split.chars, { yPercent: 0, duration: 1.4, stagger: 0.06 }, 0.2)
        .to(".hero-line", { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.4)
        .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.8)
        .from(".hero-video", { scale: 1.3, autoAlpha: 0, duration: 2.4, ease: "power2.out" }, 0);

      const offIntro = onIntro(() => intro.play());

      // Cycle through roles
      const roles = gsap.utils.toArray<HTMLElement>(".hero-role");
      gsap.set(roles, { yPercent: 100 });
      gsap.set(roles[0], { yPercent: 0 });
      const cycle = gsap.timeline({ repeat: -1, delay: 3 });
      roles.forEach((role, i) => {
        const next = roles[(i + 1) % roles.length];
        cycle
          .to(role, { yPercent: -100, duration: 0.7, ease: "power3.inOut" }, "+=2")
          .fromTo(next, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: "power3.inOut" }, "<");
      });

      // Scroll-out: letters drift apart, content lifts and fades
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      scrollTl
        .to(split.masks, {
          yPercent: (i: number) => -40 - Math.abs(i - (split.masks.length - 1) / 2) * 18,
          ease: "none",
        }, 0)
        .to(".hero-content", { yPercent: 25, autoAlpha: 0.2, ease: "none" }, 0)
        .to(".hero-video-wrap", { yPercent: 30, scale: 1.15, ease: "none" }, 0);

      // Glow follows the pointer
      gsap.set(glow.current, { xPercent: -50, yPercent: -50, x: "50vw", y: "40vh" });
      const xTo = gsap.quickTo(glow.current, "x", { duration: 1.2, ease: "power3" });
      const yTo = gsap.quickTo(glow.current, "y", { duration: 1.2, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = root.current!.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      root.current?.addEventListener("pointermove", move);

      return () => {
        offIntro();
        root.current?.removeEventListener("pointermove", move);
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pb-10"
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-video-wrap absolute inset-0 [mask-image:linear-gradient(to_bottom,black_35%,transparent_75%)]">
          <video
            className="hero-video absolute left-[-30%] top-[-20vw] w-[160%] max-w-none opacity-70 mix-blend-screen md:left-0 md:top-[-12vw] md:w-full"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/blackhole.webm" type="video/webm" />
          </video>
        </div>
        <div
          ref={glow}
          className="absolute left-0 top-0 h-[24rem] w-[24rem] rounded-full md:h-[40rem] md:w-[40rem] bg-violet/20 blur-[120px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      </div>

      <div className="hero-content relative">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <p className="hero-fade">( Portfolio — {new Date().getFullYear()} )</p>
          <p className="hero-fade">Based in {Profile.location}</p>
        </div>

        <h1
          ref={name}
          className="whitespace-nowrap font-display text-[calc((100vw-2.5rem)/7.3)] font-extrabold uppercase leading-[0.82] tracking-[-0.04em] md:text-[calc((100vw-5rem)/7.3)]"
          aria-label={Profile.name}
        >
          {Profile.firstName}
        </h1>

        <div className="hero-line mt-6 h-px w-full origin-left bg-line" />

        <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="hero-fade md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Currently
            </p>
            <div className="relative mt-2 h-[1.2em] overflow-hidden font-display text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold">
              {Profile.roles.map((role) => (
                <span key={role} className="hero-role absolute inset-0 whitespace-nowrap text-gradient">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <p className="hero-fade max-w-md text-base leading-relaxed text-paper/70 md:col-span-4 md:text-lg">
            {Profile.intro}
          </p>

          <div className="hero-fade flex items-center justify-between gap-6 md:col-span-3 md:justify-end">
            <Magnetic>
              <a
                href="#contact"
                data-cursor="Say hi"
                className="flex h-28 w-28 items-center justify-center rounded-full bg-paper text-center font-mono text-xs uppercase tracking-[0.18em] text-ink transition-transform duration-500 hover:scale-105"
              >
                Let&apos;s
                <br />
                talk
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="hero-fade mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <span className="relative block h-8 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-paper" />
          </span>
          Scroll to explore
        </div>
      </div>
    </section>
  );
};

export default Hero;
