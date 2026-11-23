"use client";

import { useEffect, useRef } from "react";
import { engine, follow, rgba, roleTargets, ROLE_COLORS, type Role } from "@/lib/audio";

interface Fixture {
  x: number;
  role: Role;
  phase: number;
}

const FIXTURES: Fixture[] = [
  { x: 0.1, role: "principal", phase: 0 },
  { x: 0.28, role: "acompañamiento", phase: 1.3 },
  { x: 0.5, role: "acentos", phase: 2.1 },
  { x: 0.72, role: "acompañamiento", phase: 3.4 },
  { x: 0.9, role: "principal", phase: 4.2 },
];

const MOTION: Record<string, { speed: number; amp: number }> = {
  silencio: { speed: 0.15, amp: 0.08 },
  calma: { speed: 0.3, amp: 0.18 },
  melodía: { speed: 0.45, amp: 0.25 },
  acumulación: { speed: 1.1, amp: 0.32 },
  groove: { speed: 0.8, amp: 0.35 },
  clímax: { speed: 1.7, amp: 0.45 },
  break: { speed: 0.5, amp: 0.2 },
};

export default function StageCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.5, y: 0.7, w: 0 };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
      mouse.w = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const dust = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: -(Math.random() * 0.0005 + 0.0001),
      s: Math.random() * 1.5 + 0.4,
    }));
    const lv: Record<Role, number> = { principal: 0, acompañamiento: 0, acentos: 0, fondo: 0 };
    const angles = FIXTURES.map(() => Math.PI / 2);
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);

    const unsub = engine.subscribe((f) => {
      if (!visible || W === 0) return;
      const tg = roleTargets(f);
      (Object.keys(lv) as Role[]).forEach((k) => (lv[k] = follow(lv[k], tg[k])));
      const mo = MOTION[f.state] ?? MOTION.calma;
      const amp = reduced ? mo.amp * 0.3 : mo.amp;
      mouse.w *= 0.995;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, W, H);

      const floorY = H * 0.9;
      ctx.globalCompositeOperation = "lighter";

      // Fondo: un lavado ámbar muy tenue que sigue la energía.
      const wash = ctx.createRadialGradient(W / 2, floorY, 0, W / 2, floorY, W * 0.7);
      wash.addColorStop(0, rgba(ROLE_COLORS.fondo, 0.16 * lv.fondo));
      wash.addColorStop(1, rgba(ROLE_COLORS.fondo, 0));
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, W, H);

      const beams = FIXTURES.map((fx, i) => {
        const sx = fx.x * W;
        const sy = 6;
        let target = Math.PI / 2 + Math.sin(f.t * mo.speed + fx.phase) * amp * (i % 2 ? -1 : 1);
        if (fx.role === "acentos") {
          // Seguidor: apunta al cursor.
          const aim = Math.atan2(mouse.y * H - sy, mouse.x * W - sx);
          target = target + (aim - target) * Math.min(1, mouse.w * 1.2);
        }
        angles[i] += (target - angles[i]) * 0.08;
        const I = lv[fx.role];
        const spread = (fx.role === "acentos" ? 0.055 : 0.12) + I * 0.025;
        return { sx, sy, ang: angles[i], I, spread, color: ROLE_COLORS[fx.role] };
      });

      const L = H * 1.25;
      for (const b of beams) {
        if (b.I < 0.01) continue;
        const ex = b.sx + Math.cos(b.ang) * L;
        const ey = b.sy + Math.sin(b.ang) * L;
        const g = ctx.createLinearGradient(b.sx, b.sy, ex, ey);
        g.addColorStop(0, rgba(b.color, 0.6 * b.I));
        g.addColorStop(0.55, rgba(b.color, 0.16 * b.I));
        g.addColorStop(1, rgba(b.color, 0));
        ctx.fillStyle = g;
        for (const [k, a] of [
          [1, 0.35],
          [0.55, 0.5],
          [0.22, 0.8],
        ] as const) {
          const s = b.spread * k;
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.moveTo(b.sx, b.sy);
          ctx.lineTo(b.sx + Math.cos(b.ang - s) * L, b.sy + Math.sin(b.ang - s) * L);
          ctx.lineTo(b.sx + Math.cos(b.ang + s) * L, b.sy + Math.sin(b.ang + s) * L);
          ctx.closePath();
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Charco de luz en el suelo.
        const sinA = Math.sin(b.ang);
        if (sinA > 0.15) {
          const dist = (floorY - b.sy) / sinA;
          const hx = b.sx + Math.cos(b.ang) * dist;
          const r = dist * Math.tan(b.spread) * 1.3;
          ctx.save();
          ctx.translate(hx, floorY);
          ctx.scale(1, 0.22);
          const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
          pool.addColorStop(0, rgba(b.color, 0.55 * b.I));
          pool.addColorStop(1, rgba(b.color, 0));
          ctx.fillStyle = pool;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Lente.
        const lens = ctx.createRadialGradient(b.sx, b.sy, 0, b.sx, b.sy, 26);
        lens.addColorStop(0, rgba([255, 255, 255], 0.9 * b.I));
        lens.addColorStop(0.3, rgba(b.color, 0.7 * b.I));
        lens.addColorStop(1, rgba(b.color, 0));
        ctx.fillStyle = lens;
        ctx.fillRect(b.sx - 26, b.sy - 26, 52, 52);
      }

      // Polvo en suspensión: sólo se ve dentro de los haces.
      for (const d of dust) {
        d.x += d.vx + Math.sin(f.t * 0.3 + d.y * 6) * 0.0002;
        d.y += d.vy;
        if (d.y < 0) d.y = 1;
        if (d.x < 0) d.x = 1;
        if (d.x > 1) d.x = 0;
        const px = d.x * W;
        const py = d.y * H;
        let lit = 0.04;
        let col: readonly number[] = [255, 255, 255];
        for (const b of beams) {
          const a = Math.atan2(py - b.sy, px - b.sx);
          const diff = Math.abs(a - b.ang);
          if (diff < b.spread) {
            const v = b.I * (1 - diff / b.spread);
            if (v > lit) {
              lit = v;
              col = b.color;
            }
          }
        }
        ctx.fillStyle = rgba(col, lit * 0.9);
        ctx.fillRect(px, py, d.s, d.s);
      }

      // Silueta del intérprete detrás de la mesa, con los pads del Loopstation encendiéndose en bucle.
      ctx.globalCompositeOperation = "source-over";
      const cx = W * 0.66;
      const u = Math.min(W, H * 1.4) / 900;
      const tableY = floorY - 70 * u;
      ctx.fillStyle = "#020203";
      ctx.beginPath();
      ctx.arc(cx, tableY - 150 * u, 26 * u, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx - 34 * u, tableY - 118 * u);
      ctx.lineTo(cx + 34 * u, tableY - 118 * u);
      ctx.lineTo(cx + 62 * u, tableY + 4 * u);
      ctx.lineTo(cx - 62 * u, tableY + 4 * u);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(cx - 150 * u, tableY, 300 * u, 14 * u);
      ctx.fillRect(cx - 140 * u, tableY + 14 * u, 8 * u, floorY - tableY - 14 * u);
      ctx.fillRect(cx + 132 * u, tableY + 14 * u, 8 * u, floorY - tableY - 14 * u);
      const step = Math.floor(f.t / 0.6) % 5;
      for (let k = 0; k < 5; k++) {
        const on = k <= step ? 1 : 0.25;
        const px = cx - 110 * u + k * 46 * u;
        ctx.fillStyle = rgba(ROLE_COLORS.principal, (0.35 + 0.65 * on) * (0.4 + 0.6 * Math.max(lv.principal, 0.3)));
        ctx.shadowColor = rgba(ROLE_COLORS.principal, 0.9 * on);
        ctx.shadowBlur = 14 * on * u;
        ctx.fillRect(px, tableY - 9 * u, 36 * u, 7 * u);
      }
      ctx.shadowBlur = 0;

      // Barra roja superior del escenario.
      ctx.fillStyle = "#0b0b0e";
      ctx.fillRect(0, 0, W, 8);
      for (const b of beams) {
        ctx.fillStyle = "#16161b";
        ctx.fillRect(b.sx - 9, 0, 18, 12);
      }
    });

    return () => {
      unsub();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="stage-canvas" aria-hidden="true" />;
}
