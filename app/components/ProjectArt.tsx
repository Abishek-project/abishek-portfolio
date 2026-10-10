"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Hand-built vector cover art for each project, animated with GSAP.
 * Every scene is drawn on an 800×500 canvas and fills its container.
 */

const Frame = ({
  id,
  accent,
  children,
}: {
  id: string;
  accent: string;
  children: React.ReactNode;
}) => (
  <>
    <defs>
      <radialGradient id={`${id}-glow`} cx="50%" cy="100%" r="75%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <pattern id={`${id}-dots`} width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#fff" fillOpacity="0.09" />
      </pattern>
    </defs>
    <rect width="800" height="500" fill="#0e0d13" />
    <rect width="800" height="500" fill={`url(#${id}-dots)`} />
    <rect width="800" height="500" fill={`url(#${id}-glow)`} />
    {children}
  </>
);

const Sparkles = ({ points }: { points: [number, number, number][] }) => (
  <g className="art-spark" fill="#fff">
    {points.map(([x, y, s], i) => (
      <path
        key={i}
        d={`M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`}
      />
    ))}
  </g>
);

/* ─────────────────────────── EazyBuy ─────────────────────────── */

const products = [
  { x: 92, y: 96, r: -9, from: "#f472b6", to: "#fb7185", price: 64 },
  { x: 584, y: 72, r: 7, from: "#2dd4bf", to: "#38bdf8", price: 48 },
  { x: 604, y: 290, r: -5, from: "#fbbf24", to: "#fb923c", price: 56 },
  { x: 104, y: 300, r: 6, from: "#a78bfa", to: "#818cf8", price: 40 },
];

const EazyBuyArt = ({ accent }: { accent: string }) => (
  <Frame id="eb" accent={accent}>
    <defs>
      <linearGradient id="eb-bag" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#5b46d6" />
      </linearGradient>
      {products.map((p, i) => (
        <linearGradient key={i} id={`eb-p${i}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
      ))}
    </defs>

    {/* Dashed flight paths from products into the bag */}
    <g stroke="#fff" strokeOpacity="0.14" strokeWidth="1.5" strokeDasharray="4 7" fill="none">
      <path className="art-path" d="M222 170 C 290 170, 300 230, 340 250" />
      <path className="art-path" d="M584 140 C 520 150, 500 220, 462 246" />
      <path className="art-path" d="M604 360 C 540 360, 510 320, 470 300" />
      <path className="art-path" d="M234 370 C 290 360, 300 320, 336 300" />
    </g>

    {products.map((p, i) => (
      <g key={i} className="art-float" data-amp={10 + i * 3}>
        <g transform={`translate(${p.x} ${p.y}) rotate(${p.r} 65 72)`}>
          <rect width="130" height="144" rx="18" fill="#1a1825" stroke="#fff" strokeOpacity="0.1" />
          <rect x="10" y="10" width="110" height="78" rx="12" fill={`url(#eb-p${i})`} />
          <circle cx="65" cy="49" r="20" fill="#fff" fillOpacity="0.28" />
          <rect x="12" y="100" width="72" height="8" rx="4" fill="#fff" fillOpacity="0.7" />
          <rect x="12" y="118" width={p.price} height="10" rx="5" fill={accent} />
          <circle cx="108" cy="122" r="11" fill="#fff" fillOpacity="0.12" />
          <path d="M103 122h10M108 117v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    ))}

    {/* Shopping bag */}
    <g className="art-bag">
      <ellipse cx="400" cy="392" rx="96" ry="12" fill="#000" fillOpacity="0.45" />
      <path
        d="M362 196v-22a38 38 0 0 1 76 0v22"
        fill="none"
        stroke="#e9e5ff"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path d="M318 196h164l14 176a18 18 0 0 1-18 20H322a18 18 0 0 1-18-20Z" fill="url(#eb-bag)" />
      <path d="M318 196h164l3 34H315Z" fill="#fff" fillOpacity="0.12" />
      <circle cx="362" cy="214" r="6" fill="#2b1f73" />
      <circle cx="438" cy="214" r="6" fill="#2b1f73" />
      <text
        x="400"
        y="318"
        textAnchor="middle"
        fontSize="54"
        fontWeight="800"
        fill="#fff"
        style={{ fontFamily: "var(--font-display)" }}
      >
        E
      </text>
    </g>

    {/* Cart badge */}
    <g className="art-badge">
      <circle cx="486" cy="196" r="22" fill="#f43f5e" />
      <text
        x="486"
        y="203"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill="#fff"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        4
      </text>
    </g>

    {/* Checkout pill */}
    <g className="art-pill">
      <rect x="306" y="420" width="188" height="46" rx="23" fill="#efece6" />
      <text
        x="400"
        y="449"
        textAnchor="middle"
        fontSize="15"
        fontWeight="600"
        fill="#08070b"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Checkout · ₹2,450 →
      </text>
    </g>

    <Sparkles points={[[270, 120, 7], [520, 250, 5], [470, 120, 6], [300, 420, 4], [720, 220, 6]]} />
  </Frame>
);

/* ─────────────────────────── GroupSync ─────────────────────────── */

const tiles = [
  { skin: "#f2c6a0", shirt: "#6366f1", name: 54 },
  { skin: "#c68b5e", shirt: "#0ea5e9", name: 40 },
  { skin: "#8d5a3b", shirt: "#f59e0b", name: 62 },
  { skin: "#e8b48e", shirt: "#10b981", name: 46 },
  { skin: "#a8714f", shirt: "#ec4899", name: 58 },
  { skin: "#f5d0b5", shirt: "#8b5cf6", name: 36 },
];
const TILE = { w: 186, h: 128, gapX: 18, gapY: 18, x0: 113, y0: 64 };
const tilePos = (i: number) => ({
  x: TILE.x0 + (i % 3) * (TILE.w + TILE.gapX),
  y: TILE.y0 + Math.floor(i / 3) * (TILE.h + TILE.gapY),
});

const GroupSyncArt = ({ accent }: { accent: string }) => (
  <Frame id="gs" accent={accent}>
    {/* Live timer */}
    <g style={{ fontFamily: "var(--font-mono)" }}>
      <rect x="113" y="24" width="96" height="26" rx="13" fill="#ef4444" fillOpacity="0.16" />
      <circle className="art-live" cx="128" cy="37" r="4.5" fill="#ef4444" />
      <text x="140" y="42" fontSize="12" fill="#fca5a5" letterSpacing="1">
        LIVE 42:18
      </text>
      <text x="687" y="42" fontSize="12" fill="#fff" fillOpacity="0.45" textAnchor="end" letterSpacing="1">
        6 PARTICIPANTS
      </text>
    </g>

    {tiles.map((t, i) => {
      const { x, y } = tilePos(i);
      return (
        <g key={i} transform={`translate(${x} ${y})`}>
          <clipPath id={`gs-clip${i}`}>
            <rect width={TILE.w} height={TILE.h} rx="14" />
          </clipPath>
          <rect width={TILE.w} height={TILE.h} rx="14" fill="#191922" />
          <g clipPath={`url(#gs-clip${i})`} className="art-person" data-i={i}>
            <ellipse cx={TILE.w / 2} cy={TILE.h + 14} rx="52" ry="40" fill={t.shirt} />
            <circle cx={TILE.w / 2} cy="56" r="26" fill={t.skin} />
          </g>
          <rect x="10" y={TILE.h - 26} width={t.name + 24} height="18" rx="9" fill="#000" fillOpacity="0.5" />
          <rect x="18" y={TILE.h - 19} width={t.name} height="4" rx="2" fill="#fff" fillOpacity="0.7" />
          {/* audio meter */}
          <g transform={`translate(${TILE.w - 30} 12)`}>
            {[0, 1, 2].map((b) => (
              <rect
                key={b}
                className={`art-meter art-meter-${i}`}
                x={b * 6}
                y="0"
                width="3.5"
                height="14"
                rx="1.75"
                fill="#fff"
                fillOpacity="0.75"
              />
            ))}
          </g>
        </g>
      );
    })}

    {/* Active-speaker ring that hops between tiles */}
    <rect
      className="art-speaker"
      x={TILE.x0}
      y={TILE.y0}
      width={TILE.w}
      height={TILE.h}
      rx="14"
      fill="none"
      stroke={accent}
      strokeWidth="3"
    />

    {/* Call controls */}
    <g transform="translate(262 372)">
      <rect width="276" height="64" rx="32" fill="#1c1c26" stroke="#fff" strokeOpacity="0.08" />
      {/* mic */}
      <circle cx="46" cy="32" r="21" fill="#fff" fillOpacity="0.1" />
      <rect x="41" y="20" width="10" height="16" rx="5" fill="#fff" />
      <path d="M36 31a10 10 0 0 0 20 0M46 41v5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* camera */}
      <circle cx="106" cy="32" r="21" fill="#fff" fillOpacity="0.1" />
      <rect x="94" y="25" width="16" height="14" rx="3" fill="#fff" />
      <path d="M111 30l8-4v12l-8-4Z" fill="#fff" />
      {/* share */}
      <circle cx="166" cy="32" r="21" fill={accent} />
      <rect x="155" y="24" width="22" height="15" rx="3" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M166 35v-7M162.5 31l3.5-3.5 3.5 3.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* hang up */}
      <rect x="208" y="14" width="50" height="36" rx="18" fill="#ef4444" />
      <path
        d="M220 34c6-6 20-6 26 0l-3 4-5-2v-3c-3-1-7-1-10 0v3l-5 2Z"
        fill="#fff"
      />
    </g>
  </Frame>
);

/* ─────────────────────────── Nova AI ─────────────────────────── */

const BARS = 34;

const NovaArt = ({ accent }: { accent: string }) => (
  <Frame id="nv" accent={accent}>
    <defs>
      <radialGradient id="nv-orb" cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#fdf4ff" />
        <stop offset="28%" stopColor="#f0abfc" />
        <stop offset="62%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#3b82f6" />
      </radialGradient>
      <radialGradient id="nv-halo">
        <stop offset="0%" stopColor="#d946ef" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="nv-bar" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="50%" stopColor="#e879f9" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>

    <circle cx="400" cy="210" r="170" fill="url(#nv-halo)" className="art-halo" />
    {[0, 1, 2].map((i) => (
      <circle
        key={i}
        className="art-ring"
        cx="400"
        cy="210"
        r="82"
        fill="none"
        stroke="#f0abfc"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
    ))}
    <circle className="art-orb" cx="400" cy="210" r="78" fill="url(#nv-orb)" />
    <ellipse cx="378" cy="180" rx="26" ry="16" fill="#fff" fillOpacity="0.35" />

    {/* Waveform */}
    <g>
      {Array.from({ length: BARS }, (_, i) => {
        const x = 400 - ((BARS - 1) * 12) / 2 + i * 12;
        return (
          <rect
            key={i}
            className="art-bar"
            x={x - 3}
            y="370"
            width="6"
            height="56"
            rx="3"
            fill="url(#nv-bar)"
          />
        );
      })}
    </g>

    {/* Chat bubbles */}
    <g className="art-bubble-user">
      <rect x="70" y="70" width="190" height="56" rx="18" fill="#fff" fillOpacity="0.08" stroke="#fff" strokeOpacity="0.1" />
      <rect x="90" y="88" width="120" height="7" rx="3.5" fill="#fff" fillOpacity="0.7" />
      <rect x="90" y="104" width="80" height="7" rx="3.5" fill="#fff" fillOpacity="0.4" />
    </g>
    <g className="art-bubble-ai">
      <rect x="548" y="262" width="182" height="64" rx="18" fill={accent} fillOpacity="0.25" stroke={accent} strokeOpacity="0.5" />
      <rect x="568" y="280" width="140" height="7" rx="3.5" fill="#fff" fillOpacity="0.8" />
      <rect x="568" y="296" width="104" height="7" rx="3.5" fill="#fff" fillOpacity="0.55" />
      <g className="art-typing">
        {[0, 1, 2].map((d) => (
          <circle key={d} cx={682 + d * 10} cy="300" r="3" fill="#fff" />
        ))}
      </g>
    </g>

    <text
      x="400"
      y="470"
      textAnchor="middle"
      fontSize="12"
      letterSpacing="4"
      fill="#fff"
      fillOpacity="0.45"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      LISTENING…
    </text>

    <Sparkles points={[[190, 260, 6], [610, 120, 7], [250, 380, 4], [660, 410, 5], [530, 60, 4]]} />
  </Frame>
);

/* ─────────────────────────── Animation ─────────────────────────── */

const scenes = { eazybuy: EazyBuyArt, groupsync: GroupSyncArt, nova: NovaArt };
export type ArtKey = keyof typeof scenes;

const ProjectArt = ({ art, accent, title }: { art: ArtKey; accent: string; title: string }) => {
  const root = useRef<SVGSVGElement>(null);
  const Scene = scenes[art];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const loop = { repeat: -1, yoyo: true, ease: "sine.inOut" };

      // Shared
      gsap.to(".art-spark path", {
        scale: 0.3,
        opacity: 0.2,
        transformOrigin: "50% 50%",
        duration: 1.4,
        stagger: { each: 0.35, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });

      // EazyBuy
      gsap.utils.toArray<SVGGElement>(".art-float").forEach((g, i) =>
        gsap.to(g, { y: -Number(g.dataset.amp), duration: 2.2 + i * 0.4, delay: i * 0.3, ...loop })
      );
      gsap.to(".art-path", { strokeDashoffset: -44, duration: 1.6, repeat: -1, ease: "none" });
      gsap.to(".art-bag", { y: -6, duration: 1.8, ...loop });
      gsap
        .timeline({ repeat: -1, repeatDelay: 1.6 })
        .to(".art-badge", { scale: 1.25, transformOrigin: "50% 50%", duration: 0.25, ease: "back.out(3)" })
        .to(".art-badge", { scale: 1, duration: 0.4, ease: "power2.out" });

      // GroupSync
      gsap.to(".art-live", { opacity: 0.25, duration: 0.8, ...loop });
      gsap.utils.toArray<SVGRectElement>(".art-meter").forEach((bar) =>
        gsap.to(bar, {
          scaleY: () => gsap.utils.random(0.2, 1),
          transformOrigin: "50% 100%",
          duration: () => gsap.utils.random(0.15, 0.35),
          repeat: -1,
          repeatRefresh: true,
          ease: "sine.inOut",
        })
      );
      const speaker = root.current?.querySelector(".art-speaker");
      if (speaker) {
        const hops = gsap.timeline({ repeat: -1 });
        [4, 2, 3, 1, 5, 0].forEach((i) => {
          const { x, y } = tilePos(i);
          hops.to(speaker, {
            x: x - TILE.x0,
            y: y - TILE.y0,
            duration: 0.7,
            ease: "expo.inOut",
            delay: 1.1,
          });
        });
      }
      gsap.to(".art-person", { y: -3, duration: 1.6, stagger: 0.25, ...loop });

      // Nova AI
      gsap.to(".art-ring", {
        attr: { r: 170 },
        strokeOpacity: 0,
        duration: 3,
        stagger: { each: 1, repeat: -1 },
        ease: "power1.out",
      });
      gsap.to(".art-orb", { scale: 1.06, transformOrigin: "50% 50%", duration: 1.2, ...loop });
      gsap.to(".art-halo", { opacity: 0.6, duration: 2, ...loop });
      gsap.utils.toArray<SVGRectElement>(".art-bar").forEach((bar, i) => {
        const centre = 1 - Math.abs(i - (BARS - 1) / 2) / (BARS / 2);
        gsap.fromTo(
          bar,
          { scaleY: 0.12 },
          {
            scaleY: () => gsap.utils.random(0.2, 0.3 + centre * 0.8),
            transformOrigin: "50% 50%",
            duration: () => gsap.utils.random(0.25, 0.5),
            repeat: -1,
            repeatRefresh: true,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      });
      gsap.to(".art-bubble-user", { y: -8, duration: 2.4, ...loop });
      gsap.to(".art-bubble-ai", { y: 8, duration: 2.8, ...loop });
      gsap.to(".art-typing circle", {
        y: -4,
        duration: 0.35,
        stagger: { each: 0.12, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`${title} illustration`}
    >
      <Scene accent={accent} />
    </svg>
  );
};

export default ProjectArt;
