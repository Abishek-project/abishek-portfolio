"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SectionLabel = ({ index, title }: { index: string; title: string }) => {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ scrollTrigger: { trigger: el.current, start: "top 90%" } })
        .from(".sl-line", { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
        .from(".sl-text", { yPercent: 110, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.3);
    },
    { scope: el }
  );

  return (
    <div ref={el} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
      <div className="flex items-center justify-between">
        <span className="overflow-hidden">
          <span className="sl-text block">( {index} )</span>
        </span>
        <span className="overflow-hidden">
          <span className="sl-text block">{title}</span>
        </span>
      </div>
      <div className="sl-line mt-3 h-px w-full origin-left bg-line" />
    </div>
  );
};

export default SectionLabel;
