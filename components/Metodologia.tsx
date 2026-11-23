"use client";

import { useState } from "react";
import { A } from "./Evidencia";
import Reveal from "./Reveal";
import { Callout, Icon, SectionHead, Sub } from "./ui";

const REFS = [
  {
    area: "Traducción entre sistemas de signos",
    who: "Jakobson (1959)",
    idea: "Distingue la traducción intralingüística, la interlingüística y la intersemiótica: interpretar los signos de un sistema mediante los de otro, incluso no verbal. Pasar de una estructura sonora a una lumínica es este tercer tipo. Toda traducción supone un intérprete que decide qué equivale a qué; un sistema que asigna un color a una banda de frecuencia no traduce, establece una equivalencia fija.",
    decision: "Primera decisión: si la interpretación no está en la señal, el sistema necesita recibirla por alguna vía, y esa vía es el prompt.",
  },
  {
    area: "Comunicación",
    who: "Schramm (1954)",
    idea: "Emisor y receptor codifican y decodifican desde sus campos de experiencia: solo hay entendimiento donde esos campos se solapan. El sistema operaba sobre magnitudes físicas de la señal y el artista sobre una intención expresiva.",
    decision: "Sin código común no hay zona de solapamiento: hay emisión, pero no comunicación.",
  },
  {
    area: "Comunicación",
    who: "Krippendorff (1993)",
    idea: "Cuestiona la metáfora del conducto —la idea de que el significado viaja dentro de la señal— y sostiene que el significado lo construye quien recibe. La comunicación no puede verificarse examinando el dispositivo que emite.",
    decision: "Segunda decisión: la evaluación no examina la iluminación sino las lecturas que produce.",
  },
  {
    area: "Experiencia",
    who: "Dewey (1934) · McKinney y Butterworth (2009)",
    idea: "La experiencia estética reside en la interacción entre la persona y su entorno, y el arte expresa significados antes que enunciarlos. En la escena, la escenografía construye sentido y no es ambientación: la iluminación significa por sí misma.",
    decision: "Tercera decisión: evaluar con tres miradas y no con un juicio técnico único.",
  },
];

const PHASES = [
  { icon: "doc", n: "01", t: "Investigación", d: "Problema, pregunta, objetivos, usuario y selección del sistema.", tone: "red" },
  { icon: "device", n: "02", t: "Preparación", d: "Montaje con PAR LED y USB-DMX. Pruebas controladas. Entrevista al creador.", tone: "red" },
  { icon: "loop", n: "03", t: "Experimentación", d: "Testeos 1, 2 y 3, hallazgos y requerimientos, y construcción de la herramienta. La fase más extensa.", tone: "red" },
  { icon: "play", n: "04", t: "Puesta en escena", d: "Prompt de «Renegade», montaje y registro, testeos 4, 5 y 6, análisis y conclusiones.", tone: "violet" },
];

const GROUPS = [
  { icon: "mic", t: "El artista", who: "Yiro · intérprete de Loopstation y beatbox", d: "Declara qué quiere transmitir antes de tocar y después lee su propio registro. Es el único que conoce la intención original." },
  { icon: "shield", t: "El experto", who: "Roberto Castrillón · profesional de iluminación, más de 10 años", d: "Juzga la relación entre la pieza y la luz con criterio profesional. Distingue si el problema es de calidad técnica o de sentido." },
  { icon: "eye", t: "El usuario", who: "Comunidad en línea de seguidores del formato", d: "Consume el formato y lee el registro sin contexto técnico ni saber qué quiso decir el artista. Es la prueba de fondo." },
];

const CRITERIA = [
  { c: "Intención", q: "¿El espectador nombra algo próximo a lo que el artista declaró?", w: "Pregunta abierta inicial, antes de cualquier explicación", key: true },
  { c: "Coherencia", q: "¿La luz corresponde con los momentos de la pieza?", w: "Valoración del experto y pregunta de correspondencia del usuario" },
  { c: "Narrativa", q: "¿La luz marca los cambios y las secciones de la interpretación?", w: "Valoración del experto sobre recursos y ritmo de cambio" },
  { c: "Experiencia", q: "¿La luz aporta a lo que el espectador percibe y siente?", w: "Pregunta abierta de cierre" },
];

const IN = [
  ["Intención", "Lo que el artista declara antes de interpretar.", true],
  ["Pieza musical", "Rutina de Loopstation construida en vivo, capa sobre capa."],
  ["Montaje técnico", "Reflectores PAR LED e interfaz USB-DMX."],
  ["Hallazgos", "Los cinco del primer ciclo, que fijan los requerimientos."],
  ["Instrumentos", "Uno por mirada: declaración y lectura, valoración y formulario."],
  ["Fuentes de apoyo", "Entrevista al creador y bitácora de pruebas."],
] as const;
const PROC = [
  ["Capturar", "Señal del Loopstation en vivo o archivo de audio."],
  ["Analizar", "La herramienta divide la pieza en partes y secciones."],
  ["Declarar", "El artista dice qué quiere transmitir y el investigador lo traduce a un prompt."],
  ["Generar", "El sistema cruza el prompt con las secciones y produce una propuesta."],
  ["Previsualizar", "Se ajusta el prompt hasta que corresponde."],
  ["Ejecutar", "En escena corre el diseño ya construido."],
];
const OUT = [
  ["Producto", "La experiencia escénica sobre «Renegade»."],
  ["Medio", "La herramienta de traducción que la hace posible."],
  ["Registro", "El video con el que la experiencia llega al público."],
  ["Evidencia", "Los seis testeos y el procedimiento de evaluación."],
];

function InOut() {
  const [step, setStep] = useState(2);
  return (
    <Reveal className="inout">
      <div className="io-col">
        <p className="io-h">In · entradas</p>
        {IN.map(([t, d, key]) => (
          <div key={t} className={`io-item ${key ? "key" : ""}`}>
            <b>{t}</b>
            <span>{d}</span>
          </div>
        ))}
      </div>
      <div className="io-col io-proc">
        <p className="io-h">Proceso · en este orden</p>
        {PROC.map(([t, d], i) => (
          <button key={t} className={`io-step ${i === step ? "cur" : ""}`} onMouseEnter={() => setStep(i)} onFocus={() => setStep(i)} onClick={() => setStep(i)}>
            <span className="display">{i + 1}</span>
            <span>
              <b>{t}</b>
              <small>{d}</small>
            </span>
          </button>
        ))}
      </div>
      <div className="io-col">
        <p className="io-h">Out · salidas</p>
        {OUT.map(([t, d], i) => (
          <div key={t} className={`io-item out ${i === 0 ? "key" : ""}`}>
            <b>{t}</b>
            <span>{d}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export default function Metodologia() {
  return (
    <section className="section" id="metodologia">
      <SectionHead
        n="06"
        kicker="Metodología aplicada"
        title="Cómo se investiga"
        lead="El proyecto se desarrolla bajo investigación a través del diseño. Por eso el desarrollo de una herramienta propia no es un desvío técnico del proyecto sino su método."
      />
      <Reveal className="card top-red paradigm">
        <Icon name="pen" className="red" size={34} />
        <div>
          <p className="label">Paradigma</p>
          <p>
            <b>Frayling (1993)</b> distingue tres maneras de investigar en este campo: sobre el diseño, para el diseño y a través
            del diseño. <b>Keyson (2009)</b> plantea el prototipo como instrumento de investigación, y <b>Findeli (2008)</b>{" "}
            sostiene que la tercera vía integra a las otras dos, porque al construir también se investiga sobre y para el diseño.
          </p>
        </div>
      </Reveal>

      <Sub>Referentes conceptuales · de cada uno sale una decisión</Sub>
      <ol className="chain">
        {REFS.map((c, i) => (
          <Reveal as="li" key={c.who} className="chain-item" delay={i * 120}>
            <span className="chain-dot" aria-hidden="true" />
            <div>
              <small className="label">{c.area}</small>
              <h3>{c.who}</h3>
            </div>
            <p>{c.idea}</p>
            <p className="decision">
              <span>→</span> {c.decision}
            </p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="schramm card">
        <div className="schramm-text">
          <p className="label">Figura 7 · Schramm aplicado al primer ciclo</p>
          <p>
            La retroalimentación es inferida y no directa —igual que en una sala, donde el artista no sabe qué entendió cada
            espectador— y el significado se reconstruye en la recepción, que es justo lo que miden los testeos.
          </p>
          <p className="strong">El sistema operaba sobre la señal; el artista, sobre una intención. Entre los dos no había zona común.</p>
        </div>
        <svg className="fields" viewBox="0 0 420 220" role="img" aria-label="Dos campos de experiencia que no se solapan">
          <g className="field f-artist">
            <circle cx="112" cy="110" r="84" />
            <text x="112" y="104">ARTISTA</text>
            <text x="112" y="124" className="small">intención expresiva</text>
          </g>
          <g className="field f-system">
            <circle cx="308" cy="110" r="84" />
            <text x="308" y="104">SISTEMA</text>
            <text x="308" y="124" className="small">nivel · frecuencia · pulso</text>
          </g>
          <line className="gap" x1="210" y1="50" x2="210" y2="170" />
          <text className="gap-t" x="210" y="200">sin zona de solapamiento</text>
        </svg>
      </Reveal>

      <Sub>Figura 4 · Cuatro fases y dos ciclos</Sub>
      <ol className="phases">
        {PHASES.map((p, i) => (
          <Reveal as="li" key={p.n} className={`card top-${p.tone} phase`} delay={i * 110}>
            <div className="phase-head">
              <Icon name={p.icon} className={p.tone} size={32} />
              <span className={`label-d ${p.tone}`}>
                Fase {p.n} · {p.t}
              </span>
            </div>
            <p>{p.d}</p>
          </Reveal>
        ))}
      </ol>
      <div className="cycles">
        <Reveal className="cycle t-red">
          <p className="label">Ciclo 1 · sistema comercial</p>
          <b className="display">Testeos 1 · 2 · 3</b>
          <span>Artista · Experto · Usuario</span>
        </Reveal>
        <Reveal className="cycle t-violet" delay={120}>
          <p className="label violet">Ciclo 2 · herramienta propia</p>
          <b className="display">Testeos 4 · 5 · 6</b>
          <span>Artista · Experto · Usuario</span>
        </Reveal>
      </div>
      <p className="hint">
        Interesa menos la duración de cada fase que el solapamiento: la experimentación comienza antes de que termine la
        preparación, y el desarrollo de la herramienta arranca cuando los hallazgos del primer ciclo ya están establecidos.
      </p>

      <Sub>Tres miradas independientes</Sub>
      <div className="grid-3">
        {GROUPS.map((g, i) => (
          <Reveal key={g.t} className="card top-red feature" delay={i * 100}>
            <Icon name={g.icon} className="red" size={32} />
            <h3 className="label-d">{g.t}</h3>
            <span className="muted small">{g.who}</span>
            <p>{g.d}</p>
          </Reveal>
        ))}
      </div>

      <div className="two-col mt-lg">
        <Reveal className="card prose">
          <p className="label">Unidad de análisis y de observación</p>
          <p>
            El registro audiovisual de una interpretación de Loopstation con iluminación generada por el sistema, observado en la
            correspondencia entre los momentos de la pieza —entradas, cambios de sección, clímax y cierre— y la luz en esos
            mismos instantes.
          </p>
        </Reveal>
        <Reveal className="card prose" delay={120}>
          <p className="label">Instrumentos</p>
          <ul className="dash">
            <li>
              Formato de declaración de intención y lectura para el artista · <A l="D">D</A> · <A l="G">G</A>
            </li>
            <li>
              Formato de valoración para el experto · <A l="E">E</A> · <A l="H">H</A>
            </li>
            <li>
              Formulario en línea en una comunidad de seguidores del Loopstation · <A l="F">F</A> · <A l="I">I</A>
            </li>
            <li>
              Entrevista estructurada al creador del sistema · <A l="B">B</A>
            </li>
            <li>
              Bitácora técnica de las pruebas controladas · <A l="A">A</A>
            </li>
          </ul>
          <p className="muted small">Cada letra abre el anexo diligenciado, sin modificar.</p>
        </Reveal>
      </div>

      <Sub>Tabla 2 · Criterios de valoración</Sub>
      <div className="table" role="table">
        <div className="tr th" role="row">
          <span role="columnheader">Criterio</span>
          <span role="columnheader">Qué pregunta</span>
          <span role="columnheader">Dónde se recoge</span>
        </div>
        {CRITERIA.map((c, i) => (
          <Reveal key={c.c} className={`tr ${c.key ? "key" : ""}`} delay={i * 80}>
            <span role="cell" className="c-name">
              {c.c}
            </span>
            <span role="cell">{c.q}</span>
            <span role="cell" className="muted">
              {c.w}
            </span>
          </Reveal>
        ))}
      </div>
      <p className="hint">El primero es el decisivo; los otros tres explican dónde se gana o se pierde lo que aquel mide.</p>

      <Sub>Figura 6 · Herramienta In-Out · pasa por cada paso del proceso</Sub>
      <InOut />
      <p className="hint">
        Lo que el proyecto aporta se lee en la columna de salidas, y la entrada que modifica el proceso es la de intención,
        inexistente en el sistema evaluado.
      </p>

      <Callout label="Alcances y limitaciones" tone="soft">
        <p>
          El proyecto trabaja sobre un formato y sobre piezas concretas interpretadas por artistas específicos, con un número
          reducido de participantes. Sus hallazgos describen ese caso y se leen de forma cualitativa: lo que sostiene las
          conclusiones es la convergencia entre miradas independientes, no la magnitud de una muestra. El sistema comercial se
          analiza tal como se distribuye, sin acceso a su código.
        </p>
      </Callout>
      <div className="grid-2 limits">
        {[
          ["Los dos ciclos no evaluaron la misma pieza", "El primero trabaja sobre una interpretación propia de Yiro y el segundo sobre Renegade, de Mahiro. El contraste que sí se sostiene es el juicio del experto, porque evaluó los mismos cuatro recursos en ambos ciclos. Un contraste estricto —la misma pieza con la misma intención en los dos sistemas— queda como trabajo futuro."],
          ["Los instrumentos del usuario no son idénticos", "El formulario del primer ciclo tuvo cuatro preguntas y el del segundo, seis. El único ítem directamente comparable es el de los momentos fuera de lugar. Los conteos de cada ciclo valen dentro de su ciclo."],
          ["La intención del autor no quedó declarada", "Mahiro no fue consultado: la intención que entró al sistema fue la lectura del investigador, expresada en el prompt y validada por Yiro antes de ver la iluminación. Es independiente, pero no es la del autor del tema."],
          ["Condiciones de aplicación", "Yiro ya conocía la música de Mahiro. La valoración del experto en el segundo ciclo se recogió como retroalimentación abierta y no con el procedimiento de dos momentos previsto. La clasificación de las respuestas abiertas la hizo el investigador sobre el texto literal, que se conserva sin modificar."],
        ].map(([t, d], i) => (
          <Reveal key={t} className="card feature limit" delay={i * 80}>
            <h3 className="label-d">{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
