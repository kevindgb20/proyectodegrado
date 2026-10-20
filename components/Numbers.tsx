"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/hooks";
import Reveal from "./Reveal";

const STATS = [
  { value: 98, decimals: 0, suffix: " %", label: "del tiempo en el cue correcto siguiendo una sesión" },
  { value: 99.8, decimals: 1, suffix: " BPM", label: "pulso en vivo medido sobre un audio de 100 BPM" },
  { value: 15, decimals: 0, suffix: " ms", label: "de error de fase en el pulso en vivo" },
  { value: 100, decimals: 0, suffix: " %", label: "de los golpes con destello, pico a 8–18 ms" },
  { value: 5000, decimals: 0, suffix: "", label: "envíos al cable real en 5 min, 0 errores" },
  { value: 6, decimals: 0, suffix: " s", label: "por propuesta con Gemini, validada a la primera" },
];

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, 0.5);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setV(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} className="stat-value">
      {v.toLocaleString("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      <small>{suffix}</small>
    </span>
  );
}

export default function Numbers() {
  return (
    <section className="section" id="cifras">
      <Reveal as="header" className="section-head">
        <p className="eyebrow">Medido, no prometido</p>
        <h2>
          Cada dato lleva <span className="grad">su confianza</span>
        </h2>
        <p className="lead">
          Pruebas con audio sintético de estructura conocida y con el cable real. Lo que no se puede determinar se
          declara como limitación.
        </p>
      </Reveal>
      <div className="stats">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 70} className="card stat">
            <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            <p>{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
