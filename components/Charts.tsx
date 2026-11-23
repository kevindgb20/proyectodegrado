"use client";

import { useRef, useState } from "react";
import { useInView } from "@/lib/hooks";

export interface Bar {
  label: string;
  value: number;
  note?: string;
}

/** Barras horizontales de una sola serie; el texto va en tinta, el color solo en la marca. */
export function HBars({ title, bars, total, tone, unit = "personas", caption }: { title: string; bars: Bar[]; total: number; tone: "red" | "violet"; unit?: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.4);
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <figure ref={ref} className={`hbars t-${tone} ${inView ? "go" : ""}`}>
      <figcaption>
        <b>{title}</b>
        <span>
          {total} {unit}
        </span>
      </figcaption>
      <ul>
        {bars.map((b, i) => (
          <li key={b.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className={hover === i ? "hl" : ""}>
            <span className="hb-label">{b.label}</span>
            <span className="hb-track">
              <span className="hb-fill" style={{ width: `${(b.value / max) * 100}%`, transitionDelay: `${i * 90}ms` }} />
              {hover === i && (
                <span className="hb-tip" role="tooltip">
                  {b.value} de {total} · {Math.round((b.value / total) * 100)} %{b.note ? ` · ${b.note}` : ""}
                </span>
              )}
            </span>
            <span className="hb-v">{b.value}</span>
          </li>
        ))}
      </ul>
      {caption && <p className="hb-cap">{caption}</p>}
    </figure>
  );
}

/** Distribución en escala 1–5 con el promedio marcado. */
export function Scale({ title, counts, tone, avg }: { title: string; counts: number[]; tone: "red" | "violet"; avg: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.4);
  const [hover, setHover] = useState<number | null>(null);
  const total = counts.reduce((a, b) => a + b, 0);
  const max = Math.max(...counts, 1);
  return (
    <figure ref={ref} className={`scale t-${tone} ${inView ? "go" : ""}`}>
      <figcaption>
        <b>{title}</b>
        <span>
          promedio <b className="display">{avg.toLocaleString("es-CO")}</b> de 5
        </span>
      </figcaption>
      <div className="sc-plot">
        <span className="sc-avg" style={{ left: `${((avg - 0.5) / 5) * 100}%` }} aria-hidden="true">
          <i />
        </span>
        {counts.map((c, i) => (
          <div key={i} className="sc-col" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            {hover === i && (
              <span className="hb-tip" role="tooltip">
                {c} {c === 1 ? "persona" : "personas"} respondieron {i + 1}
              </span>
            )}
            <span className="sc-bar" style={{ height: `${(c / max) * 100}%`, transitionDelay: `${i * 90}ms` }} />
            <span className="sc-n">{c || ""}</span>
          </div>
        ))}
      </div>
      <div className="sc-axis">
        {[1, 2, 3, 4, 5].map((k) => (
          <span key={k}>{k}</span>
        ))}
      </div>
      <p className="hb-cap">
        {total} respuestas · 1 = nada, 5 = completamente
      </p>
    </figure>
  );
}
