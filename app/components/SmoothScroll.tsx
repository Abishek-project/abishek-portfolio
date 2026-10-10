"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { isIntroDone, onIntro, scrollToTarget, setLenis } from "@/lib/scroll";

const SmoothScroll = () => {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let offIntro = () => {};

    if (!reduceMotion) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);

      if (!isIntroDone()) {
        lenis.stop();
        offIntro = onIntro(() => lenis?.start());
      }
    }

    // Re-measure once web fonts settle (SplitText lines and pin spacing depend on them)
    document.fonts?.ready.then(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    // Route in-page anchor clicks through the smooth scroller
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      scrollToTarget(href === "#top" ? 0 : href);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      offIntro();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};

export default SmoothScroll;
