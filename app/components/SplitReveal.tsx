"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: "h2" | "h3" | "p" | "div";
  className?: string;
  children: React.ReactNode;
  /** "lines" rises line by line, "chars" letter by letter */
  by?: "lines" | "chars" | "words";
  delay?: number;
};

/** Text that rises out of a mask when scrolled into view. */
const SplitReveal = ({
  as: Tag = "h2",
  className = "",
  children,
  by = "lines",
  delay = 0,
}: Props) => {
  const el = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      SplitText.create(el.current, {
        type: by === "lines" ? "lines" : `words,${by}`,
        mask: by,
        linesClass: "split-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self[by], {
            yPercent: 115,
            rotate: by === "lines" ? 3 : 0,
            duration: by === "chars" ? 1 : 1.2,
            stagger: by === "chars" ? 0.025 : 0.1,
            ease: "power4.out",
            delay,
            scrollTrigger: { trigger: el.current, start: "top 85%" },
          }),
      });
    },
    { scope: el }
  );

  return (
    <Tag ref={el as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
};

export default SplitReveal;
