import type Lenis from "lenis";

// Shared state between the preloader, the smooth scroller and the hero intro.
let lenis: Lenis | null = null;
let introDone = false;
const introListeners = new Set<() => void>();

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export const isIntroDone = () => introDone;

/** Runs `cb` once the preloader has finished (immediately if it already has). */
export const onIntro = (cb: () => void) => {
  if (introDone) {
    cb();
    return () => {};
  }
  introListeners.add(cb);
  return () => {
    introListeners.delete(cb);
  };
};

export const finishIntro = () => {
  if (introDone) return;
  introDone = true;
  introListeners.forEach((cb) => cb());
  introListeners.clear();
};

export const scrollToTarget = (target: string | number) => {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
};
