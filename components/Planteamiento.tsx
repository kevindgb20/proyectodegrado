"use client";

import { useState } from "react";
import ReactDemo from "./ReactDemo";
import Reveal from "./Reveal";
import { Callout, Icon, SectionHead, Sub } from "./ui";

const LEVELS = [
  { n: "01", t: "Reaccionar", d: "Ajustar la luz a propiedades medibles de la señal: nivel, frecuencia, pulso. Es lo que un sistema automatizado resuelve sin dificultad.", tone: "grey" },
  { n: "02", t: "Interpretar", d: "Reconocer qué quiere decir el artista en cada momento de la pieza. No se deduce de las propiedades anteriores.", tone: "red" },
  { n: "03", t: "Traducir", d: "Convertir esa intención en decisiones visuales: color, intensidad, ritmo de cambio, planos, transiciones.", tone: "red" },
  { n: "04", t: "Comunicar", d: "Que el espectador lea algo próximo a lo que el artista declaró. Es lo que el proyecto mide.", tone: "pink" },
  { n: "05", t: "Construir experiencia", d: "Que esa lectura ocurra en escena, junto a la música y en tiempo real. Es el producto del proyecto.", tone: "violet" },
];

const TREE = {
  problemas: {
    top: "Consecuencias · lo que se pierde mientras el problema siga ahí",
    tops: [
      ["Se pierde la narrativa", "La luz sube donde sube el volumen, no donde cambia lo que la pieza cuenta."],
      ["Se pierde al artista", "No se reconoce en el registro: valoró la correspondencia con 1 de 5."],
      ["Se pierde al espectador", "No identifica la intención y algunas personas perciben otra atmósfera."],
      ["Se pierde la experiencia", "La escena queda reducida a efectos correctos que no significan nada."],
    ],
    core: "Existe una brecha comunicativa entre el sonido y la respuesta lumínica generada por inteligencia artificial: el canal visual opera, pero el mensaje del artista no llega al espectador.",
    bottom: "Causas · los cinco hallazgos del primer ciclo, en cuatro bloques",
    bottoms: [
      ["Hallazgo 1", "Analiza la mezcla como un bloque: no separa graves, medios ni agudos, ni divide la pieza en partes.", ""],
      ["Hallazgo 2", "Admite una sola entrada de audio: las capas llegan ya mezcladas y no se pueden separar en origen.", ""],
      ["Hallazgos 3 y 4", "Opera por reglas predefinidas, no aprende de lo que escucha y no ajusta los efectos a los cambios de sección.", ""],
      ["Hallazgo 5", "No hay vía para declarar qué se quiere comunicar: solo dispone de la señal.", ""],
    ],
  },
  objetivos: {
    top: "Fines · lo que se consigue al alcanzar el objetivo",
    tops: [
      ["Se gana la narrativa", "La luz sigue el recorrido de la pieza y marca sus secciones."],
      ["Se gana al artista", "Reconoce la propuesta como suya antes de que nadie más la vea."],
      ["Se gana al espectador", "Identifica algo próximo a la intención declarada, sin que se le diga cuál era."],
      ["Se gana la experiencia", "La escena comunica además de iluminar: la luz dice algo."],
    ],
    core: "Diseñar una experiencia escénica en la que la iluminación generada con inteligencia artificial transmita al espectador la intención declarada por un artista de Loopstation.",
    bottom: "Medios · cada uno corrige una causa del árbol de problemas",
    bottoms: [
      ["Corrige el hallazgo 1", "Analizar la pieza y devolverla dividida en partes y secciones.", ""],
      ["Hallazgo 2 · no resuelto", "Separar las capas en origen con varias entradas de audio. Queda como trabajo futuro.", "open"],
      ["Corrige los hallazgos 3 y 4", "Diseñar la luz desde esa estructura, para que los efectos sigan los cambios de sección.", ""],
      ["Corrige el hallazgo 5", "Abrir una vía para declarar la intención: el prompt.", ""],
    ],
  },
} as const;

function Tree() {
  const [mode, setMode] = useState<"problemas" | "objetivos">("problemas");
  const t = TREE[mode];
  const v = mode === "objetivos";
  return (
    <Reveal className={`tree ${v ? "is-obj" : ""}`}>
      <div className="seg" role="tablist" aria-label="Árbol">
        <button role="tab" aria-selected={!v} className={!v ? "on" : ""} onClick={() => setMode("problemas")}>
          Figura 1 · Árbol de problemas
        </button>
        <button role="tab" aria-selected={v} className={v ? "on v" : ""} onClick={() => setMode("objetivos")}>
          Figura 2 · Árbol de objetivos
        </button>
      </div>
      <div className="tree-body" key={mode}>
        <p className="tree-cap">{t.top}</p>
        <div className="tree-row">
          {t.tops.map(([h, d], i) => (
            <div key={h} className="tree-node" style={{ animationDelay: `${i * 70}ms` }}>
              <b>{h}</b>
              <span>{d}</span>
            </div>
          ))}
        </div>
        <div className="tree-trunk" aria-hidden="true" />
        <div className="tree-core">{t.core}</div>
        <div className="tree-trunk" aria-hidden="true" />
        <div className="tree-row">
          {t.bottoms.map(([h, d, s], i) => (
            <div key={h} className={`tree-node low ${s}`} style={{ animationDelay: `${200 + i * 70}ms` }}>
              <b>{h}</b>
              <span>{d}</span>
            </div>
          ))}
        </div>
        <p className="tree-cap">{t.bottom}</p>
      </div>
      <p className="hint">
        {v
          ? "El árbol de problemas invertido: cada causa se convierte en un medio. El hallazgo 2 queda como medio no resuelto."
          : "Abajo las causas, arriba lo que se pierde mientras sigan en pie. Pulsa «Árbol de objetivos» para ver cómo se invierte."}
      </p>
    </Reveal>
  );
}

const OBJ = [
  {
    icon: "x",
    tone: "red",
    n: "Objetivo específico 1",
    t: "Caracterizar la manera en que un sistema comercial de iluminación automatizada traduce el discurso sonoro de una interpretación de Loopstation en respuesta lumínica.",
    act: "Montaje con PAR LED y USB-DMX. Pruebas con pistas grabadas y señal en vivo. Entrevista a su creador.",
    ins: "Bitácora técnica y guion de entrevista.",
    res: "Los cinco hallazgos: el sistema responde a la energía del sonido y no a la estructura de la pieza.",
  },
  {
    icon: "eye",
    tone: "red",
    n: "Objetivo específico 2",
    t: "Contrastar la intención declarada por el artista con las lecturas del experto y del usuario sobre un mismo registro, para localizar dónde se pierde el mensaje.",
    act: "Testeos 1, 2 y 3 sobre una misma interpretación, con las tres miradas.",
    ins: "Declaración y lectura, valoración y formulario en línea.",
    res: "Convergen: artista 1 de 5 en correspondencia; experto 2 de 5 en color, 2 de 5 en intensidad y 1 de 5 en ritmo de cambio; 11 de 13 usuarios describen la luz como ausente o contradictoria.",
  },
  {
    icon: "check",
    tone: "violet",
    n: "Objetivo específico 3",
    t: "Desarrollar una herramienta que permita declarar la intención expresiva como entrada del sistema, y ponerla a prueba en una experiencia escénica en vivo.",
    act: "Construcción de la herramienta y montaje de la experiencia sobre «Renegade». Testeos 4, 5 y 6.",
    ins: "Los mismos tres instrumentos, en el segundo ciclo.",
    res: "Artista 5 de 5 en las tres afirmaciones; el experto da por coherentes los cuatro recursos evaluados; las diez personas afirman que retirar la luz restaría valor a la experiencia.",
  },
];

function Objective({ o, i }: { o: (typeof OBJ)[number]; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal as="li" className={`objective-x t-${o.tone} ${open ? "open" : ""}`} delay={i * 120}>
      <button className="obj-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <Icon name={o.icon} className={o.tone} />
        <span>
          <small className={`label ${o.tone}`}>{o.n}</small>
          <span className="obj-t">{o.t}</span>
        </span>
        <span className="obj-tog" aria-hidden="true">
          +
        </span>
      </button>
      <div className="obj-body">
        <div>
          <dl>
            <dt>Actividad</dt>
            <dd>{o.act}</dd>
            <dt>Instrumento</dt>
            <dd>{o.ins}</dd>
            <dt>Resultado</dt>
            <dd className="strong">{o.res}</dd>
          </dl>
        </div>
      </div>
    </Reveal>
  );
}

export default function Planteamiento() {
  return (
    <>
      <section className="section" id="problema">
        <SectionHead
          n="04"
          kicker="Planteamiento del problema"
          title="Dónde se pierde el mensaje"
          lead="Un artista de Loopstation construye su pieza en vivo y por capas: cada entrada, cada bucle y cada cierre son decisiones audibles que el público sigue mientras ocurren, y la iluminación, cuando acompaña ese proceso, debería hacer visible esa misma construcción."
        />
        <Reveal className="card top-red react-card">
          <p className="label">Lo que hacen los sistemas automatizados</p>
          <ReactDemo />
        </Reveal>

        <Sub>Tabla 1 · Cinco niveles en la relación entre el sonido y la luz</Sub>
        <div className="levels-brackets" aria-hidden="true">
          <span className="b-grey">Lo que el sistema ya hace</span>
          <span className="b-red">Lo que no tenía cómo hacer</span>
        </div>
        <ol className="levels">
          {LEVELS.map((l, i) => (
            <Reveal as="li" key={l.n} className={`level t-${l.tone}`} delay={i * 140} style={{ ["--step" as string]: i }}>
              <span className="level-n display">{l.n}</span>
              <h3 className="label-d">{l.t}</h3>
              <p>{l.d}</p>
            </Reveal>
          ))}
        </ol>
        <p className="hint center">El problema de diseño se ubica en el paso de reaccionar a interpretar.</p>

        <Sub>Árbol de problemas y árbol de objetivos</Sub>
        <Tree />

        <Callout label="Problema de diseño y pregunta" className="question">
          <p>Existe una brecha comunicativa entre el sonido y la respuesta lumínica generada por inteligencia artificial.</p>
          <p id="pregunta" className="q">
            ¿Hasta qué punto la iluminación generada por inteligencia artificial logra comunicar al espectador el mensaje del
            artista?
          </p>
        </Callout>
      </section>

      <section className="section" id="objetivos">
        <SectionHead n="05" kicker="Objetivos" title="El propósito y sus tres metas" />
        <Callout label="Objetivo general" tone="soft">
          Diseñar una experiencia escénica en la que la iluminación generada con inteligencia artificial transmita al espectador
          la intención declarada por un artista de Loopstation, a partir del contraste entre esa intención y las lecturas del
          artista, un experto y el usuario.
        </Callout>
        <Sub>Figura 3 · Cuadro de objetivos · toca cada uno para ver cómo se verificó</Sub>
        <ul className="objectives-x">
          {OBJ.map((o, i) => (
            <Objective key={o.n} o={o} i={i} />
          ))}
        </ul>
        <p className="hint">
          Cada objetivo se formuló junto con su actividad, su instrumento y el resultado que permite darlo por cumplido, de
          manera que pueda verificarse contra un dato y no contra una impresión. En rojo el primer ciclo; en violeta el segundo.
        </p>
      </section>
    </>
  );
}
