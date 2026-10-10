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

/* ─────────────────────────── Migros Bank Connect ─────────────────────────── */

// Deterministic QR-like pattern (21×21 with finder squares) for the pairing card
const QR_N = 21;
const qrCells = (() => {
  const cells: [number, number][] = [];
  let seed = 7;
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x > QR_N - 9 && y < 8) || (x < 8 && y > QR_N - 9);
  for (let y = 0; y < QR_N; y++)
    for (let x = 0; x < QR_N; x++) if (!inFinder(x, y) && rand() > 0.52) cells.push([x, y]);
  return cells;
})();

const Finder = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g>
    <rect x={x} y={y} width={s * 7} height={s * 7} rx={s} fill="#0e0d13" />
    <rect x={x + s} y={y + s} width={s * 5} height={s * 5} rx={s * 0.6} fill="#efece6" />
    <rect x={x + s * 2} y={y + s * 2} width={s * 3} height={s * 3} rx={s * 0.5} fill="#0e0d13" />
  </g>
);

const MB = { win: { x: 318, y: 92, w: 412, h: 316 }, accept: { x: 584, y: 336 } };

const MigrosArt = ({ accent }: { accent: string }) => {
  const { win } = MB;
  const q = 4; // QR cell size
  const qx = 98;
  const qy = 318;
  return (
    <Frame id="mb" accent={accent}>
      {/* Browser: e-banking login */}
      <g opacity="0.85">
        <rect x="56" y="64" width="250" height="200" rx="14" fill="#16151d" stroke="#fff" strokeOpacity="0.1" />
        <circle cx="74" cy="82" r="4" fill="#fff" fillOpacity="0.2" />
        <circle cx="88" cy="82" r="4" fill="#fff" fillOpacity="0.2" />
        <circle cx="102" cy="82" r="4" fill="#fff" fillOpacity="0.2" />
        <rect x="118" y="74" width="170" height="16" rx="8" fill="#fff" fillOpacity="0.06" />
        <text x="130" y="86" fontSize="9" fill="#fff" fillOpacity="0.5" style={{ fontFamily: "var(--font-mono)" }}>
          e-banking · login
        </text>
        <text x="76" y="128" fontSize="15" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
          Log in
        </text>
        <rect x="76" y="142" width="210" height="28" rx="8" fill="#fff" fillOpacity="0.06" stroke="#fff" strokeOpacity="0.1" />
        <text x="88" y="160" fontSize="10" fill="#fff" fillOpacity="0.6" style={{ fontFamily: "var(--font-mono)" }}>
          Contract no. 4471 08
        </text>
        <rect x="76" y="178" width="210" height="28" rx="8" fill="#fff" fillOpacity="0.06" stroke="#fff" strokeOpacity="0.1" />
        <text x="88" y="197" fontSize="14" fill="#fff" fillOpacity="0.7" letterSpacing="2">••••••••</text>
        <rect x="76" y="216" width="210" height="30" rx="8" fill={accent} />
        <text x="181" y="235" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff" style={{ fontFamily: "var(--font-sans)" }}>
          Waiting for approval…
        </text>
      </g>

      {/* Request travelling from browser to the desktop app */}
      <path id="mb-link" d="M306 164 C 330 164, 320 200, 350 206" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="4 6" fill="none" />
      <circle className="mb-packet" cx="306" cy="164" r="5" fill={accent} />

      {/* Desktop app window */}
      <g>
        <rect x={win.x} y={win.y} width={win.w} height={win.h} rx="18" fill="#121118" stroke="#fff" strokeOpacity="0.12" />
        <path d={`M${win.x} ${win.y + 36}H${win.x + win.w}`} stroke="#fff" strokeOpacity="0.08" />
        <circle cx={win.x + 20} cy={win.y + 18} r="5" fill="#ff5f57" />
        <circle cx={win.x + 36} cy={win.y + 18} r="5" fill="#febc2e" />
        <circle cx={win.x + 52} cy={win.y + 18} r="5" fill="#28c840" />
        <text x={win.x + win.w / 2} y={win.y + 22} textAnchor="middle" fontSize="11" fill="#fff" fillOpacity="0.55" style={{ fontFamily: "var(--font-sans)" }}>
          Migros Bank Connect
        </text>

        {/* Idle: ready for requests */}
        <g className="mb-ready">
          <circle className="mb-ready-pulse" cx={win.x + win.w / 2} cy={win.y + 140} r="44" fill="none" stroke={accent} strokeOpacity="0.5" />
          <path
            d={`M${win.x + win.w / 2} ${win.y + 104}l32 12v24c0 22-14 36-32 44c-18-8-32-22-32-44v-24Z`}
            fill={accent}
          />
          <path
            d={`M${win.x + win.w / 2 - 12} ${win.y + 141}l8 8l16-17`}
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={win.x + win.w / 2} y={win.y + 222} textAnchor="middle" fontSize="15" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
            Ready for confirmation request
          </text>
          <text x={win.x + win.w / 2} y={win.y + 244} textAnchor="middle" fontSize="10" letterSpacing="2" fill="#fff" fillOpacity="0.4" style={{ fontFamily: "var(--font-mono)" }}>
            TRUSTED DEVICE · ACTIVE
          </text>
        </g>

        {/* Payment approval popup */}
        <g className="mb-popup" opacity="0">
          <rect x={win.x + 26} y={win.y + 58} width={win.w - 52} height="236" rx="16" fill="#1b1a23" stroke="#fff" strokeOpacity="0.1" />
          <text x={win.x + 46} y={win.y + 90} fontSize="10" letterSpacing="2" fill={accent} style={{ fontFamily: "var(--font-mono)" }}>
            PAYMENT CONFIRMATION
          </text>
          <text x={win.x + 46} y={win.y + 130} fontSize="30" fontWeight="700" fill="#efece6" style={{ fontFamily: "var(--font-display)" }}>
            CHF 1,250.00
          </text>
          <text x={win.x + 46} y={win.y + 154} fontSize="12" fill="#fff" fillOpacity="0.55" style={{ fontFamily: "var(--font-sans)" }}>
            To: Swiss Rail AG · CH93 0076 2011 …
          </text>
          {/* countdown */}
          <circle cx={win.x + win.w - 70} cy={win.y + 112} r="20" fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="4" />
          <circle
            className="mb-timer"
            cx={win.x + win.w - 70}
            cy={win.y + 112}
            r="20"
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="125.7"
            transform={`rotate(-90 ${win.x + win.w - 70} ${win.y + 112})`}
          />
          <text x={win.x + win.w - 70} y={win.y + 116} textAnchor="middle" fontSize="11" fill="#efece6" style={{ fontFamily: "var(--font-mono)" }}>
            60s
          </text>
          <path d={`M${win.x + 46} ${win.y + 180}H${win.x + win.w - 46}`} stroke="#fff" strokeOpacity="0.08" />
          {/* buttons */}
          <rect x={win.x + 46} y={win.y + 222} width="146" height="46" rx="23" fill="none" stroke="#fff" strokeOpacity="0.25" />
          <text x={win.x + 119} y={win.y + 250} textAnchor="middle" fontSize="14" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
            Decline
          </text>
          <g className="mb-accept">
            <rect x={win.x + 206} y={win.y + 222} width="160" height="46" rx="23" fill={accent} />
            <text x={win.x + 286} y={win.y + 250} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-sans)" }}>
              Accept
            </text>
          </g>
          <text x={win.x + 46} y={win.y + 205} fontSize="11" fill="#fff" fillOpacity="0.45" style={{ fontFamily: "var(--font-sans)" }}>
            Confirm with PIN or Touch ID
          </text>
        </g>

        {/* Accepted state */}
        <g className="mb-done" opacity="0">
          <circle cx={win.x + win.w / 2} cy={win.y + 140} r="40" fill="#22c55e" fillOpacity="0.15" />
          <circle cx={win.x + win.w / 2} cy={win.y + 140} r="28" fill="#22c55e" />
          <path
            d={`M${win.x + win.w / 2 - 12} ${win.y + 140}l8 8l16-17`}
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={win.x + win.w / 2} y={win.y + 212} textAnchor="middle" fontSize="16" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
            Payment accepted
          </text>
        </g>
      </g>

      {/* QR pairing card (add a new device) */}
      <g className="mb-qr-card">
        <rect x="70" y="296" width="220" height="140" rx="16" fill="#16151d" stroke="#fff" strokeOpacity="0.1" />
        <rect x={qx - 6} y={qy - 6} width={QR_N * q + 12} height={QR_N * q + 12} rx="8" fill="#efece6" />
        {qrCells.map(([x, y], i) => (
          <rect key={i} x={qx + x * q} y={qy + y * q} width={q} height={q} fill="#0e0d13" />
        ))}
        <Finder x={qx} y={qy} s={q} />
        <Finder x={qx + (QR_N - 7) * q} y={qy} s={q} />
        <Finder x={qx} y={qy + (QR_N - 7) * q} s={q} />
        <rect className="mb-scan" x={qx - 6} y={qy - 6} width={QR_N * q + 12} height="3" fill={accent} />
        <text x="200" y="334" fontSize="12" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
          Pair new
        </text>
        <text x="200" y="350" fontSize="12" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
          device
        </text>
        <text x="200" y="376" fontSize="10" fill="#fff" fillOpacity="0.45" style={{ fontFamily: "var(--font-mono)" }}>
          or enter
        </text>
        <text x="200" y="392" fontSize="12" letterSpacing="1.5" fill={accent} style={{ fontFamily: "var(--font-mono)" }}>
          7KF-29Q
        </text>
      </g>

      {/* Cursor */}
      <g className="mb-cursor" opacity="0">
        <path d="M0 0 L0 22 L6 17 L10 26 L14 24 L10 15 L18 15 Z" fill="#fff" stroke="#0e0d13" strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      <Sparkles points={[[740, 60, 6], [300, 460, 4], [760, 440, 5]]} />
    </Frame>
  );
};

/* ─────────────────────────── DVAG ─────────────────────────── */

// Fingerprint ridges: concentric open arcs around a centre point
const ridge = (cx: number, cy: number, r: number, from: number, to: number) => {
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  };
  return `M${pt(from)} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${pt(to)}`;
};
const DV = { fx: 240, fy: 262 };

const DvagArt = ({ accent }: { accent: string }) => (
  <Frame id="dv" accent={accent}>
    <defs>
      <clipPath id="dv-fp-clip">
        <circle cx={DV.fx} cy={DV.fy} r="46" />
      </clipPath>
    </defs>

    {/* Advisor portal in the browser */}
    <g>
      <rect x="392" y="64" width="348" height="250" rx="16" fill="#14141b" stroke="#fff" strokeOpacity="0.1" />
      <circle cx="412" cy="84" r="4.5" fill="#fff" fillOpacity="0.2" />
      <circle cx="427" cy="84" r="4.5" fill="#fff" fillOpacity="0.2" />
      <circle cx="442" cy="84" r="4.5" fill="#fff" fillOpacity="0.2" />
      <rect x="460" y="75" width="200" height="18" rx="9" fill="#fff" fillOpacity="0.06" />
      <text x="474" y="88" fontSize="10" fill="#fff" fillOpacity="0.5" style={{ fontFamily: "var(--font-mono)" }}>
        dvag · advisor portal
      </text>

      <g className="dv-waiting">
        <text x="418" y="140" fontSize="20" fontWeight="700" fill="#efece6" style={{ fontFamily: "var(--font-display)" }}>
          Sign in
        </text>
        <rect x="418" y="158" width="296" height="32" rx="9" fill="#fff" fillOpacity="0.06" stroke="#fff" strokeOpacity="0.1" />
        <text x="432" y="179" fontSize="11" fill="#fff" fillOpacity="0.6" style={{ fontFamily: "var(--font-mono)" }}>
          VB no. 0815 4711
        </text>
        <rect x="418" y="206" width="296" height="40" rx="10" fill={accent} fillOpacity="0.15" stroke={accent} strokeOpacity="0.5" />
        <text x="566" y="231" textAnchor="middle" fontSize="12" fill="#bae6fd" style={{ fontFamily: "var(--font-sans)" }}>
          Confirm on your DVAG Login app
        </text>
        <g className="dv-dots">
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={552 + d * 14} cy="276" r="4" fill={accent} />
          ))}
        </g>
      </g>

      <g className="dv-dash" opacity="0">
        <text x="418" y="134" fontSize="17" fontWeight="700" fill="#efece6" style={{ fontFamily: "var(--font-display)" }}>
          Welcome back
        </text>
        <rect x="418" y="146" width="90" height="6" rx="3" fill="#fff" fillOpacity="0.3" />
        {/* client stats cards */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${418 + i * 102} 168)`}>
            <rect width="92" height="56" rx="10" fill="#fff" fillOpacity="0.05" stroke="#fff" strokeOpacity="0.08" />
            <rect x="10" y="12" width="40" height="5" rx="2.5" fill="#fff" fillOpacity="0.35" />
            <rect x="10" y="28" width={[56, 44, 64][i]} height="12" rx="4" fill={accent} fillOpacity={0.9 - i * 0.2} />
          </g>
        ))}
        {/* chart */}
        {[34, 52, 40, 66, 58, 78, 70].map((h, i) => (
          <rect
            key={i}
            className="dv-bar"
            x={420 + i * 42}
            y={300 - h}
            width="26"
            height={h}
            rx="5"
            fill={accent}
            fillOpacity={0.35 + i * 0.08}
          />
        ))}
      </g>
    </g>

    {/* QR sign-in card: the other way advisors log in */}
    <g transform="translate(392 336)">
      <rect width="348" height="100" rx="16" fill="#14141b" stroke="#fff" strokeOpacity="0.1" />
      <rect x="18" y="16" width="68" height="68" rx="10" fill="#efece6" />
      {qrCells
        .filter(([x, y]) => x % 2 === 0 && y % 2 === 0)
        .map(([x, y], i) => (
          <rect key={i} x={24 + (x / 2) * 5.6} y={22 + (y / 2) * 5.6} width="5" height="5" fill="#0e0d13" />
        ))}
      <Finder x={24} y={22} s={2.4} />
      <Finder x={63.2} y={22} s={2.4} />
      <Finder x={24} y={61.2} s={2.4} />
      <text x="104" y="44" fontSize="15" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
        Or sign in with QR
      </text>
      <text x="104" y="64" fontSize="11" fill="#fff" fillOpacity="0.5" style={{ fontFamily: "var(--font-sans)" }}>
        Scan from the advisor portal
      </text>
      <rect className="dv-chip" x="258" y="38" width="76" height="24" rx="12" fill="#22c55e" fillOpacity="0.18" />
      <text x="296" y="54" textAnchor="middle" fontSize="10" fill="#86efac" letterSpacing="1" style={{ fontFamily: "var(--font-mono)" }}>
        TRUSTED
      </text>
    </g>

    {/* Request from the portal to the phone */}
    <path d="M392 200 C 370 200, 360 230, 334 236" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="4 6" fill="none" />
    <circle className="dv-packet" cx="392" cy="200" r="5" fill={accent} />

    {/* Phone running DVAG Login */}
    <g>
      <rect x="140" y="60" width="200" height="400" rx="34" fill="#16151d" stroke="#fff" strokeOpacity="0.14" strokeWidth="2" />
      <rect x="152" y="72" width="176" height="376" rx="24" fill="#0f0f15" />
      <rect x="210" y="80" width="60" height="16" rx="8" fill="#000" />
      <text x={DV.fx} y="130" textAnchor="middle" fontSize="11" letterSpacing="2" fill={accent} style={{ fontFamily: "var(--font-mono)" }}>
        DVAG LOGIN
      </text>
      <text x={DV.fx} y="160" textAnchor="middle" fontSize="16" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
        Confirm sign-in?
      </text>
      <text x={DV.fx} y="180" textAnchor="middle" fontSize="10" fill="#fff" fillOpacity="0.5" style={{ fontFamily: "var(--font-sans)" }}>
        Advisor portal · just now
      </text>

      {/* Fingerprint */}
      <circle className="dv-fp-ring" cx={DV.fx} cy={DV.fy} r="58" fill="none" stroke={accent} strokeOpacity="0.4" />
      <g className="dv-fp" fill="none" stroke={accent} strokeWidth="3.2" strokeLinecap="round">
        {[8, 15, 22, 29, 36, 43].map((r, i) => (
          <path key={r} d={ridge(DV.fx, DV.fy + 4, r, 200 - i * 6, 340 + i * 10)} />
        ))}
        {[15, 29, 43].map((r) => (
          <path key={`b${r}`} d={ridge(DV.fx, DV.fy + 4, r, 20, 150)} strokeOpacity="0.7" />
        ))}
      </g>
      <g clipPath="url(#dv-fp-clip)">
        <rect className="dv-scan" x={DV.fx - 50} y={DV.fy - 50} width="100" height="4" fill="#fff" fillOpacity="0.9" />
      </g>
      <g className="dv-ok" opacity="0">
        <circle cx={DV.fx} cy={DV.fy} r="30" fill="#22c55e" />
        <path d={`M${DV.fx - 12} ${DV.fy}l8 8l16-17`} stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <text className="dv-hint" x={DV.fx} y="352" textAnchor="middle" fontSize="11" fill="#fff" fillOpacity="0.55" style={{ fontFamily: "var(--font-sans)" }}>
        Touch the sensor to confirm
      </text>
      <text className="dv-confirmed" x={DV.fx} y="352" textAnchor="middle" fontSize="13" fontWeight="600" fill="#86efac" opacity="0" style={{ fontFamily: "var(--font-sans)" }}>
        Sign-in confirmed
      </text>
      <rect x="168" y="378" width="144" height="40" rx="20" fill="#fff" fillOpacity="0.06" stroke="#fff" strokeOpacity="0.12" />
      <text x={DV.fx} y="403" textAnchor="middle" fontSize="12" fill="#efece6" fillOpacity="0.8" style={{ fontFamily: "var(--font-sans)" }}>
        Use PIN instead
      </text>
    </g>

    <Sparkles points={[[80, 120, 6], [100, 400, 5], [370, 40, 4], [760, 300, 5]]} />
  </Frame>
);

/* ─────────────────────────── MyThings ─────────────────────────── */

const docs = [
  { tag: "#ef4444", label: "PDF" },
  { tag: "#3b82f6", label: "IMG" },
  { tag: "#f59e0b", label: "BILL" },
];
const folders = [
  { name: "Bills", color: "#f59e0b", count: "12" },
  { name: "Health", color: "#ef4444", count: "8" },
  { name: "Work", color: "#3b82f6", count: "24" },
];
// Which folder each incoming doc is sorted into
const sortTo = [1, 2, 0];
const MT = { chipX: 400, chipY: 236, folderX: 560, folderY0: 128, folderGap: 92 };

const MyThingsArt = ({ accent }: { accent: string }) => (
  <Frame id="mt" accent={accent}>
    <defs>
      <linearGradient id="mt-chip" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
    </defs>

    {/* Sync status: flips between offline and synced */}
    <g style={{ fontFamily: "var(--font-mono)" }}>
      <rect x="56" y="34" width="132" height="30" rx="15" fill="#fff" fillOpacity="0.06" stroke="#fff" strokeOpacity="0.1" />
      <g className="mt-offline">
        <circle cx="74" cy="49" r="4.5" fill="#f59e0b" />
        <text x="86" y="53.5" fontSize="12" fill="#fcd34d" letterSpacing="1">OFFLINE</text>
      </g>
      <g className="mt-synced" opacity="0">
        <path d="M69 49l3.5 3.5L79 46" stroke="#34d399" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="86" y="53.5" fontSize="12" fill="#6ee7b7" letterSpacing="1">SYNCED</text>
      </g>
    </g>

    {/* Track from the inbox into the AI chip */}
    <path d="M60 236 H340" stroke="#fff" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="4 7" className="art-path" />

    {/* Incoming documents */}
    {docs.map((d, k) => (
      <g key={k} className="mt-doc" opacity="0">
        <rect x="-32" y="-42" width="64" height="84" rx="9" fill="#efece6" />
        <path d="M18 -42 L32 -28 L18 -28 Z" fill="#cfcac0" />
        <rect x="-22" y="-30" width="30" height="12" rx="4" fill={d.tag} />
        <text x="-7" y="-21" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-sans)" }}>
          {d.label}
        </text>
        <rect x="-22" y="-6" width="44" height="5" rx="2.5" fill="#08070b" fillOpacity="0.25" />
        <rect x="-22" y="5" width="36" height="5" rx="2.5" fill="#08070b" fillOpacity="0.18" />
        <rect x="-22" y="16" width="40" height="5" rx="2.5" fill="#08070b" fillOpacity="0.18" />
      </g>
    ))}

    {/* AI sorter */}
    <circle className="mt-pulse" cx={MT.chipX} cy={MT.chipY} r="58" fill="none" stroke="#34d399" strokeOpacity="0.5" />
    <g className="mt-chip">
      <rect x={MT.chipX - 52} y={MT.chipY - 52} width="104" height="104" rx="26" fill="url(#mt-chip)" />
      <rect x={MT.chipX - 52} y={MT.chipY - 52} width="104" height="52" rx="26" fill="#fff" fillOpacity="0.1" />
      <path
        d={`M${MT.chipX} ${MT.chipY - 26}Q${MT.chipX + 4} ${MT.chipY - 4} ${MT.chipX + 26} ${MT.chipY}Q${MT.chipX + 4} ${MT.chipY + 4} ${MT.chipX} ${MT.chipY + 26}Q${MT.chipX - 4} ${MT.chipY + 4} ${MT.chipX - 26} ${MT.chipY}Q${MT.chipX - 4} ${MT.chipY - 4} ${MT.chipX} ${MT.chipY - 26}Z`}
        fill="#fff"
      />
      <circle cx={MT.chipX + 22} cy={MT.chipY - 22} r="5" fill="#fff" fillOpacity="0.8" />
    </g>
    <text x={MT.chipX} y={MT.chipY + 84} textAnchor="middle" fontSize="11" letterSpacing="3" fill="#fff" fillOpacity="0.45" style={{ fontFamily: "var(--font-mono)" }}>
      AUTO-SORT
    </text>

    {/* Folders */}
    {folders.map((f, i) => {
      const y = MT.folderY0 + i * MT.folderGap;
      return (
        <g key={f.name} className={`mt-folder mt-folder-${i}`}>
          <rect x={MT.folderX} y={y - 32} width="184" height="64" rx="16" fill="#141f1c" stroke="#fff" strokeOpacity="0.08" />
          <path
            d={`M${MT.folderX + 18} ${y - 12}a4 4 0 0 1 4-4h9l4 5h15a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H${MT.folderX + 22}a4 4 0 0 1-4-4Z`}
            fill={f.color}
          />
          <text x={MT.folderX + 68} y={y + 5} fontSize="16" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
            {f.name}
          </text>
          <rect x={MT.folderX + 136} y={y - 11} width="34" height="22" rx="11" fill="#fff" fillOpacity="0.08" />
          <text x={MT.folderX + 153} y={y + 4} textAnchor="middle" fontSize="11" fill="#fff" fillOpacity="0.75" style={{ fontFamily: "var(--font-mono)" }}>
            {f.count}
          </text>
        </g>
      );
    })}

    {/* Sorted mini-docs fly from the chip to their folder */}
    {docs.map((d, k) => (
      <g key={k} className="mt-mini" opacity="0">
        <rect x="-11" y="-14" width="22" height="28" rx="4" fill="#efece6" />
        <rect x="-7" y="-9" width="10" height="5" rx="2" fill={d.tag} />
      </g>
    ))}

    {/* Device security card */}
    <g transform="translate(56 370)">
      <rect width="250" height="96" rx="16" fill="#141f1c" stroke="#fff" strokeOpacity="0.08" />
      <text x="18" y="26" fontSize="10" letterSpacing="2" fill="#fff" fillOpacity="0.45" style={{ fontFamily: "var(--font-mono)" }}>
        ACTIVE DEVICES
      </text>
      {/* phone */}
      <rect x="18" y="42" width="14" height="22" rx="3" fill="none" stroke="#6ee7b7" strokeWidth="1.8" />
      <text x="42" y="57" fontSize="12" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>iPhone · this device</text>
      {/* unknown laptop, gets logged out */}
      <g className="mt-device">
        <rect x="16" y="72" width="18" height="11" rx="2" fill="none" stroke="#fca5a5" strokeWidth="1.8" />
        <path d="M13 85h24" stroke="#fca5a5" strokeWidth="1.8" strokeLinecap="round" />
        <text x="42" y="83" fontSize="12" fill="#efece6" fillOpacity="0.7" style={{ fontFamily: "var(--font-sans)" }}>Unknown laptop</text>
      </g>
      <g className="mt-logout" opacity="0">
        <rect x="160" y="69" width="76" height="20" rx="10" fill="#ef4444" fillOpacity="0.2" />
        <text x="198" y="83" textAnchor="middle" fontSize="10" fill="#fca5a5" style={{ fontFamily: "var(--font-mono)" }}>
          LOGGED OUT
        </text>
      </g>
    </g>

    <Sparkles points={[[250, 120, 6], [470, 150, 4], [520, 420, 5], [740, 60, 6]]} />
  </Frame>
);

/* ─────────────────────────── Spark Zen ─────────────────────────── */

const moods = ["#ef4444", "#f97316", "#facc15", "#84cc16", "#22c55e"];
// Mouth curve per mood: frown → smile
const mouth = (cx: number, cy: number, k: number) =>
  `M${cx - 6} ${cy + 5} Q${cx} ${cy + 5 + (k - 2) * 3} ${cx + 6} ${cy + 5}`;
const SZ = { ringR: 46, ringC: 2 * Math.PI * 46 };

const SparkZenArt = ({ accent }: { accent: string }) => (
  <Frame id="sz" accent={accent}>
    {/* Breathing card */}
    <g transform="translate(56 56)">
      <rect width="210" height="184" rx="18" fill="#16151d" stroke="#fff" strokeOpacity="0.1" />
      <text x="20" y="32" fontSize="10" letterSpacing="2" fill="#fff" fillOpacity="0.45" style={{ fontFamily: "var(--font-mono)" }}>
        GUIDED BREATHING
      </text>
      <circle cx="105" cy="108" r="54" fill="#5eead4" fillOpacity="0.08" />
      <circle className="sz-breathe" cx="105" cy="108" r="40" fill="#5eead4" fillOpacity="0.35" />
      <circle cx="105" cy="108" r="18" fill="#5eead4" fillOpacity="0.8" />
      <text className="sz-in" x="105" y="172" textAnchor="middle" fontSize="12" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
        Breathe in…
      </text>
      <text className="sz-out" x="105" y="172" textAnchor="middle" fontSize="12" fill="#efece6" opacity="0" style={{ fontFamily: "var(--font-sans)" }}>
        Breathe out…
      </text>
    </g>

    {/* Mood tracker */}
    <g transform="translate(56 260)">
      <rect width="210" height="110" rx="18" fill="#16151d" stroke="#fff" strokeOpacity="0.1" />
      <text x="20" y="30" fontSize="10" letterSpacing="2" fill="#fff" fillOpacity="0.45" style={{ fontFamily: "var(--font-mono)" }}>
        HOW ARE YOU FEELING?
      </text>
      <rect className="sz-mood-pick" x="12" y="50" width="38" height="38" rx="19" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
      {moods.map((c, k) => {
        const cx = 31 + k * 37;
        return (
          <g key={k}>
            <circle cx={cx} cy="69" r="15" fill={c} />
            <circle cx={cx - 5} cy="66" r="1.8" fill="#0e0d13" />
            <circle cx={cx + 5} cy="66" r="1.8" fill="#0e0d13" />
            <path d={mouth(cx, 67, k)} stroke="#0e0d13" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>
        );
      })}
    </g>

    {/* Journal note */}
    <g transform="translate(56 388)">
      <rect width="210" height="66" rx="16" fill="#16151d" stroke="#fff" strokeOpacity="0.1" />
      <circle cx="30" cy="33" r="13" fill={accent} fillOpacity="0.9" />
      <rect x="26" y="25" width="8" height="12" rx="4" fill="#fff" />
      <g className="sz-wave">
        {[10, 18, 8, 22, 14, 26, 12, 20, 9, 16, 24, 11].map((h, i) => (
          <rect key={i} x={56 + i * 11} y={33 - h / 2} width="5" height={h} rx="2.5" fill="#fff" fillOpacity="0.6" />
        ))}
      </g>
    </g>

    {/* Phone */}
    <g>
      <rect x="296" y="40" width="208" height="420" rx="34" fill="#16151d" stroke="#fff" strokeOpacity="0.14" strokeWidth="2" />
      <rect x="308" y="52" width="184" height="396" rx="24" fill="#0f0f15" />
      <rect x="370" y="60" width="60" height="16" rx="8" fill="#000" />
      <text x="324" y="108" fontSize="11" fill="#fff" fillOpacity="0.5" style={{ fontFamily: "var(--font-sans)" }}>
        Good morning,
      </text>
      <text x="324" y="128" fontSize="18" fontWeight="700" fill="#efece6" style={{ fontFamily: "var(--font-display)" }}>
        Priya
      </text>
      <circle cx="468" cy="116" r="14" fill={accent} fillOpacity="0.25" />
      <text x="468" y="121" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} style={{ fontFamily: "var(--font-sans)" }}>
        P
      </text>

      {/* Goal ring */}
      <circle cx="400" cy="210" r={SZ.ringR} fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="10" />
      <circle
        className="sz-ring"
        cx="400"
        cy="210"
        r={SZ.ringR}
        fill="none"
        stroke={accent}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={SZ.ringC}
        strokeDashoffset={SZ.ringC}
        transform="rotate(-90 400 210)"
      />
      <text className="sz-pct" x="400" y="214" textAnchor="middle" fontSize="20" fontWeight="700" fill="#efece6" style={{ fontFamily: "var(--font-display)" }}>
        72%
      </text>
      <text x="400" y="232" textAnchor="middle" fontSize="9" letterSpacing="1.5" fill="#fff" fillOpacity="0.45" style={{ fontFamily: "var(--font-mono)" }}>
        GOAL
      </text>
      <text x="400" y="282" textAnchor="middle" fontSize="12" fill="#efece6" fillOpacity="0.85" style={{ fontFamily: "var(--font-sans)" }}>
        Become a Flutter developer
      </text>

      {/* Upcoming items */}
      {[
        { t: "Mock interview", s: "Fri · 4:00 PM", c: "#a78bfa" },
        { t: "Code review", s: "with mentor", c: "#38bdf8" },
        { t: "Industrial visit", s: "Next week", c: "#34d399" },
      ].map((it, i) => (
        <g key={it.t} className="sz-item" transform={`translate(320 ${300 + i * 44})`}>
          <rect width="160" height="36" rx="10" fill="#fff" fillOpacity="0.05" />
          <rect x="10" y="10" width="16" height="16" rx="5" fill={it.c} />
          <text x="34" y="17" fontSize="11" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
            {it.t}
          </text>
          <text x="34" y="29" fontSize="9" fill="#fff" fillOpacity="0.45" style={{ fontFamily: "var(--font-sans)" }}>
            {it.s}
          </text>
        </g>
      ))}
    </g>

    {/* Leaderboard */}
    <g transform="translate(534 56)">
      <rect width="210" height="200" rx="18" fill="#16151d" stroke="#fff" strokeOpacity="0.1" />
      <text x="20" y="32" fontSize="10" letterSpacing="2" fill="#fff" fillOpacity="0.45" style={{ fontFamily: "var(--font-mono)" }}>
        LEADERBOARD
      </text>
      {[
        { n: 1, w: 70, pts: "1,240", c: "#facc15" },
        { n: 2, w: 56, pts: "1,180", c: accent },
        { n: 3, w: 64, pts: "1,075", c: "#fb923c" },
      ].map((r, i) => (
        <g key={r.n} transform={`translate(16 ${50 + i * 46})`} className={i === 1 ? "sz-me" : undefined}>
          <rect width="178" height="38" rx="10" fill={i === 1 ? accent : "#fff"} fillOpacity={i === 1 ? 0.16 : 0.04} />
          <text x="14" y="24" fontSize="12" fontWeight="700" fill={r.c} style={{ fontFamily: "var(--font-mono)" }}>
            {r.n}
          </text>
          <circle cx="44" cy="19" r="11" fill="#fff" fillOpacity="0.15" />
          <rect x="62" y="15" width={r.w} height="7" rx="3.5" fill="#fff" fillOpacity={i === 1 ? 0.8 : 0.5} />
          <text x="166" y="23" textAnchor="end" fontSize="11" fill="#efece6" style={{ fontFamily: "var(--font-mono)" }}>
            {r.pts}
          </text>
        </g>
      ))}
      <text className="sz-points" x="160" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4ade80" opacity="0" style={{ fontFamily: "var(--font-mono)" }}>
        +50
      </text>
    </g>

    {/* Endorsement */}
    <g className="sz-badge" transform="translate(534 276)">
      <rect width="210" height="96" rx="18" fill="#16151d" stroke={accent} strokeOpacity="0.4" />
      <circle cx="44" cy="48" r="24" fill={accent} />
      <path
        d="M44 34l4.2 8.6 9.5 1.4-6.9 6.7 1.6 9.4-8.4-4.4-8.4 4.4 1.6-9.4-6.9-6.7 9.5-1.4Z"
        fill="#fff"
      />
      <text x="80" y="44" fontSize="13" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
        Endorsed by
      </text>
      <text x="80" y="62" fontSize="13" fontWeight="600" fill="#efece6" style={{ fontFamily: "var(--font-sans)" }}>
        your mentor
      </text>
    </g>

    <Sparkles points={[[280, 30, 5], [520, 420, 6], [760, 420, 5], [40, 250, 4]]} />
  </Frame>
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

const scenes = { migros: MigrosArt, dvag: DvagArt, mythings: MyThingsArt, sparkzen: SparkZenArt, eazybuy: EazyBuyArt, groupsync: GroupSyncArt, nova: NovaArt };
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

      // DVAG: portal asks the phone, fingerprint scan confirms, portal unlocks
      if (root.current?.querySelector(".dv-fp")) {
        gsap.to(".dv-dots circle", { y: -5, duration: 0.35, stagger: { each: 0.12, repeat: -1, yoyo: true }, ease: "sine.inOut" });
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.5 })
          .fromTo(".dv-packet", { attr: { cx: 392, cy: 200 }, opacity: 1 }, { attr: { cx: 334, cy: 236 }, duration: 0.9, ease: "power2.inOut" })
          .to(".dv-packet", { opacity: 0, duration: 0.2 })
          .fromTo(".dv-fp-ring", { attr: { r: 50 }, strokeOpacity: 0.6 }, { attr: { r: 76 }, strokeOpacity: 0, duration: 0.9, ease: "power2.out" }, "<")
          .fromTo(".dv-scan", { y: 0, opacity: 1 }, { y: 96, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: 1 })
          .to(".dv-scan", { opacity: 0, duration: 0.15 })
          .to(".dv-fp", { opacity: 0, duration: 0.25 }, "<")
          .to(".dv-hint", { opacity: 0, duration: 0.25 }, "<")
          .fromTo(".dv-ok", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.45, ease: "back.out(2.5)" })
          .to(".dv-confirmed", { opacity: 1, duration: 0.3 }, "<")
          .to(".dv-waiting", { opacity: 0, duration: 0.3 }, "<0.2")
          .to(".dv-dash", { opacity: 1, duration: 0.4 })
          .fromTo(".dv-bar", { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 100%", duration: 0.6, stagger: 0.06, ease: "power3.out" }, "<")
          .to(".dv-chip", { fillOpacity: 0.4, duration: 0.3, yoyo: true, repeat: 1 }, "<")
          .to({}, { duration: 1.6 })
          .to([".dv-dash", ".dv-ok", ".dv-confirmed"], { opacity: 0, duration: 0.4 })
          .to([".dv-waiting", ".dv-fp", ".dv-hint"], { opacity: 1, duration: 0.4 });
      }

      // Migros Bank Connect: request arrives, popup counts down, cursor accepts
      if (root.current?.querySelector(".mb-popup")) {
        const { x: ax, y: ay } = MB.accept;
        gsap.set(".mb-cursor", { x: 690, y: 470 });
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.6 })
          .fromTo(".mb-packet", { attr: { cx: 306, cy: 164 }, opacity: 1 }, {
            attr: { cx: 350, cy: 206 },
            duration: 0.9,
            ease: "power2.inOut",
          })
          .to(".mb-packet", { opacity: 0, duration: 0.2 })
          .to(".mb-ready", { opacity: 0, duration: 0.3 }, "<")
          .fromTo(".mb-popup", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
          .fromTo(".mb-timer", { strokeDashoffset: 0 }, { strokeDashoffset: 50, duration: 2.6, ease: "none" }, "<")
          .to(".mb-cursor", { opacity: 1, duration: 0.2 }, "<0.4")
          .to(".mb-cursor", { x: ax, y: ay, duration: 1.1, ease: "power3.inOut" }, "<")
          .to(".mb-accept", { scale: 0.94, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 1 })
          .to(".mb-popup", { opacity: 0, scale: 0.96, transformOrigin: "50% 50%", duration: 0.35 })
          .to(".mb-cursor", { opacity: 0, duration: 0.3 }, "<")
          .fromTo(".mb-done", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, transformOrigin: "50% 40%", duration: 0.5, ease: "back.out(2)" })
          .to(".mb-done", { opacity: 0, duration: 0.4, delay: 1.4 })
          .set(".mb-popup", { scale: 1 })
          .set(".mb-cursor", { x: 690, y: 470 })
          .to(".mb-ready", { opacity: 1, duration: 0.4 });
        gsap.fromTo(".mb-ready-pulse", { attr: { r: 44 }, strokeOpacity: 0.6 }, {
          attr: { r: 80 },
          strokeOpacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power1.out",
        });
        gsap.to(".mb-scan", { y: QR_N * 4 + 9, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }

      // Spark Zen: goal ring fills, breathing pulses, mood picks, points pop
      if (root.current?.querySelector(".sz-ring")) {
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.2 })
          .fromTo(".sz-ring", { strokeDashoffset: SZ.ringC }, { strokeDashoffset: SZ.ringC * 0.28, duration: 1.6, ease: "power3.out" })
          .from(".sz-item", { x: 20, opacity: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" }, "<0.3")
          .fromTo(".sz-points", { y: 0, opacity: 0 }, { y: -24, opacity: 1, duration: 0.6, ease: "power2.out" })
          .to(".sz-points", { opacity: 0, duration: 0.4 }, "+=0.3")
          .to(".sz-me", { scale: 1.04, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 }, "<")
          .fromTo(".sz-badge", { scale: 0.96 }, { scale: 1, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(3)" });
        gsap
          .timeline({ repeat: -1 })
          .to(".sz-breathe", { attr: { r: 52 }, duration: 3, ease: "sine.inOut" })
          .to(".sz-in", { opacity: 0, duration: 0.3 }, "-=0.3")
          .to(".sz-out", { opacity: 1, duration: 0.3 }, "<")
          .to(".sz-breathe", { attr: { r: 30 }, duration: 3, ease: "sine.inOut" })
          .to(".sz-out", { opacity: 0, duration: 0.3 }, "-=0.3")
          .to(".sz-in", { opacity: 1, duration: 0.3 }, "<");
        const pick = gsap.timeline({ repeat: -1 });
        [3, 4, 2, 4].forEach((k) =>
          pick.to(".sz-mood-pick", { x: k * 37, duration: 0.6, ease: "back.out(2)", delay: 1.2 })
        );
        gsap.to(".sz-wave rect", {
          scaleY: () => gsap.utils.random(0.3, 1.2),
          transformOrigin: "50% 50%",
          duration: 0.3,
          repeat: -1,
          repeatRefresh: true,
          stagger: 0.04,
          ease: "sine.inOut",
        });
      }

      // MyThings: each document slides into the AI chip, then a copy files itself away
      const mtDocs = gsap.utils.toArray<SVGGElement>(".mt-doc");
      const mtMinis = gsap.utils.toArray<SVGGElement>(".mt-mini");
      if (mtDocs.length) {
        const sorter = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
        mtDocs.forEach((doc, k) => {
          const target = sortTo[k];
          const fy = MT.folderY0 + target * MT.folderGap;
          sorter
            .set(doc, { x: 70, y: MT.chipY, scale: 1, rotate: -6, opacity: 0 })
            .to(doc, { opacity: 1, duration: 0.3 })
            .to(doc, { x: MT.chipX - 20, rotate: 0, duration: 1.1, ease: "power2.inOut" }, "<")
            .to(doc, { scale: 0.2, opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.25")
            .to(".mt-chip", { scale: 1.08, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1 }, "<")
            .fromTo(
              ".mt-pulse",
              { attr: { r: 58 }, strokeOpacity: 0.6 },
              { attr: { r: 96 }, strokeOpacity: 0, duration: 0.8, ease: "power2.out" },
              "<"
            )
            .fromTo(
              mtMinis[k],
              { x: MT.chipX + 40, y: MT.chipY, opacity: 1, scale: 0.6 },
              { x: MT.folderX + 26, y: fy, scale: 1, duration: 0.8, ease: "power3.inOut" },
              "<0.1"
            )
            .to(mtMinis[k], { opacity: 0, scale: 0.5, duration: 0.2 })
            .to(`.mt-folder-${target}`, { x: 8, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, "<");
        });
      }
      gsap
        .timeline({ repeat: -1 })
        .to(".mt-offline", { opacity: 0, duration: 0.4, delay: 2.2 })
        .to(".mt-synced", { opacity: 1, duration: 0.4 }, "<")
        .to(".mt-synced", { opacity: 0, duration: 0.4, delay: 2.6 })
        .to(".mt-offline", { opacity: 1, duration: 0.4 }, "<");
      gsap
        .timeline({ repeat: -1, repeatDelay: 1.5 })
        .to(".mt-device", { opacity: 0.35, duration: 0.5, delay: 1.5 })
        .to(".mt-logout", { opacity: 1, duration: 0.4 }, "<")
        .to(".mt-logout", { opacity: 0, duration: 0.4, delay: 2 })
        .to(".mt-device", { opacity: 1, duration: 0.4 }, "<");

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
