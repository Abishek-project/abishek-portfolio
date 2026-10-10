"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntro, getLenis } from "@/lib/scroll";
import { NavLinks, Profile, Socials } from "@/constants";

/** Text that rolls up to a duplicate of itself on hover. */
export const RollText = ({ children }: { children: string }) => (
  <span className="relative inline-block overflow-hidden align-top">
    <span className="block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-full">
      {children}
    </span>
    <span
      aria-hidden
      className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-full"
    >
      {children}
    </span>
  </span>
);

const Navbar = () => {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline>();
  const [open, setOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      // Resolve now: the intro callback fires inside the preloader's scope
      const items = gsap.utils.toArray<HTMLElement>(".nav-item");
      gsap.set(items, { yPercent: -150 });
      const off = onIntro(() =>
        gsap.to(items, {
          yPercent: 0,
          duration: 1,
          stagger: 0.06,
          ease: "power4.out",
          delay: 0.9,
        })
      );

      // Hide while scrolling down, reveal when scrolling up
      ScrollTrigger.create({
        start: 120,
        end: "max",
        toggleClass: { targets: bar.current!, className: "is-scrolled" },
        onUpdate: (self) =>
          gsap.to(bar.current, {
            yPercent: self.direction === 1 ? -100 : 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
          }),
        onLeaveBack: () => gsap.to(bar.current, { yPercent: 0, duration: 0.5 }),
      });

      menuTl.current = gsap
        .timeline({ paused: true })
        .set(menu.current, { display: "flex" })
        .fromTo(
          menu.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" }
        )
        .from(
          ".menu-link",
          { yPercent: 110, duration: 0.8, stagger: 0.06, ease: "power4.out" },
          "-=0.35"
        )
        .from(".menu-foot", { autoAlpha: 0, y: 20, duration: 0.5 }, "-=0.5");

      return off;
    },
    { scope: root }
  );

  const toggle = contextSafe((next: boolean) => {
    setOpen(next);
    const lenis = getLenis();
    if (next) {
      lenis?.stop();
      menuTl.current?.timeScale(1).play();
    } else {
      lenis?.start();
      menuTl.current?.timeScale(1.6).reverse();
    }
  });

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50">
      <nav
        ref={bar}
        className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10 text-paper transition-[background-color,backdrop-filter] duration-500"
      >
        <div className="overflow-hidden">
          <a
            href="#top"
            className="nav-item group block font-display text-lg font-bold tracking-tight"
            onClick={() => open && toggle(false)}
          >
            <RollText>{`${Profile.name} ©`}</RollText>
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.18em]">
          {NavLinks.map((link) => (
            <li key={link.href} className="overflow-hidden">
              <a href={link.href} className="nav-item group block">
                <RollText>{link.label}</RollText>
              </a>
            </li>
          ))}
        </ul>

        <div className="overflow-hidden md:hidden">
          <button
            type="button"
            onClick={() => toggle(!open)}
            className="nav-item group block font-mono text-xs uppercase tracking-[0.18em]"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <RollText>{open ? "Close" : "Menu"}</RollText>
          </button>
        </div>
      </nav>

      <div
        ref={menu}
        id="mobile-menu"
        className="fixed inset-0 hidden flex-col justify-between bg-[#0d0b13] px-5 pb-8 pt-28"
      >
        <ul className="flex flex-col gap-1">
          {NavLinks.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                onClick={() => toggle(false)}
                className="menu-link flex items-baseline gap-4 font-display text-[13vw] font-bold leading-[1.05] tracking-tight"
              >
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-foot flex justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {Socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.name} ↗
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
