"use client";

import { useState } from "react";
import { STATES, type SceneState } from "@/lib/audio";
import { useFrame } from "@/lib/hooks";
import Reveal from "./Reveal";

const INFO: Record<SceneState, string> = {
  silencio: "Más de ~1,2 s sin sonido: cualquier efecto baja al 10 % y vuelve en 0,3 s en cuanto suena algo.",
  calma: "Ambiente tenue y respiraciones lentas de dos compases.",
  melodía: "Voz o línea tonal: una luz sigue la voz y otra respira. Una melodía no inventa beats.",
  acumulación: "Subida sostenida del nivel: el brillo crece y el movimiento se acelera hacia el drop.",
  groove: "El principal en el golpe, el acompañamiento en el contratiempo.",
  clímax: "Música fuerte y percusiva: el único momento en que se permite el estrobo.",
  break: "El principal casi apagado; el acompañamiento chispea con los agudos.",
};

export default function Director() {
  const [state, setState] = useState<SceneState>("silencio");
  useFrame((f) => {
    if (f.state !== state) setState(f.state);
  });

  return (
    <section className="section director" id="en-vivo">
      <div className="director-grid">
        <Reveal as="header" className="section-head left">
          <p className="eyebrow">Modo en vivo</p>
          <h2>
            Tocas y <span className="grad">la luz responde sola</span>
          </h2>
          <p className="lead">
            Cada ~0,1 s el director mira a la vez el nivel y su evolución, graves, medios y agudos por separado, golpes
            por segundo, si el sonido es tonal y la regularidad del pulso. Decide por votación de los últimos 2 s: no
            cambia de escena a lo loco.
          </p>
          <p className="lead">
            Si sigue una sesión ya diseñada, reconoce en qué parte vas y lanza sus cues. Si improvisas, pasa a autónomo
            hasta reencontrarte.
          </p>
        </Reveal>
        <Reveal className="states card" delay={120}>
          <p className="states-head mono">
            <span className="rec" /> director autónomo · escuchando
          </p>
          <ul>
            {STATES.map((s) => (
              <li key={s} className={s === state ? "active" : ""} data-state={s}>
                <span className="state-name">{s}</span>
                <span className="state-info">{INFO[s]}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
