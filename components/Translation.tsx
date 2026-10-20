"use client";

import { useEffect, useRef, useState } from "react";
import { follow, roleTargets, ROLE_COLORS, type Role } from "@/lib/audio";
import { useFrame, useInView } from "@/lib/hooks";
import Reveal from "./Reveal";

const PROPOSAL = `{
  "cue": "drop",
  "start": 42.6,
  "layers": [
    {
      "targets": ["principal"],
      "behavior": "pulse_beat",
      "color": "#7c5cff"
    },
    {
      "targets": ["acompañamiento"],
      "behavior": "pulse_offbeat",
      "color": "#00d1b2"
    },
    {
      "targets": ["acentos"],
      "behavior": "pulse_highs",
      "color": "#ffffff"
    }
  ]
}`;

// Patch de ejemplo: 6 PAR de 7 canales (dimmer, R, G, B, W, estrobo, macro) desde la dirección 1 → 42 canales.
const FOOTPRINT = 7;
const PATCH: Role[] = ["principal", "acompañamiento", "acentos", "acentos", "acompañamiento", "principal"];
const COLS = 32;
const ROWS = 16;
const GAMMA = 2.2;

function highlight(code: string) {
  return code
    .replace(/("[^"]*")(\s*:)/g, '<i class="k">$1</i>$2')
    .replace(/:\s*("[^"]*")/g, ': <i class="s">$1</i>')
    .replace(/\[("[^"]*")\]/g, '[<i class="s">$1</i>]')
    .replace(/(\d+\.\d+)/g, '<i class="n">$1</i>');
}

function Typed() {
  const ref = useRef<HTMLPreElement>(null);
  const inView = useInView(ref, 0.3);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(PROPOSAL.length);
      return;
    }
    const id = setInterval(() => {
      setN((v) => {
        if (v >= PROPOSAL.length) {
          clearInterval(id);
          return v;
        }
        return v + 3;
      });
    }, 16);
    return () => clearInterval(id);
  }, [inView]);
  const shown = PROPOSAL.slice(0, n);
  return (
    <pre ref={ref} className="code mono">
      <code dangerouslySetInnerHTML={{ __html: highlight(shown) }} />
      <span className="caret" />
    </pre>
  );
}

function Universe() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ ch: number; x: number; y: number } | null>(null);
  const values = useRef(new Uint8Array(512));
  const lv = useRef<Record<Role, number>>({ principal: 0, acompañamiento: 0, acentos: 0, fondo: 0 });
  const tipVal = useRef<HTMLSpanElement>(null);
  const hoverCh = useRef<number | null>(null);

  useFrame((f) => {
    const cv = ref.current;
    if (!cv) return;
    const tg = roleTargets(f);
    (Object.keys(lv.current) as Role[]).forEach((k) => (lv.current[k] = follow(lv.current[k], tg[k])));
    const v = values.current;
    PATCH.forEach((role, i) => {
      const base = i * FOOTPRINT;
      const I = lv.current[role];
      const c = ROLE_COLORS[role];
      v[base] = I > 0.02 ? Math.round(10 + I * 245) : 0; // dimmer mínimo 10/255 con la luz encendida
      for (let k = 0; k < 3; k++) v[base + 1 + k] = Math.round(Math.pow(c[k] / 255, GAMMA) * 255);
      v[base + 4] = role === "acentos" ? Math.round(I * 255) : 0;
      v[base + 5] = role === "acentos" && f.state === "clímax" ? Math.round(120 + f.accent * 80) : 0;
      v[base + 6] = 0;
    });

    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = cv.clientWidth;
    const h = cv.clientHeight;
    if (cv.width !== Math.round(w * dpr)) {
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const cw = w / COLS;
    const chh = h / ROWS;
    for (let ch = 0; ch < 512; ch++) {
      const x = (ch % COLS) * cw;
      const y = Math.floor(ch / COLS) * chh;
      const fix = Math.floor(ch / FOOTPRINT);
      const val = v[ch] / 255;
      if (fix < PATCH.length) {
        const c = ROLE_COLORS[PATCH[fix]];
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.12 + val * 0.88})`;
      } else {
        ctx.fillStyle = "#141821";
      }
      ctx.fillRect(x + 1, y + 1, cw - 2, chh - 2);
    }
    if (hoverCh.current !== null && tipVal.current) tipVal.current.textContent = String(v[hoverCh.current]);
  });

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const col = Math.floor(((e.clientX - r.left) / r.width) * COLS);
    const row = Math.floor(((e.clientY - r.top) / r.height) * ROWS);
    const ch = Math.min(511, Math.max(0, row * COLS + col));
    hoverCh.current = ch;
    setHover({ ch, x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const fix = hover ? Math.floor(hover.ch / FOOTPRINT) : -1;
  const names = ["dimmer", "rojo", "verde", "azul", "blanco", "estrobo", "macro"];

  return (
    <div className="universe-wrap">
      <canvas
        ref={ref}
        className="universe"
        onPointerMove={onMove}
        onPointerLeave={() => {
          hoverCh.current = null;
          setHover(null);
        }}
        aria-label="Universo DMX de 512 canales en tiempo real"
        role="img"
      />
      {hover && (
        <div className="tip mono" style={{ left: hover.x, top: hover.y }}>
          canal {hover.ch + 1}
          {fix < PATCH.length ? ` · PAR ${fix + 1} ${names[hover.ch % FOOTPRINT]}` : " · libre"} ·{" "}
          <span ref={tipVal}>{values.current[hover.ch]}</span>
        </div>
      )}
    </div>
  );
}

export default function Translation() {
  return (
    <section className="section" id="ia">
      <Reveal as="header" className="section-head">
        <p className="eyebrow">La pieza clave</p>
        <h2>
          La IA <span className="grad">no escribe valores DMX</span>
        </h2>
        <p className="lead">
          Propone cues con comportamientos como <code>pulse_beat</code> o <code>follow_bass</code>. El compilador los
          convierte en canales usando los pulsos y la energía <em>medidos</em> y los perfiles reales. Cualquier propuesta
          es reproducible, validable y segura.
        </p>
      </Reveal>
      <div className="translate-grid">
        <Reveal className="card">
          <p className="card-label mono">propuesta · Gemini / OpenAI</p>
          <Typed />
        </Reveal>
        <div className="compiler" aria-hidden="true">
          <span>compilador</span>
          <i />
        </div>
        <Reveal className="card" delay={150}>
          <p className="card-label mono">universo · 512 canales · en vivo</p>
          <Universe />
          <p className="hint">
            Pasa el cursor por los canales. Color con gamma 2,2 (lo que ves es lo que emite el LED) y dimmer mínimo
            10/255.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
