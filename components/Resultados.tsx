"use client";

import { useState } from "react";
import { FORMS_T3, FORMS_T6, PRODUCTO, group } from "@/lib/media";
import { HBars, Scale } from "./Charts";
import Evidencia, { A, type EvidenceBlock } from "./Evidencia";
import Reveal from "./Reveal";
import { Callout, Icon, SectionHead, Sub } from "./ui";

const FINDINGS = [
  <><b>Analiza la mezcla como un solo bloque.</b> No separa la música en sus componentes —graves, medios, agudos, efectos— ni divide la pieza en partes: no distingue las capas que el Loopstation apila ni dónde empieza y termina cada sección.</>,
  <><b>Admite una sola entrada de audio:</b> un único cable de señal para toda la interpretación. Las capas llegan ya mezcladas y no se pueden separar en origen.</>,
  <><b>Opera por reglas predefinidas y no aprende</b> de lo que escucha. La denominación comercial de inteligencia artificial no corresponde a un sistema que modifique su comportamiento con la experiencia; lo confirmó su propio creador.</>,
  <>Los efectos <b>no seguían la música</b> en los cambios de sección.</>,
  <><b>No existe vía para declarar</b> qué se quiere comunicar.</>,
];

const TESTS = [
  { n: "T1", icon: "mic", who: "Artista · Yiro", sys: "MyStrow", cycle: 1, anexo: "D", res: "Declaró buscar misterio, movimiento y energía. Valoró con 1 de 5 la correspondencia. «No sentí que la luz siguiera la música en ningún momento»." },
  { n: "T2", icon: "shield", who: "Experto · R. Castrillón", sys: "MyStrow", cycle: 1, anexo: "E", res: "Color 2 de 5, intensidad 2 de 5, ritmo de cambio 1 de 5. El estroboscopio disparaba fuera de los golpes y en los breaks no había fundidos ni respiración." },
  { n: "T3", icon: "eye", who: "Usuario · formulario", sys: "MyStrow", cycle: 1, anexo: "F", res: "13 respuestas. Diez señalaron al menos un momento en que la luz no iba con la música; once describieron la luz como ausente o contradictoria." },
  { n: "T4", icon: "mic", who: "Artista · Yiro", sys: "Herramienta propia", cycle: 2, anexo: "G", res: "5 de 5 en las tres afirmaciones. «No identifiqué ningún momento en el que la iluminación se sintiera desconectada de la música»." },
  { n: "T5", icon: "shield", who: "Experto · R. Castrillón", sys: "Herramienta propia", cycle: 2, anexo: "H", res: "Dio por coherentes los cuatro recursos que antes había señalado como fallidos. Como mejora, un tiempo de respuesta más corto." },
  { n: "T6", icon: "eye", who: "Usuario · formulario", sys: "Herramienta propia", cycle: 2, anexo: "I", res: "10 respuestas. Correspondencia promedio 4,1 de 5; lectura de cambios 4,2 de 5; las diez afirmaron que quitar la iluminación le restaría a la experiencia." },
];

const RESOURCES = [
  { r: "Estroboscopio", before: "Disparaba fuera de los golpes, los acentos y los picos de intensidad.", after: "Coherente." },
  { r: "Fundido", before: "Sin fundidos en los breaks y las pausas.", after: "Coherente." },
  { r: "Respiración", before: "Sin efectos de respiración que prepararan lo que venía.", after: "Coherente." },
  { r: "Intensidad en los golpes", before: "Sin contraste entre momentos tranquilos y de mayor energía.", after: "Coherente." },
];

const EVIDENCE: Record<string, { lead: string; blocks: EvidenceBlock[] }> = {
  T1: {
    lead: "Interpretación de Yiro con MyStrow.",
    blocks: [{ title: "Registro de la interpretación", videos: group("testeo-1").videos }],
  },
  T2: {
    lead: "Roberto Castrillón revisa el sistema comercial con equipos reales antes de diligenciar el formato de valoración.",
    blocks: [{ title: "Sesión con el experto · 9 de octubre de 2026", videos: group("testeo-2").videos }],
  },
  T3: {
    lead: "Formulario anónimo de cuatro preguntas en una comunidad de seguidores del formato, sin decirles qué quería transmitir el artista.",
    blocks: [{ title: "Respuestas originales del formulario · 13 personas", images: FORMS_T3 }],
  },
  T4: {
    lead: "Yiro respondió la parte A solo con el audio y la parte B después de ver la experiencia con su iluminación.",
    blocks: [{ title: "Registro de la experiencia · Anexo L", videos: [PRODUCTO[2]] }],
  },
  T5: {
    lead: "El mismo experto del primer ciclo vuelve sobre los mismos cuatro recursos, ahora con la herramienta propia.",
    blocks: [{ title: "Revisión de la experiencia · 10 de noviembre de 2026", videos: group("testeo-5").videos }],
  },
  T6: {
    lead: "Formulario anónimo de seis preguntas en la misma comunidad, también sin decirles qué debían sentir.",
    blocks: [
      { title: "Respuestas originales del formulario · 10 personas", images: FORMS_T6 },
      { title: "Registro de la experiencia · Anexo L", videos: [PRODUCTO[2]] },
    ],
  },
};

function Testeos() {
  const [open, setOpen] = useState<string | null>(null);
  const [sel, setSel] = useState("T1");
  const t = TESTS.find((x) => x.n === sel)!;
  const ev = EVIDENCE[sel];
  const selTone = t.cycle === 1 ? "red" : "violet";
  return (
    <>
      <div className="cycle-labels" aria-hidden="true">
        <span className="red">Ciclo 1 · sistema comercial</span>
        <span className="violet">Ciclo 2 · herramienta propia</span>
      </div>
      <div className="tests">
        {TESTS.map((t, i) => {
          const tone = t.cycle === 1 ? "red" : "violet";
          const flipped = open === t.n;
          return (
            <Reveal key={t.n} delay={i * 90} className="test-wrap">
              <button className={`test t-${tone} ${flipped ? "flipped" : ""}`} onClick={() => {
                  setOpen(flipped ? null : t.n);
                  setSel(t.n);
                }} aria-expanded={flipped}>
                <span className="face front">
                  <span className="test-top">
                    <Icon name={t.icon} className={tone} size={30} />
                    <span className={`test-n display ${tone}`}>{t.n}</span>
                  </span>
                  <b>{t.who}</b>
                  <span className="muted">{t.sys}</span>
                  <span className={`status ${tone}`}>
                    <i /> Hecho · Anexo {t.anexo}
                  </span>
                  <span className="flip-hint">Ver resultado ↻</span>
                </span>
                <span className="face back">
                  <span className={`test-n display ${tone}`}>{t.n}</span>
                  <span className="res">{t.res}</span>
                  <span className="flip-hint">Evidencia abajo ↓</span>
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>
      <p className="hint">Tabla 3. Las muestras de usuario son de distinto tamaño y los formularios no son idénticos entre ciclos.</p>

      <div className="test-ev" id="evidencia-testeos">
        <div className="seg test-tabs" role="tablist" aria-label="Evidencia de cada testeo">
          {TESTS.map((x) => (
            <button
              key={x.n}
              role="tab"
              aria-selected={sel === x.n}
              className={sel === x.n ? `on ${x.cycle === 2 ? "v" : ""}` : ""}
              onClick={() => setSel(x.n)}
            >
              {x.n} · {x.who.split(" · ")[0]}
            </button>
          ))}
        </div>
        <div key={sel} className="test-ev-body">
          <Evidencia
            label={`Evidencia del testeo ${sel.slice(1)} · ${t.who} · ${t.sys}`}
            tone={selTone}
            anexos={[t.anexo]}
            blocks={[{ text: ev.lead }, ...ev.blocks]}
          />
        </div>
      </div>
    </>
  );
}

function Recursos() {
  const [after, setAfter] = useState(false);
  return (
    <Reveal className={`card resources ${after ? "top-violet" : "top-red"}`}>
      <div className="res-head">
        <p className={`label ${after ? "violet" : ""}`}>Mirada del experto · los mismos cuatro recursos</p>
        <div className="seg small" role="tablist">
          <button role="tab" aria-selected={!after} className={!after ? "on" : ""} onClick={() => setAfter(false)}>
            Testeo 2 · MyStrow
          </button>
          <button role="tab" aria-selected={after} className={after ? "on v" : ""} onClick={() => setAfter(true)}>
            Testeo 5 · herramienta
          </button>
        </div>
      </div>
      <ul className="res-list">
        {RESOURCES.map((r) => (
          <li key={r.r} className={after ? "ok" : "ko"}>
            <Icon name={after ? "check" : "x"} className={after ? "violet" : "red"} size={22} />
            <b>{r.r}</b>
            <span key={String(after)}>{after ? r.after : r.before}</span>
          </li>
        ))}
      </ul>
      <p className="muted small">
        {after
          ? "«La luz ahora sí sigue de manera coherente el tema musical»; el sistema «fragmenta la canción en partes y la define por momentos». Como mejora: un tiempo de respuesta más corto en vivo."
          : "«MyStrow presenta una debilidad importante en el análisis y la interpretación de la música.» Pidió un espacio donde el artista pudiera expresar qué quiere comunicar."}
      </p>
    </Reveal>
  );
}

export default function Resultados() {
  return (
    <section className="section" id="resultados">
      <SectionHead
        n="07"
        kicker="Resultados principales"
        title="Lo que mostraron los seis testeos"
        lead="Lo que mostraron los seis testeos, la herramienta que nació de ellos y la experiencia que se construyó con ella."
      />

      <div className="chapter" id="primer-ciclo">
        <span className="display chapter-n">No_01</span>
        <h3 className="display-sm">El primer ciclo</h3>
      </div>
      <div className="systems">
        {[
          ["Maestro DMX", "Software DMX asistido por IA"],
          ["SoundSwitch", "Software DMX asistido por IA"],
          ["MyStrow", "Seleccionado por accesibilidad"],
        ].map(([s, d], i) => (
          <Reveal key={s} className={`card system ${i === 2 ? "chosen" : ""}`} delay={i * 100}>
            <h3 className="display-sm">{s}</h3>
            <p className={i === 2 ? "strong" : "muted"}>{d}</p>
            {i === 2 && <span className="pill red solid">Evaluado</span>}
          </Reveal>
        ))}
      </div>
      <div className="baseline">
        <Reveal className="card top-red rig">
          <p className="label">El montaje y lo que hace el sistema</p>
          <div className="rig-flow">
            <div className="rig-node">
              <Icon name="device" size={44} className="grey" />
              <span className="label-d">Loopstation</span>
              <small>la pieza se arma en vivo, capa por capa</small>
            </div>
            <div className="rig-arrow">
              <i />
              <small>una sola entrada de audio</small>
            </div>
            <div className="rig-node">
              <Icon name="chip" size={44} className="red" />
              <span className="label-d">MyStrow</span>
              <small>analiza la mezcla como un solo bloque</small>
            </div>
            <div className="rig-arrow">
              <i />
              <small>interfaz USB-DMX</small>
            </div>
            <div className="rig-node">
              <Icon name="lamp" size={44} className="red glow" />
              <span className="label-d">PAR LED</span>
              <small>luz que responde a la energía del sonido</small>
            </div>
          </div>
          <p className="hint">
            Se probó con pistas grabadas y con señal en vivo, y se complementó con una entrevista estructurada a su creador.
            Bitácora en el <A l="A" />; entrevista en el <A l="B" />. <a href="#evidencia-pruebas">Ver las pruebas en video ↓</a>
          </p>
        </Reveal>
        <ul className="findings">
          {FINDINGS.map((f, i) => (
            <Reveal as="li" key={i} className="finding" delay={i * 110}>
              <span className="finding-n display">{i + 1}</span>
              <p>{f}</p>
            </Reveal>
          ))}
        </ul>
      </div>
      <Reveal as="blockquote" className="interview">
        <p>«Seamos honestos: en MyStrow no hay aprendizaje automático. “IA” es un nombre comercial para un sistema experto basado en reglas.»</p>
        <footer>
          Nicolas Prieto, creador de MyStrow · entrevista estructurada, traducción del francés ·{" "}
          <A l="B" />
        </footer>
      </Reveal>
      <Evidencia
        id="evidencia-pruebas"
        label="Evidencia del primer ciclo · pruebas controladas y entrevista"
        anexos={["A", "B"]}
        blocks={[
          { title: group("pruebas-mystrow").title, text: group("pruebas-mystrow").text, videos: group("pruebas-mystrow").videos },
          { title: group("pruebas-yiro").title, text: group("pruebas-yiro").text, videos: group("pruebas-yiro").videos },
        ]}
      />
      <Callout label="Lo que significan">
        La luz responde a la energía sonora y no a la narrativa ni a la intención: el sistema no falla por calidad lumínica,
        falla porque no hay por dónde decirle qué decir.
      </Callout>

      <Sub>Los seis testeos · toca cada tarjeta para ver su resultado y su evidencia</Sub>
      <Testeos />

      <Sub>Resultados del primer ciclo</Sub>
      <div className="tiles">
        {[
          ["1", "Correspondencia", "Artista"],
          ["2", "Color", "Experto"],
          ["2", "Intensidad", "Experto"],
          ["1", "Ritmo de cambio", "Experto"],
        ].map(([v, l, w], i) => (
          <Reveal key={l} className="tile t-red" delay={i * 90}>
            <b className="display">
              {v}
              <small> de 5</small>
            </b>
            <span>{l}</span>
            <small className="muted">{w}</small>
          </Reveal>
        ))}
      </div>
      <div className="two-col mt">
        <Reveal className="card">
          <HBars
            title="Lo que Yiro declaró, frente a lo que nombró el público"
            total={13}
            tone="red"
            bars={[
              { label: "Energía o intensidad", value: 5, note: "declarado" },
              { label: "Movimiento («groove»)", value: 1, note: "declarado" },
              { label: "Misterio", value: 0, note: "declarado" },
              { label: "Ciberpunk · futurista · tecnológica", value: 4, note: "no declarado" },
            ]}
            caption="Ninguna de las trece personas nombró el misterio. Cuatro describieron una atmósfera que proviene del repertorio de color y estroboscopio del sistema, no de la intención del artista."
          />
        </Reveal>
        <Reveal className="card" delay={120}>
          <HBars
            title="¿Hubo algún momento en que la luz no te pareciera que iba con lo que escuchabas?"
            total={13}
            tone="red"
            bars={[
              { label: "Sí", value: 10 },
              { label: "No", value: 3 },
            ]}
            caption="Testeo 3 · 13 respuestas (Anexo F)."
          />
          <HBars
            title="¿Con qué frecuencia ves o escuchas Loopstation?"
            total={13}
            tone="red"
            bars={[
              { label: "Seguido", value: 9 },
              { label: "De vez en cuando", value: 3 },
              { label: "Casi nunca", value: 1 },
            ]}
          />
        </Reveal>
      </div>
      <Callout tone="soft">
        <b>El sistema no se quedó callado: dijo otra cosa.</b> La respuesta más precisa del ciclo: «el sonido fue el elemento
        principal de la presentación […]; la iluminación tuvo un papel secundario y no contribuyó de manera significativa a la
        experiencia».
      </Callout>

      <div className="chapter v" id="segundo-ciclo">
        <span className="display chapter-n">No_02</span>
        <h3 className="display-sm">El segundo ciclo</h3>
      </div>
      <p className="lead">La experiencia construida sobre Renegade, de Mahiro, se evaluó con los mismos tres marcos (anexos <A l="G">G</A>, <A l="H">H</A> e <A l="I">I</A>). La evidencia de cada testeo está en las pestañas de <a className="anx" href="#evidencia-testeos">los seis testeos ↑</a>.</p>

      <div className="renegade-grid mt">
        <Reveal className="card top-violet prose">
          <p className="label violet">Mirada del artista · Yiro</p>
          <p className="muted small">Parte A, respondida antes de ver la iluminación, escuchando solo el audio:</p>
          <blockquote className="quote">
            «Al principio percibo una atmósfera problemática y misteriosa, como si algo estuviera por suceder; a medida que avanza,
            esa sensación se transforma en algo mucho más profundo y trascendental.»
          </blockquote>
          <p className="mt">
            Después de ver el registro valoró con <b>5 de 5</b> las tres afirmaciones de la escala y no identificó ningún momento
            desconectado. Destacó que, a mitad del tema, cuando se escucha el palpitar de un corazón, <b>la luz parece respirar
            siguiendo ese ritmo</b>. Como única corrección pidió colores más oscuros al comienzo.
          </p>
          <div className="likert">
            {["La luz va con lo que escuché", "La luz sigue los cambios del tema", "La luz le suma a la presentación"].map((t) => (
              <div key={t}>
                <span>{t}</span>
                <span className="dots" aria-label="5 de 5">
                  {[1, 2, 3, 4, 5].map((k) => (
                    <i key={k} className="on" />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
        <Recursos />
      </div>
      <p className="hint">
        Mismo evaluador, mismo vocabulario y veredicto invertido sobre recursos que él mismo había identificado antes: es el
        contraste entre sistemas más sólido del que dispone el proyecto.
      </p>

      <Sub tone="violet">Mirada del usuario · diez personas, ocho siguen el formato desde hace más de un año</Sub>
      <div className="rings">
        {[
          [82, "Correspondencia", "4,1 de 5 en promedio"],
          [84, "Marca los cambios", "4,2 de 5 en promedio"],
          [100, "Aporta algo", "10 de 10 dicen que quitarla restaría"],
        ].map(([p, l, d], i) => (
          <Reveal key={l as string} className="ring-tile" delay={i * 120}>
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="52" className="ring-bg" />
              <circle cx="60" cy="60" r="52" className="ring" style={{ ["--p" as string]: p as number }} />
            </svg>
            <b className="display">{p}%</b>
            <span className="label-d">{l}</span>
            <small className="muted">{d}</small>
          </Reveal>
        ))}
      </div>
      <div className="grid-3 mt">
        <Reveal className="card">
          <Scale title="¿Qué tanto sentiste que la iluminación iba con la música?" counts={[0, 0, 2, 5, 3]} avg={4.1} tone="violet" />
        </Reveal>
        <Reveal className="card" delay={100}>
          <Scale title="¿La iluminación te ayudó a notar los cambios del tema?" counts={[0, 0, 1, 6, 3]} avg={4.2} tone="violet" />
        </Reveal>
        <Reveal className="card" delay={200}>
          <HBars
            title="¿Hace cuánto sigues el beatbox o el Loopstation?"
            total={10}
            tone="violet"
            bars={[
              { label: "Es la primera vez", value: 1 },
              { label: "Menos de un año", value: 1 },
              { label: "Entre uno y tres años", value: 5 },
              { label: "Más de tres años", value: 3 },
            ]}
          />
        </Reveal>
      </div>
      <p className="hint">
        Tres personas señalaron un momento fuera de lugar, y las tres por el mismo motivo: la luz llegaba tarde. Ante la
        pregunta de cierre —qué cambiaría si se retirara la iluminación— las diez respondieron que se perdería algo, y cuatro
        nombraron algo estructural: «la sensación de que cada parte de la canción tiene un momento importante», «la narrativa
        visual», «el impacto de los momentos más importantes».
      </p>

      <Sub tone="violet">El arco de la pieza, leído por tres fuentes independientes</Sub>
      <div className="arc">
        <div className="arc-line" aria-hidden="true">
          <span>oscuridad</span>
          <span>transformación</span>
          <span>llegada</span>
        </div>
        {[
          ["Yiro · solo el audio", "«Al principio percibo una atmósfera problemática y misteriosa.»"],
          ["Castrillón · desde el sonido", "«Empieza lúgubre, oscuro en mi mente, y se va desenvolviendo en algo muy llamativo, como si algo tuviera que pasar después.»"],
          ["El público · viendo el video", "«Penumbra, misterio, melancolía y fuerza, al final sentí un viaje ancestral.» «Una especie de transformación, como si algo despertara y evolucionara hasta alcanzar su máximo poder.»"],
        ].map(([w, q], i) => (
          <Reveal as="blockquote" key={w} className="arc-q" delay={i * 140}>
            <small className="label violet">{w}</small>
            <p>{q}</p>
          </Reveal>
        ))}
      </div>
      <Callout tone="violet" label="Lo que muestra">
        Ninguna de las tres fuentes tuvo acceso a lo que habían dicho las otras, y las tres describen el mismo recorrido: una
        oscuridad inicial, una transformación y una llegada. El misterio —que ninguna de las trece personas nombró en el primer
        ciclo— reaparece aquí por iniciativa de los participantes. Al tratarse de piezas distintas no es una medición del mismo
        estímulo.
      </Callout>
      <Reveal className="card top-red feature row mt-lg">
        <Icon name="bolt" className="red" size={34} />
        <div>
          <h3 className="label-d">Lo que queda por resolver</h3>
          <p>
            Persiste un defecto de naturaleza distinta: en el primer ciclo el desajuste era de sentido; aquí es de tiempo —la luz
            dice lo que corresponde, pero a veces con retraso—. Lo señalaron el experto («que la función en vivo tenga un tiempo
            de respuesta más corto») y tres de las diez personas del público; el artista no identificó ninguno.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
