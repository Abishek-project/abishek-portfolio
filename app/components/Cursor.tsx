"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Dot + trailing ring cursor. Elements with `data-cursor="Label"` expand the
 * ring and show the label; any link or button gives a subtle grow.
 */
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useGSAP(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    let current: Element | null = null;
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest(
        "[data-cursor], a, button, input, textarea"
      );
      if (target === current) return;
      current = target;

      const text = target?.getAttribute("data-cursor") ?? "";
      setLabel(text);
      gsap.to(ring.current, {
        width: text ? 96 : target ? 56 : 36,
        height: text ? 96 : target ? 56 : 36,
        backgroundColor: text ? "rgba(239,236,230,1)" : "rgba(239,236,230,0)",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.25 });
    };

    const leave = () => {
      shown = false;
      gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] invisible flex h-9 w-9 items-center justify-center rounded-full border border-paper/60 mix-blend-difference opacity-0"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
          {label}
        </span>
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[96] invisible h-1.5 w-1.5 rounded-full bg-paper mix-blend-difference opacity-0"
      />
    </>
  );
};

export default Cursor;
