"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Pulls its child toward the pointer while hovered, then springs back. */
const Magnetic = ({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) => {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const node = el.current;
    if (!node || !window.matchMedia("(hover: hover)").matches) return;

    const xTo = gsap.quickTo(node, "x", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.8, ease: "elastic.out(1, 0.35)" });

    const move = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
    };
  });

  return (
    <div ref={el} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

export default Magnetic;
