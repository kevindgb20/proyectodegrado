import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Captura",
    tag: "BOSS RC-505 MK2",
    text: "Sólo se lee la MAIN, la mezcla que escucha el público. WASAPI a 44 100 Hz. Nunca se le envía nada.",
  },
  {
    n: "02",
    title: "Análisis DSP",
    tag: "librosa · scipy",
    text: "Tempo con confianza, pulsos, onsets clasificados, 6 bandas, tonalidad, acordes, notas, breaks y clímax.",
  },
  {
    n: "03",
    title: "Memoria",
    tag: "SQLite",
    text: "Sesiones, análisis versionados, series y propuestas recuperables. Memoria no es aprendizaje.",
  },
  {
    n: "04",
    title: "Prompt creativo",
    tag: "tu intención",
    text: "Describes en palabras lo que quieres sentir. «Más efectos a la luz dos», «fundido lento a negro al final».",
  },
  {
    n: "05",
    title: "Propuesta IA",
    tag: "OpenAI · Gemini",
    text: "Cues con capas, destinos y comportamientos ligados al análisis, con JSON Schema estricto.",
  },
  {
    n: "06",
    title: "Validación",
    tag: "perfiles · patch",
    text: "Rangos, solapes y capacidades reales de cada luminaria, más una revisión musical de cada efecto.",
  },
  {
    n: "07",
    title: "Luz DMX",
    tag: "512 canales",
    text: "Compilador determinista a frames. Simulador o cable USB-DMX, con el audio como reloj maestro.",
  },
];

export default function Pipeline() {
  return (
    <section className="section" id="flujo">
      <Reveal as="header" className="section-head">
        <p className="eyebrow">El flujo</p>
        <h2>
          Del loop a la luz, <span className="grad">en siete pasos</span>
        </h2>
        <p className="lead">
          Una aplicación local para Windows. El sonido entra por un lado y sale como luz por el otro, con cada decisión
          documentada en el medio.
        </p>
      </Reveal>
      <div className="pipeline-wrap">
        <div className="pipeline-wire" aria-hidden="true">
          <span className="pulse" />
          <span className="pulse p2" />
        </div>
        <ol className="pipeline">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 80} className="step">
            <span className="step-n mono">{s.n}</span>
            <h3>{s.title}</h3>
            <span className="pill">{s.tag}</span>
            <p>{s.text}</p>
          </Reveal>
        ))}
        </ol>
      </div>
    </section>
  );
}
