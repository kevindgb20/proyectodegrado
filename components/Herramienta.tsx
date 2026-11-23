"use client";

import { useEffect, useRef, useState } from "react";
import { PRODUCTO, group } from "@/lib/media";
import Evidencia, { A } from "./Evidencia";
import { useInView } from "@/lib/hooks";
import PromptSync from "./PromptSync";
import Reveal from "./Reveal";
import { Callout, Icon, Sub } from "./ui";
import { FeatureVideo } from "./VideoPlayer";

const MAP = [
  { h: "1. Analiza la mezcla como un solo bloque y no divide la pieza en partes", r: <><b>Análisis previo</b> que devuelve la pieza dividida en partes y secciones</> },
  { h: "2. Admite una sola entrada de audio: las capas llegan ya mezcladas", r: <><b>Sin respuesta.</b> La herramienta no separa capas en origen; recibir cada una por su propio canal queda como trabajo futuro</>, open: true },
  { h: "3. Opera por reglas predefinidas y no aprende de lo que escucha", r: <>El diseño se construye <b>antes de la función</b> a partir de la estructura de la pieza, no por reglas fijas aplicadas a la señal</> },
  { h: "4. Los efectos no seguían la música en los cambios de sección", r: <>La propuesta se <b>ancla a las secciones</b> identificadas y se previsualiza y corrige antes de ejecutarla</> },
  { h: "5. No existe vía para declarar qué se quiere comunicar", r: <><b>El prompt:</b> una entrada donde se escribe el mensaje que el artista quiere transmitir</> },
];

const MOMENTS = [
  { icon: "mic", t: "Captura", d: "La señal del Loopstation en vivo, o un archivo de audio." },
  { icon: "layers", t: "Análisis", d: "Devuelve la pieza por partes y secciones." },
  { icon: "chat", t: "Declaración", d: "El artista dice qué quiere transmitir y el investigador lo traduce a un prompt." },
  { icon: "pen", t: "Diseño", d: "El sistema relaciona ese mensaje con las secciones identificadas." },
  { icon: "eye", t: "Previsualización", d: "Permite corregir el prompt si la propuesta no corresponde." },
  { icon: "play", t: "Ejecución", d: "Una versión en vivo retoma lo diseñado y lo sigue durante la interpretación." },
];

function Moments() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3, false);
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!inView || !auto) return;
    const id = setInterval(() => setCur((c) => (c + 1) % MOMENTS.length), 3200);
    return () => clearInterval(id);
  }, [inView, auto]);
  const m = MOMENTS[cur];
  return (
    <div ref={ref} className="moments">
      <div className="moments-track" role="tablist" aria-label="Los seis momentos de la traducción">
        <span className="moments-fill" style={{ width: `${(cur / (MOMENTS.length - 1)) * 100}%` }} aria-hidden="true" />
        {MOMENTS.map((x, i) => (
          <button
            key={x.t}
            role="tab"
            aria-selected={i === cur}
            className={`moment ${i === cur ? "cur" : ""} ${i < cur ? "done" : ""} ${i >= 2 && i <= 4 ? "v" : ""}`}
            onClick={() => {
              setCur(i);
              setAuto(false);
            }}
          >
            <span className="moment-dot">
              <Icon name={x.icon} size={22} />
            </span>
            <span className="moment-t">{x.t}</span>
          </button>
        ))}
      </div>
      <div className="moment-panel" key={cur} role="tabpanel">
        <span className="display moment-n">0{cur + 1}</span>
        <div>
          <h3 className="label-d">{m.t}</h3>
          <p>{m.d}</p>
        </div>
      </div>
    </div>
  );
}

const PALETTE = [
  { c: "#1c3aa8", n: "Azul oscuro", t: "00:00 – 03:38", d: "El estado del que parte la pieza y lo que todavía limita. Un azul oscuro y no un negro, porque la penumbra del tema no es ausencia: hay algo ocurriendo debajo." },
  { c: "#f4f4f8", n: "Blanco", t: "01:20 · 03:17 · 03:34", d: "Reservado a los tres momentos en que la pieza rompe o se libera. Fuera de esos tres puntos no se usa blanco en toda la obra, y esa abstinencia es la que hace que signifique algo cuando aparece." },
  { c: "#0d7a45", n: "Verde oscuro", t: "desde 01:26, nunca antes", d: "La transformación. Entra después de la ruptura para que se lea como consecuencia y no como decoración. Convive con el azul en lugar de reemplazarlo." },
];

const LYRICS = [
  ["It's time for the renegade", "Es la hora del renegado"],
  ["Ashes decide my resurrection.", "Las cenizas deciden mi resurrección."],
  ["Break the silence.", "Rompe el silencio."],
  ["Ashes decide the final resurrection.", "Las cenizas deciden la resurrección final."],
  ["鳴く揺らぎ 叫ぶ紅蓮花", "Estremecimiento que llora, flor de loto carmesí que grita"],
  ["遠い願い、孤高に委ね 何処へ行くのか", "Un deseo lejano, confiado a la altiva soledad. ¿Hacia dónde irá?"],
  ["They hold me", "Me sostienen"],
];

export default function Herramienta() {
  return (
    <section className="section" id="herramienta">
      <div className="chapter v">
        <span className="display chapter-n">No_03</span>
        <h3 className="display-sm">La herramienta</h3>
      </div>
      <p className="lead">
        Los hallazgos no admitían ajuste dentro del sistema evaluado: la carencia no estaba en la calidad de los efectos sino en
        la ausencia de una entrada para la intención. La herramienta se construyó contra esa lista, y cada función responde a un
        hallazgo concreto; <b>cuatro de los cinco quedaron resueltos.</b>
      </p>

      <Sub tone="violet">Tabla 4 · Hallazgos del primer ciclo y respuestas de diseño</Sub>
      <div className="map-heads" aria-hidden="true">
        <span className="red">Hallazgo</span>
        <span />
        <span className="violet">Respuesta de diseño</span>
      </div>
      <div className="map">
        {MAP.map((x, i) => (
          <Reveal key={x.h} className={`map-row ${x.open ? "open" : ""}`} delay={i * 110}>
            <span className="map-h">
              <Icon name="x" className="red" size={22} />
              {x.h}
            </span>
            <span className="map-arrow" aria-hidden="true">
              <i />
            </span>
            <span className="map-r">
              <Icon name={x.open ? "x" : "check"} className={x.open ? "grey" : "violet"} size={22} />
              <span>{x.r}</span>
            </span>
          </Reveal>
        ))}
      </div>

      <Sub tone="violet">Cómo opera la traducción · seis momentos</Sub>
      <Reveal className="card top-violet">
        <Moments />
      </Reveal>
      <Callout tone="violet">
        El prompt no nombra luminarias, canales ni tiempos: nombra una intención, y el artista juzga la propuesta comparándola
        con lo que quería decir y no con un criterio de corrección técnica.
      </Callout>
      <Evidencia
        id="evidencia-herramienta"
        label="Evidencia del desarrollo · la herramienta operando los reflectores"
        tone="violet"
        anexos={["J"]}
        blocks={[
          { title: group("herramienta").title, text: group("herramienta").text, videos: group("herramienta").videos },
        ]}
      />

      <Sub tone="violet">Figura 8 · Mapa de tiempos del prompt de «Renegade»</Sub>
      <Reveal className="card top-violet">
        <PromptSync />
      </Reveal>
      <div className="two-col mt">
        <Reveal className="card prose">
          <p className="label violet">La intención escrita en el prompt</p>
          <p className="big">
            «El que rompe con lo que lo definía y asume irse por su cuenta. Las cenizas: lo que se quema no desaparece, se
            transforma. De penumbra a liberación, pasando por una ruptura. <b>La luz sostiene ese recorrido, no lo decora.</b>»
          </p>
          <ul className="dash small">
            <li>Cues contiguos. Ni un segundo sin cue. El 22 cierra en 218,2.</li>
            <li>Cortes alineados a los segmentos del análisis.</li>
            <li>Blanco solo en 07, 19 y 22 · verde no antes del 09.</li>
          </ul>
          <p className="muted small">Veintidós entradas cubren los 218,2 segundos de la pieza. Prompt completo y versiones anteriores en el <A l="K" />.</p>
        </Reveal>
        <Reveal className="card prose lyrics" delay={120}>
          <p className="label violet">La letra · fuente de las decisiones</p>
          <ul>
            {LYRICS.map(([o, e]) => (
              <li key={o}>
                <b>{o}</b>
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <p className="muted small">
            Transcripción literal, en inglés y en japonés, con su versión en español: <A l="C" />. Se reproduce con fines de
            análisis académico; su autoría corresponde a Mahiro.
          </p>
        </Reveal>
      </div>
      <Evidencia label="Evidencia · el prompt y la letra" tone="violet" anexos={["K", "C"]} />

      <div className="two-col mt-lg">
        <Reveal className="card prose">
          <p className="label">Qué hace la inteligencia artificial y qué no</p>
          <div className="ai-layers">
            <div className="ai-col">
              <small>Programación convencional · sobre señal</small>
              <span className="chip">Captura de audio</span>
              <span className="chip">Control de luminarias por DMX</span>
            </div>
            <div className="ai-col v">
              <small>Opera sobre contenido</small>
              <span className="chip">Análisis y segmentación de la pieza</span>
              <span className="chip">Interpretación del prompt</span>
              <span className="chip">Generación de la propuesta lumínica</span>
            </div>
          </div>
          <p className="muted small mt">
            El análisis trabaja sobre material ya registrado y la versión en vivo no vuelve a decidir la iluminación en tiempo
            real: retoma el diseño construido y lo sigue. Esa es la diferencia con el sistema comercial.
          </p>
        </Reveal>
        <Reveal className="card prose" delay={120}>
          <p className="label">Cuatro cosas trabajan juntas; ninguna basta sola</p>
          <ol className="four">
            <li>
              <b>El análisis de la pieza</b>, que aporta su estructura.
            </li>
            <li className="v">
              <b>La declaración de una intención expresiva</b>, que aporta el sentido y que el sistema no puede deducir del audio.
            </li>
            <li>
              <b>La intervención del investigador</b>, que convierte esa declaración en un prompt y corrige la propuesta.
            </li>
            <li>
              <b>La generación de la propuesta lumínica</b>, que pone en relación lo uno con lo otro.
            </li>
          </ol>
          <p className="muted small">
            Retirar cualquiera deja el proceso incompleto; la que el sistema comercial no tenía era la segunda. La herramienta
            cuenta con el apoyo de Nodi.global, equipo que acompañó su desarrollo.
          </p>
        </Reveal>
      </div>

      <div className="chapter v" id="experiencia">
        <span className="display chapter-n">No_04</span>
        <h3 className="display-sm">La experiencia · producto final</h3>
      </div>
      <FeatureVideo video={PRODUCTO[0]} tone="violet" label="Producto final" />
      <Callout tone="violet">
        <p className="big-c">
          El producto del proyecto es la experiencia, no la herramienta. Con el sistema propio se construyó una experiencia
          escénica sobre <em>Renegade</em>, de Mahiro —rutina presentada en la segunda ronda del Grand Beatbox Battle 2025, frente
          a JUNNO—, y es ella la que se entrega y se somete a evaluación.
        </p>
      </Callout>
      <Evidencia label="Evidencia · registro audiovisual de la experiencia" tone="violet" anexos={["L"]} />

      <Sub tone="violet">La paleta de Renegade · tres colores y una regla sobre cuándo entra cada uno</Sub>
      <div className="palette">
        {PALETTE.map((p, i) => (
          <Reveal key={p.n} className="swatch" delay={i * 120}>
            <span className="sw-color" style={{ background: p.c }} />
            <div>
              <h3 className="label-d">{p.n}</h3>
              <span className="pill violet">{p.t}</span>
              <p>{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="two-col mt-lg">
        <Reveal className="card top-violet prose">
          <p className="label violet">Dos decisiones de diseño</p>
          <p>
            <b>Construir una herramienta a la medida</b> de lo que mostraron los testeos 1, 2 y 3: no se partió de una idea previa
            de sistema sino de cinco carencias verificadas.
          </p>
          <p>
            <b>Escribir el prompt desde el diseño</b> y con una intención comunicativa: decidir qué debía entender el espectador en
            cada tramo y traducirlo a color, intensidad, ritmo de cambio y movimiento.
          </p>
          <p className="strong">Son las dos decisiones que convierten un sistema que ilumina en una experiencia que comunica.</p>
        </Reveal>
        <div className="stack">
          <Reveal className="card top-red moment-card" delay={100}>
            <span className="pill red">Construcción</span>
            <h3>El investigador, validado por Yiro</h3>
            <p>
              Lee la intención en la letra de la pieza, la traduce al prompt y ajusta hasta que la propuesta corresponde a esa
              lectura, validada por Yiro antes de ver la iluminación.
            </p>
          </Reveal>
          <Reveal className="card top-violet moment-card" delay={200}>
            <span className="pill violet">Evaluación</span>
            <h3>El experto y los espectadores</h3>
            <p>Observan el registro sin haber intervenido en la construcción y sin conocer la intención declarada.</p>
          </Reveal>
          <p className="hint">
            Mantenerlas aparte evita tomar la conformidad del artista como prueba de que la experiencia comunica: es natural que
            reconozca lo que ayudó a construir.
          </p>
        </div>
      </div>
      <p className="hint">
        La componen la intención expresiva de la pieza —extraída por el investigador de la letra y escrita en el prompt—, la
        pieza musical, el proceso de interacción con la herramienta, la propuesta de iluminación resultante, la interpretación en
        escena y el registro audiovisual, que no es documentación accesoria sino el soporte con el que la experiencia llega a
        quienes la evalúan.
      </p>
    </section>
  );
}
