"use client";

import { useEffect, useRef, useState } from "react";
import { CUES, PIECE_LEN, videoSrc, type Cue } from "@/lib/media";
import { PlayIcon } from "./VideoPlayer";

const HEX = { azul: "#1c3aa8", verde: "#0d7a45", blanco: "#f4f4f8" } as const;

/** Colores de los dos grupos de reflectores (C y F) en una entrada del prompt. */
function groupColors(c: Cue): [string, string] {
  if (c.color === "blanco") return [HEX.blanco, HEX.blanco];
  if (c.color === "verde") return [HEX.verde, HEX.verde];
  if (c.color === "mixto") return c.n === 14 || c.n === 15 ? [HEX.verde, HEX.azul] : [HEX.azul, HEX.verde];
  return [HEX.azul, HEX.azul];
}

function segBg(c: Cue) {
  const [a, b] = groupColors(c);
  return a === b ? a : `linear-gradient(180deg, ${a} 50%, ${b} 50%)`;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function PromptSync() {
  const video = useRef<HTMLVideoElement>(null);
  const lamps = useRef<(HTMLSpanElement | null)[]>([]);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const cue = CUES.find((c) => t >= c.a && t < c.b) ?? CUES[CUES.length - 1];

  // Simulación de los dos grupos según el comportamiento de la entrada.
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const now = video.current?.currentTime ?? t;
      const c = CUES.find((x) => now >= x.a && now < x.b) ?? CUES[CUES.length - 1];
      const cols = groupColors(c);
      const k = performance.now() / 1000;
      [0, 1].forEach((g) => {
        let v = c.level;
        if (c.fx === "breathe") v *= 0.55 + 0.45 * Math.sin(k * (c.n === 14 ? 7 : 2.2) + g);
        else if (c.fx === "pulse") v *= 0.35 + 0.65 * Math.max(0, Math.cos(k * 10.4 + g * 1.6)) ** 3;
        else if (c.fx === "strobe") v *= Math.sin(k * 52 + g) > 0.2 ? 1 : 0.08;
        else if (c.fx === "step") v *= Math.floor(k * 2.6 + g) % 2 ? 1 : 0.2;
        else if (c.fx === "follow") v *= 0.6 + 0.4 * Math.sin(k * 1.3);
        if (!playing && started) v *= 0.85;
        const el = lamps.current[g];
        if (el) {
          el.style.setProperty("--c", cols[g]);
          el.style.setProperty("--v", Math.max(0.04, v).toFixed(3));
        }
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, started, t]);

  const seek = (c: Cue) => {
    const v = video.current;
    setStarted(true);
    if (v) {
      v.currentTime = c.a + 0.05;
      void v.play();
    }
    setT(c.a + 0.05);
  };

  const s = videoSrc("renegade-gbb25");

  return (
    <div className="psync">
      <div className="ps-stage">
        <div className="ps-video">
          <video
            ref={video}
            src={started ? s.src : undefined}
            poster={s.poster}
            controls={started}
            playsInline
            preload="none"
            onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          {!started && (
            <button
              className="fv-poster ps-start"
              onClick={() => {
                setStarted(true);
                requestAnimationFrame(() => void video.current?.play());
              }}
              aria-label="Reproducir Renegade con el mapa del prompt"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.poster} alt="" />
              <span className="fv-play">
                <PlayIcon size={34} />
              </span>
              <span className="fv-badge">Escucha la pieza y sigue el prompt · 3:38</span>
            </button>
          )}
        </div>
        <div className="ps-rig" aria-label="Simulación de los dos grupos de reflectores">
          <div className="ps-lamps">
            {["C", "F"].map((g, i) => (
              <span key={g} className="ps-lamp" ref={(el) => void (lamps.current[i] = el)}>
                <i />
                <b>{g === "C" ? "Grupo C" : "Grupo F · frontal"}</b>
              </span>
            ))}
          </div>
          <div className="ps-cue" key={cue.n}>
            <span className="display ps-n">{String(cue.n).padStart(2, "0")}</span>
            <div>
              <b className={`ps-name ${cue.key ? "key" : ""}`}>{cue.name}</b>
              <code>{cue.rule}</code>
              <small>
                {fmt(cue.a)} – {fmt(cue.b)} · fundido {cue.fade}
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="ps-timeline" role="list" aria-label="Las veintidós entradas del prompt">
        {CUES.map((c) => (
          <button
            key={c.n}
            role="listitem"
            className={`ps-seg ${c.n === cue.n && started ? "cur" : ""} ${c.key ? "key" : ""}`}
            style={{ flexGrow: c.b - c.a, background: segBg(c) }}
            onClick={() => seek(c)}
            title={`${String(c.n).padStart(2, "0")} · ${c.name} · ${fmt(c.a)}`}
            aria-label={`Entrada ${c.n}, ${c.name}, ${fmt(c.a)}`}
          />
        ))}
        {started && <span className="ps-head" style={{ left: `${(Math.min(t, PIECE_LEN) / PIECE_LEN) * 100}%` }} aria-hidden="true" />}
      </div>
      <div className="ps-axis" aria-hidden="true">
        {["0:00", "0:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:38"].map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <div className="ps-legend">
        <span>
          <i style={{ background: HEX.azul }} /> Azul oscuro
        </span>
        <span>
          <i style={{ background: HEX.verde }} /> Verde oscuro
        </span>
        <span>
          <i style={{ background: HEX.blanco }} /> Blanco
        </span>
        <span className="muted">Toca un bloque para saltar a ese momento.</span>
      </div>
    </div>
  );
}
