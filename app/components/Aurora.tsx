"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntro } from "@/lib/scroll";

// The aurora is soft, so render at half resolution and let CSS upscale it.
const RENDER_SCALE = 0.5;

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform float uScroll;
uniform float uIntro;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
  float t = uTime * 0.05;

  // Cursor: a soft ripple that bends the flow around the pointer
  vec2 d = p - m;
  float md = length(d);
  float infl = exp(-md * md * 7.0) * uHover;
  p += normalize(d + 1e-4) * infl * 0.09 * sin(md * 16.0 - uTime * 2.2);

  // Scrolling drifts the field upward and stretches it
  p.y -= uScroll * 0.7;
  p *= 1.0 + uScroll * 0.25;

  // Domain-warped noise gives the smoky, aurora-like motion
  vec2 q = vec2(fbm(p * 0.9 + vec2(0.0, t)), fbm(p * 0.9 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 1.1 + 3.0 * q + vec2(1.7, 9.2) + t * 1.3),
                fbm(p * 1.1 + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.0 + 3.0 * r);

  vec3 ink = vec3(0.031, 0.027, 0.043);
  vec3 deep = vec3(0.20, 0.09, 0.48);
  vec3 violet = vec3(0.545, 0.361, 0.965);
  vec3 cyan = vec3(0.133, 0.827, 0.933);

  vec3 col = mix(ink, deep, smoothstep(0.25, 0.85, f));
  col = mix(col, violet, smoothstep(0.55, 1.05, length(q)) * 0.75);
  col = mix(col, cyan, smoothstep(0.5, 0.9, r.x) * smoothstep(0.3, 0.7, f) * 0.45);
  col += violet * smoothstep(0.55, 0.75, f) * (1.0 - smoothstep(0.75, 0.95, f)) * 0.25;
  col += mix(violet, cyan, 0.4) * infl * 0.28;
  col *= 0.85;

  // Keep edges and the lower half (where the name sits) dark and readable
  float vig = smoothstep(1.35, 0.25, length(p * vec2(0.75, 1.1)));
  col = mix(ink, col, vig);
  col = mix(ink, col, smoothstep(0.05, 0.75, vUv.y));
  col = mix(ink, col, uIntro);

  // Dither to hide gradient banding
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}`;

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
};

/** Flowing violet/cyan WebGL aurora that ripples around the cursor and drifts on scroll. */
const Aurora = ({ className = "" }: { className?: string }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const el = canvas.current!;
    const gl = el.getContext("webgl", { antialias: false, alpha: false, depth: false });
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!gl || gl.isContextLost() || !vs || !fs) {
      el.style.display = "none"; // CSS gradient behind the canvas takes over
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse");
    const uHover = u("uHover"), uScroll = u("uScroll"), uIntro = u("uIntro");

    const state = { mx: 0.5, my: 0.7, hover: 0, scroll: 0, intro: 0 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      el.width = Math.max(1, Math.round(el.clientWidth * RENDER_SCALE));
      el.height = Math.max(1, Math.round(el.clientHeight * RENDER_SCALE));
      gl.viewport(0, 0, el.width, el.height);
      gl.uniform2f(uRes, el.width, el.height);
      if (reduce) draw(0);
    };

    const draw = (time: number) => {
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, state.mx, state.my);
      gl.uniform1f(uHover, state.hover);
      gl.uniform1f(uScroll, state.scroll);
      gl.uniform1f(uIntro, state.intro);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(el);

    if (reduce) {
      state.intro = 1;
      resize();
      return () => ro.disconnect();
    }

    // Smoothed pointer, in canvas UV space (y up)
    const mxTo = gsap.quickTo(state, "mx", { duration: 1.4, ease: "power3" });
    const myTo = gsap.quickTo(state, "my", { duration: 1.4, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const inside = e.clientY >= r.top && e.clientY <= r.bottom;
      mxTo((e.clientX - r.left) / r.width);
      myTo(1 - (e.clientY - r.top) / r.height);
      gsap.to(state, { hover: inside ? 1 : 0, duration: 0.8, overwrite: "auto" });
    };
    window.addEventListener("pointermove", move);

    const offIntro = onIntro(() =>
      gsap.to(state, { intro: 1, duration: 2.6, ease: "power2.out", delay: 0.2 })
    );

    ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => (state.scroll = self.progress),
    });

    // Only render while the hero is on screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const tick = (time: number) => {
      if (visible) draw(time);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", move);
      offIntro();
      io.disconnect();
      ro.disconnect();
      // Don't force-lose the context: a remount reuses this canvas and would get a dead context
      gl.deleteProgram(program);
    };
  });

  return (
    <div
      aria-hidden
      className={`bg-[radial-gradient(60%_50%_at_50%_15%,rgba(139,92,246,0.35),transparent_70%)] ${className}`}
    >
      <canvas ref={canvas} className="h-full w-full" />
    </div>
  );
};

export default Aurora;
