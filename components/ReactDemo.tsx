"use client";

import { useRef } from "react";
import { engine, follow, rgba, ROLE_COLORS } from "@/lib/audio";
import { useEngineStatus, useFrame } from "@/lib/hooks";

const N = 9;

/** Nivel 01 en vivo: unas PAR que solo reaccionan a la energía del sonido (nivel, frecuencia, pulso). */
export default function ReactDemo() {
  const status = useEngineStatus();
  const lamps = useRef<(HTMLSpanElement | null)[]>([]);
  const lv = useRef<number[]>(Array(N).fill(0));

  useFrame((f) => {
    for (let i = 0; i < N; i++) {
      // Cada PAR toma una banda distinta: graves en los extremos, agudos en el centro.
      const d = Math.abs(i - (N - 1) / 2) / ((N - 1) / 2);
      const target = f.state === "silencio" ? 0.04 : d > 0.6 ? Math.max(f.beat, f.bass * 0.6) : d > 0.3 ? Math.max(f.offbeat, f.mid * 0.6) : Math.max(f.accent, f.high * 0.5);
      const v = (lv.current[i] = follow(lv.current[i], target));
      const c = i % 3 === 1 ? ROLE_COLORS.acentos : ROLE_COLORS.principal;
      const el = lamps.current[i];
      if (el) {
        el.style.setProperty("--beam", rgba(c, 0.15 + v * 0.85));
        el.style.setProperty("--glow", rgba(c, v));
        el.style.opacity = String(0.35 + v * 0.65);
      }
    }
  });

  const live = status.mode === "mic";
  return (
    <div className="react-demo">
      <div className="par-row" aria-hidden="true">
        {Array.from({ length: N }, (_, i) => (
          <span key={i} className="par" ref={(el) => void (lamps.current[i] = el)}>
            <i />
          </span>
        ))}
      </div>
      <div className="react-foot">
        <p>
          <b>Esto es reaccionar.</b> Estas luces siguen el nivel, la frecuencia y el pulso del sonido. Una sección intensa y
          una sección tensa pueden tener el mismo nivel y significar cosas opuestas: aquí no hay un lugar donde se le diga cuál
          es cuál.
        </p>
        <button
          className={`btn ${live ? "on" : "outline"}`}
          onClick={() => (live ? engine.disableMic() : void engine.enableMic())}
          disabled={status.pending}
        >
          <span className="mic-dot" aria-hidden="true" />
          {status.pending ? "Abriendo micrófono…" : live ? "Detener micrófono" : "Pruébalo con tu micrófono"}
        </button>
      </div>
      {status.error && <p className="hint warn">{status.error}</p>}
    </div>
  );
}
