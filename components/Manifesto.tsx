"use client";

import { useEffect, useRef } from "react";

const TEXT =
  "La luz no decora la música: la traduce. Cada golpe, cada silencio y cada voz se convierte en una decisión de iluminación que se puede medir, validar y repetir.";
const KEY = new Set(["traduce.", "golpe,", "silencio", "voz", "medir,", "validar", "repetir."]);

/** Las palabras se encienden una a una al hacer scroll, como un fader que sube. */
export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = TEXT.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.45)));
      const lit = p * spans.length;
      spans.forEach((s, i) => {
        const v = Math.min(1, Math.max(0, lit - i));
        s.style.setProperty("--on", v.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="section manifesto">
      <p ref={ref} className="manifesto-text">
        {words.map((w, i) => (
          <span key={i} className={KEY.has(w) ? "key" : undefined}>
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
