"use client";

import { useRef } from "react";
import { follow, rgba, roleTargets, ROLE_COLORS, type Role } from "@/lib/audio";
import { useFrame } from "@/lib/hooks";
import Reveal from "./Reveal";

const ROLES: { role: Role; title: string; listens: string; text: string }[] = [
  {
    role: "principal",
    title: "Principal",
    listens: "bombo · bajo",
    text: "El golpe fuerte y el color protagonista. Cada destello es tan intenso como el golpe que lo provoca.",
  },
  {
    role: "acompañamiento",
    title: "Acompañamiento",
    listens: "contratiempos · voz",
    text: "Responde a lo que el principal no marca. Se reparten el ritmo en vez de repetirlo.",
  },
  {
    role: "acentos",
    title: "Acentos",
    listens: "agudos · golpes sueltos",
    text: "Chispazos en los hi-hats. El estrobo sólo aparece con música fuerte y percusiva.",
  },
  {
    role: "fondo",
    title: "Fondo",
    listens: "energía general",
    text: "Ambiente lento que sostiene la escena. En silencio, todo baja suavemente al 10 %.",
  },
];

export default function Roles() {
  const lamps = useRef<(HTMLDivElement | null)[]>([]);
  const meters = useRef<(HTMLSpanElement | null)[]>([]);
  const lv = useRef<Record<Role, number>>({ principal: 0, acompañamiento: 0, acentos: 0, fondo: 0 });

  useFrame((f) => {
    const tg = roleTargets(f);
    ROLES.forEach(({ role }, i) => {
      const v = (lv.current[role] = follow(lv.current[role], tg[role]));
      const c = ROLE_COLORS[role];
      const el = lamps.current[i];
      if (el) {
        const k = 0.18 + 0.82 * v;
        const w = v * v * 0.55;
        const mix = c.map((x) => Math.round(x * k * (1 - w) + 255 * w));
        el.style.backgroundColor = `rgb(${mix[0]},${mix[1]},${mix[2]})`;
        el.style.boxShadow = `0 0 ${20 + v * 70}px ${v * 18}px ${rgba(c, v * 0.55)}`;
      }
      const m = meters.current[i];
      if (m) m.style.transform = `scaleX(${Math.max(0.02, v)})`;
    });
  });

  return (
    <section className="section" id="papeles">
      <Reveal as="header" className="section-head">
        <p className="eyebrow">Varias luces, un ensamble</p>
        <h2>
          Cada grupo tiene <span className="grad">un papel</span>
        </h2>
        <p className="lead">
          Como en una banda, las luces no tocan todas lo mismo. Estas cuatro reaccionan ahora mismo a la señal que suena
          arriba.
        </p>
      </Reveal>
      <div className="roles">
        {ROLES.map((r, i) => (
          <Reveal as="article" key={r.role} delay={i * 90} className="card role">
            <div className="lamp-wrap">
              <div className="lamp" ref={(el) => void (lamps.current[i] = el)} />
            </div>
            <h3 style={{ color: rgba(ROLE_COLORS[r.role], 1) }}>{r.title}</h3>
            <span className="pill">{r.listens}</span>
            <p>{r.text}</p>
            <span className="track">
              <span
                className="fill"
                style={{ background: rgba(ROLE_COLORS[r.role], 1) }}
                ref={(el) => void (meters.current[i] = el)}
              />
            </span>
          </Reveal>
        ))}
      </div>
      <Reveal className="note">
        Medido con dos grupos en el groove: el principal sube <b>+0,53</b> en el golpe y el acompañamiento <b>+0,79</b>{" "}
        en el contratiempo. Correlación entre ambos: <b>−0,26</b>.
      </Reveal>
    </section>
  );
}
