"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { Projects as ProjectList, Socials } from "@/constants";
import SectionLabel from "../SectionLabel";
import SplitReveal from "../SplitReveal";
import { RollText } from "../Navbar";
import ProjectArt from "../ProjectArt";

const github = Socials.find((s) => s.name === "GitHub")!.url;

const Projects = () => {
  const root = useRef<HTMLElement>(null);
  const openRef = useRef<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      // Rows draw their rule, then the text rises in
      gsap.utils.toArray<HTMLElement>(".pj-row").forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 90%" } })
          .from(row.querySelector(".pj-line"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
          .from(row.querySelectorAll(".pj-rise"), {
            yPercent: 115,
            duration: 1,
            stagger: 0.06,
            ease: "power4.out",
          }, 0.25);
      });

      gsap.utils.toArray<HTMLElement>(".pj-name").forEach((el) =>
        SplitText.create(el, { type: "words,chars", charsClass: "pj-char" })
      );
    },
    { scope: root }
  );

  // Fill sweeps in from whichever edge the pointer crossed, and leaves the same way
  const edgeOf = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return e.clientY < r.top + r.height / 2 ? "top" : "bottom";
  };
  const hidden = { top: "inset(0% 0% 100% 0%)", bottom: "inset(100% 0% 0% 0%)" };

  const enter = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const head = e.currentTarget;
    gsap.fromTo(
      head.querySelector(".pj-fill"),
      { clipPath: hidden[edgeOf(e)] },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power3.out", overwrite: true }
    );
    gsap.to(head.querySelectorAll(".pj-char"), {
      yPercent: -100,
      duration: 0.55,
      stagger: 0.018,
      ease: "power3.inOut",
      overwrite: true,
    });
    gsap.to(head.querySelector(".pj-shift"), { x: 28, duration: 0.6, ease: "power3.out" });
  });

  const leave = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const head = e.currentTarget;
    gsap.to(head.querySelector(".pj-fill"), {
      clipPath: hidden[edgeOf(e)],
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(head.querySelectorAll(".pj-char"), {
      yPercent: 0,
      duration: 0.5,
      stagger: 0.012,
      ease: "power3.inOut",
      overwrite: true,
    });
    gsap.to(head.querySelector(".pj-shift"), { x: 0, duration: 0.6, ease: "power3.out" });
  });

  const toggle = contextSafe((i: number) => {
    const rows = gsap.utils.toArray<HTMLElement>(".pj-row");
    const prev = openRef.current;
    const next = prev === i ? null : i;

    if (prev !== null) {
      gsap.to(rows[prev].querySelector(".pj-body"), { height: 0, duration: 0.8, ease: "expo.inOut" });
      gsap.to(rows[prev].querySelector(".pj-plus"), { rotate: 0, duration: 0.6, ease: "power3.inOut" });
    }

    if (next !== null) {
      const row = rows[next];
      gsap.fromTo(
        row.querySelector(".pj-body"),
        { height: 0 },
        { height: "auto", duration: 1, ease: "expo.inOut" }
      );
      gsap.to(row.querySelector(".pj-plus"), { rotate: 135, duration: 0.6, ease: "power3.inOut" });
      gsap.fromTo(
        row.querySelectorAll(".pj-detail"),
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.07, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        row.querySelector(".pj-art"),
        { clipPath: "inset(100% 0% 0% 0% round 16px)", scale: 1.06 },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          scale: 1,
          duration: 1.3,
          ease: "expo.out",
          delay: 0.3,
        }
      );
    }

    openRef.current = next;
    setOpen(next);
    gsap.delayedCall(1.05, () => ScrollTrigger.refresh());
  });

  return (
    <section ref={root} id="projects" className="relative px-5 py-28 md:px-10 md:py-40">
      <SectionLabel index="04" title="Selected work" />

      <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
        <SplitReveal className="font-display text-[clamp(3rem,9vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]">
          Selected <span className="text-outline">Work</span>
        </SplitReveal>
        <p className="max-w-xs text-paper/60">
          Products I&apos;ve designed and engineered end-to-end. Tap a project to dig in.
        </p>
      </div>

      <ul className="mt-16">
        {ProjectList.map((p, i) => {
          const isOpen = open === i;
          return (
            <li key={p.title} className="pj-row relative">
              <div className="pj-line absolute inset-x-0 top-0 h-px origin-left bg-line" />

              <button
                type="button"
                onClick={() => toggle(i)}
                onPointerEnter={enter}
                onPointerLeave={leave}
                aria-expanded={isOpen}
                aria-controls={`project-${i}`}
                data-cursor={isOpen ? "Close" : "Open"}
                className="relative block w-full overflow-hidden text-left"
              >
                <span
                  aria-hidden
                  className="pj-fill absolute inset-0 [clip-path:inset(100%_0%_0%_0%)]"
                  style={{ background: p.accent }}
                />
                <span className="relative grid grid-cols-12 items-center gap-4 py-6 md:px-4 md:py-8">
                  <span className="col-span-2 overflow-hidden font-mono text-xs text-muted md:col-span-1">
                    <span className="pj-rise block">0{i + 1}</span>
                  </span>

                  <span className="col-span-8 overflow-hidden md:col-span-7">
                    <span className="pj-rise block">
                      <span className="pj-shift relative block overflow-hidden pb-[0.06em] font-display text-[clamp(1.9rem,5vw,5.5rem)] font-bold uppercase leading-[1] tracking-[-0.03em]">
                        <span className="pj-name block">{p.title}</span>
                        <span aria-hidden className="pj-name absolute left-0 top-0 block translate-y-full">
                          {p.title}
                        </span>
                      </span>
                    </span>
                  </span>

                  <span className="col-span-3 hidden overflow-hidden font-mono text-xs uppercase tracking-[0.16em] text-paper/60 md:block">
                    <span className="pj-rise flex flex-col items-start gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] ${
                          p.kind === "Personal" ? "border-line" : "border-paper/60 text-paper"
                        }`}
                      >
                        {p.kind}
                      </span>
                      {p.subtitle}
                    </span>
                  </span>

                  <span className="col-span-2 flex justify-end md:col-span-1">
                    <span className="pj-rise relative flex h-11 w-11 items-center justify-center rounded-full border border-line md:h-14 md:w-14">
                      <span className="pj-plus relative block h-4 w-4">
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-paper" />
                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-paper" />
                      </span>
                    </span>
                  </span>
                </span>
              </button>

              <div id={`project-${i}`} className="pj-body h-0 overflow-hidden">
                <div className="grid gap-10 pb-14 pt-6 md:grid-cols-12 md:px-4">
                  <div className="flex flex-col gap-6 md:col-span-5 md:col-start-2">
                    <div className="pj-detail">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                        {p.kind === "Client"
                          ? `Client project — ${p.company}`
                          : p.kind === "Product"
                            ? `Company product — ${p.company}`
                            : "Personal project"}
                      </p>
                      <p className="text-gradient mt-2 font-display text-2xl font-semibold">{p.subtitle}</p>
                    </div>
                    <p className="pj-detail text-lg leading-relaxed text-paper/70">{p.description}</p>
                    {p.highlights && (
                      <ul className="pj-detail flex flex-col">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex gap-3 border-t border-line py-3 text-paper/70">
                            <span
                              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: p.accent }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="pj-detail flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.note && (
                      <p className="pj-detail flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                        {p.note}
                      </p>
                    )}
                    {p.links.length > 0 && (
                      <div className="pj-detail flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.18em]">
                        {p.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border-b border-line pb-1"
                          >
                            <RollText>{`${link.label} ↗`}</RollText>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pj-art relative aspect-[8/5] overflow-hidden rounded-2xl border border-line md:col-span-6 md:aspect-auto md:h-[420px]">
                    <ProjectArt art={p.art} accent={p.accent} title={p.title} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}

        <li className="pj-row relative">
          <div className="pj-line absolute inset-x-0 top-0 h-px origin-left bg-line" />
          <div className="flex items-center justify-between py-8 font-mono text-xs uppercase tracking-[0.18em] text-muted md:px-4">
            <span className="overflow-hidden">
              <span className="pj-rise block">More experiments &amp; side projects</span>
            </span>
            <span className="overflow-hidden">
              <a href={github} target="_blank" rel="noopener noreferrer" className="pj-rise group block text-paper">
                <RollText>GitHub ↗</RollText>
              </a>
            </span>
          </div>
        </li>
      </ul>

    </section>
  );
};

export default Projects;
