"use client";

import { useRef } from "react";
import { engine } from "@/lib/audio";
import { useEngineStatus, useFrame } from "@/lib/hooks";
import StageCanvas from "./StageCanvas";

export default function Hero() {
  const status = useEngineStatus();
  const stateRef = useRef<HTMLSpanElement>(null);
  const bpmRef = useRef<HTMLSpanElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lastState = useRef("");

  useFrame((f) => {
    if (stateRef.current && lastState.current !== f.state) {
      lastState.current = f.state;
      stateRef.current.textContent = f.state;
      stateRef.current.dataset.state = f.state;
    }
    if (bpmRef.current) bpmRef.current.textContent = f.bpm ? f.bpm.toFixed(0) : "—";
    [f.bass, f.mid, f.high].forEach((v, i) => {
      const el = barRefs.current[i];
      if (el) el.style.transform = `scaleX(${Math.max(0.02, v)})`;
    });
  });

  const live = status.mode === "mic";

  return (
    <section className="hero" id="inicio">
      <StageCanvas />
      <div className="hero-vignette" />
      <div className="hero-inner">
        <p className="kicker reveal-now">
          <span className="dot" /> IA Iluminación · loopstation → luz
        </p>
        <h1 className="hero-title">
          <span className="line">Experiencia de</span>
          <span className="line shimmer">traducción sonora</span>
          <span className="line">en iluminación escénica</span>
        </h1>
        <p className="hero-sub">
          apoyada con <strong>inteligencia artificial</strong>. La música de una BOSS RC-505 MK2 se escucha, se analiza
          y se convierte en luz DMX que respira, golpea y calla con ella.
        </p>
        <div className="hero-cta">
          <button
            className={`btn primary ${live ? "on" : ""}`}
            onClick={() => (live ? engine.disableMic() : void engine.enableMic())}
            disabled={status.pending}
          >
            <span className="mic-ico" aria-hidden="true" />
            {status.pending ? "Abriendo micrófono…" : live ? "Volver a la señal simulada" : "Tocar con tu micrófono"}
          </button>
          <a className="btn ghost" href="#flujo">
            Ver cómo funciona ↓
          </a>
        </div>
        {status.error && <p className="hero-error">{status.error}</p>}
        <p className="hint">Mueve el cursor (o toca la pantalla): el haz central es un seguidor.</p>
      </div>

      <div className="hud" aria-live="off">
        <span className={`badge ${live ? "mic" : "sim"}`}>{live ? "MICRÓFONO EN VIVO" : "SIMULACIÓN · 100 BPM"}</span>
        <div className="hud-item">
          <small>estado</small>
          <span ref={stateRef} className="hud-state">
            —
          </span>
        </div>
        <div className="hud-item">
          <small>BPM</small>
          <span ref={bpmRef} className="mono">
            —
          </span>
        </div>
        <div className="hud-bands">
          {["graves", "medios", "agudos"].map((b, i) => (
            <div key={b} className="hud-band">
              <small>{b}</small>
              <span className="track">
                <span className={`fill b${i}`} ref={(el) => void (barRefs.current[i] = el)} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
