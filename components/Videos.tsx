"use client";

import { useState } from "react";
import { PROCESO, PROCESO_PRINCIPAL, PRODUCTO } from "@/lib/media";
import { SectionHead } from "./ui";
import { FeatureVideo, VideoGrid } from "./VideoPlayer";

const IN_CONTEXT = [
  { href: "#evidencia-pruebas", t: "Pruebas del sistema comercial", d: "Pruebas controladas de MyStrow y pruebas en vivo con Yiro", n: ["pruebas-mystrow", "pruebas-yiro"], tone: "red" },
  { href: "#evidencia-testeos", t: "Los seis testeos", d: "Registro del testeo 1, sesión con el experto y revisión del testeo 5", n: ["testeo-1", "testeo-2", "testeo-5"], tone: "red" },
  { href: "#evidencia-herramienta", t: "Desarrollo de la herramienta", d: "Las pruebas de la herramienta con los reflectores", n: ["herramienta"], tone: "violet" },
];

export default function Videos() {
  const [tab, setTab] = useState<"producto" | "proceso">("producto");
  const count = (ids: string[]) => PROCESO.filter((g) => ids.includes(g.id)).reduce((s, g) => s + g.videos.length, 0);
  return (
    <section className="section" id="videos">
      <SectionHead
        kicker="Material audiovisual"
        title="Videos"
        lead="El registro audiovisual no es documentación accesoria: es la forma en que la experiencia llega al público, que consume el formato principalmente en video. Los registros de cada prueba y de cada testeo están junto a la parte del proyecto que documentan."
      />
      <div className="seg big" role="tablist" aria-label="Tipo de video">
        <button role="tab" aria-selected={tab === "producto"} className={tab === "producto" ? "on v" : ""} onClick={() => setTab("producto")}>
          Producto
        </button>
        <button role="tab" aria-selected={tab === "proceso"} className={tab === "proceso" ? "on" : ""} onClick={() => setTab("proceso")}>
          Proceso
        </button>
      </div>

      {tab === "producto" ? (
        <div className="vtab" key="p">
          <FeatureVideo video={PRODUCTO[0]} tone="violet" label="Producto final" />
          <p className="sublabel violet">La interpretación, el resultado narrado y la pieza original</p>
          <VideoGrid list={[PRODUCTO[2], PRODUCTO[3], PRODUCTO[1]]} tone="violet" className="two" />
        </div>
      ) : (
        <div className="vtab" key="r">
          <FeatureVideo video={PROCESO_PRINCIPAL} tone="red" label="Video del proceso" />
        </div>
      )}

      <p className="sublabel">Los demás registros, en su contexto</p>
      <div className="in-context">
        {IN_CONTEXT.map((c) => (
          <a key={c.href} href={c.href} className={`ctx t-${c.tone}`}>
            <b className="display">{count(c.n)}</b>
            <span>
              <strong>{c.t}</strong>
              <small>{c.d}</small>
            </span>
            <i aria-hidden="true">↑</i>
          </a>
        ))}
      </div>
    </section>
  );
}
