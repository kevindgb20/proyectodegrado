import Reveal from "./Reveal";

const RULES = [
  { t: "Arranca en simulación", d: "La transmisión física exige marcar una confirmación y pulsar el botón." },
  { t: "Blackout primero", d: "El primer frame físico es negro, y también al desactivar, al cerrar o ante un error USB." },
  { t: "Estrobo limitado", d: "Si la luminaria no tiene canal de estrobo, se emula a 8 Hz como máximo." },
  { t: "Cuidado del cable", d: "Sólo los canales que cambian, nunca más de 20 actualizaciones por segundo." },
  { t: "La RC-505 sólo se escucha", d: "No se usa MIDI ni se abre como salida de audio." },
  { t: "Claves privadas", d: "La app nunca muestra ni guarda las claves de IA: sólo indica si están presentes." },
];

const STATUS: { t: string; s: "ok" | "warn" | "bad" }[] = [
  { t: "Analizar y guardar una sesión", s: "ok" },
  { t: "Propuesta con Gemini (API real)", s: "ok" },
  { t: "Validar contra perfiles DMX", s: "ok" },
  { t: "Simulador de 512 canales", s: "ok" },
  { t: "Detectar el adaptador USB-DMX", s: "ok" },
  { t: "Captura con la RC-505 conectada", s: "warn" },
  { t: "Transmisión física a una luminaria", s: "bad" },
];

const LABEL = { ok: "verificado", warn: "pendiente", bad: "no verificado" };

export default function Safety() {
  return (
    <section className="section" id="seguridad">
      <div className="safety-grid">
        <div>
          <Reveal as="header" className="section-head left">
            <p className="eyebrow">Seguridad</p>
            <h2>
              Luz potente, <span className="grad">salida prudente</span>
            </h2>
          </Reveal>
          <ul className="rules">
            {RULES.map((r, i) => (
              <Reveal as="li" key={r.t} delay={i * 60}>
                <b>{r.t}</b>
                <span>{r.d}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="card status" delay={120}>
          <p className="card-label mono">estado de la primera fase</p>
          <ul>
            {STATUS.map((s) => (
              <li key={s.t}>
                <span>{s.t}</span>
                <span className={`pill ${s.s}`}>{LABEL[s.s]}</span>
              </li>
            ))}
          </ul>
          <p className="hint">Honestidad ante todo: lo que no se ha comprobado con el equipo real, se dice.</p>
        </Reveal>
      </div>
    </section>
  );
}
