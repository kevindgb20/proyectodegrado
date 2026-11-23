import Reveal from "./Reveal";
import { Callout, SectionHead } from "./ui";

const CONCLUSIONS = [
  { t: "Operar no es comunicar.", d: "En el sistema estudiado el canal visual funcionó —las luminarias respondieron al audio en todo momento— y aun así las tres miradas coincidieron en que el mensaje del artista no llegó. No afirma que un sistema automatizado no pueda operar sobre la intención de un artista, sino que el evaluado no tenía cómo recibirla." },
  { t: "La pérdida ocurre en un punto identificable.", d: "El sistema analiza la mezcla como un bloque y responde a su energía: lo que se pierde es justamente lo que distingue una sección de otra. Que el artista, el experto y el usuario señalen el mismo punto desde marcos distintos le da una solidez que ninguna tendría por separado." },
  { t: "La respuesta de diseño es lingüística antes que lumínica.", d: "Si la intención no puede deducirse de la señal, el sistema necesita un lugar donde recibirla. Esa es la función del prompt, y el propio experto la formuló sin que se le preguntara." },
  { t: "Declarar la intención modifica lo que el espectador lee.", d: "En el segundo ciclo las tres miradas coinciden: el artista describió el recorrido escuchando solo el audio, el experto invirtió su veredicto sobre los mismos cuatro recursos y las diez personas del público describieron el mismo recorrido al ver el registro." },
  { t: "El defecto que persiste es de otra naturaleza.", d: "En el primer ciclo el desajuste era de sentido; en el segundo es de tiempo: la luz dice lo que corresponde, pero a veces llega tarde. Define la siguiente iteración." },
  { t: "El resultado del proyecto es una experiencia, no un sistema.", d: "La herramienta existe porque la experiencia la necesitaba. Lo que se entrega es Renegade, de Mahiro, iluminada a partir de una intención declarada." },
];

const REFLECTION = [
  { t: "El giro fue involuntario", d: "El objetivo era, y sigue siendo, diseñar una experiencia; al probar el sistema existente apareció que no tenía dónde recibir aquello que la experiencia quería transmitir. Construir una herramienta propia no fue una ambición técnica sino la única forma de llegar a ese producto." },
  { t: "El error más costoso", d: "Suponer que la etiqueta comercial de inteligencia artificial describía un comportamiento real; tomarla al pie de la letra retrasó el diagnóstico, y fue la entrevista con el creador la que lo precisó." },
  { t: "El orden de los instrumentos decide su validez", d: "Preguntar al usuario después de explicarle que una inteligencia artificial opera la luz habría medido la explicación y no la lectura." },
  { t: "Mejorar un instrumento tiene un costo", d: "Al diseñar el formulario del segundo ciclo se incorporaron preguntas nuevas, lo que mejoró la lectura de ese ciclo pero redujo la comparabilidad entre ambos. Conviene anticiparlo." },
  { t: "Una objeción abierta", d: "Si es el artista quien declara la intención que alimenta el prompt, parte del acierto le pertenece a él. Esa es precisamente la tesis —la intención no se deduce del sonido, debe declararse—, pero la frontera entre lo que aporta cada uno merece seguir investigándose." },
];

const FUTURE = [
  ["Reducir la latencia", "El paso inmediato: único defecto que dos de las tres miradas coinciden en señalar.", true],
  ["La misma pieza en los dos sistemas", "Ejecutarla con la misma intención declarada en MyStrow y en la herramienta propia."],
  ["Separar las capas en origen", "Mediante múltiples entradas de audio: el hallazgo que la herramienta no resolvió."],
  ["Otros formatos en vivo", "Aplicar el procedimiento más allá del Loopstation."],
  ["La frontera de la autoría", "Delimitar qué aporta el artista al escribir el prompt y qué aporta el sistema al interpretarlo."],
] as const;

export default function Cierre() {
  return (
    <>
      <section className="section" id="reflexion">
        <SectionHead n="08" kicker="Reflexión crítica del estudiante" title="Lo que cambió de rumbo" />
        <div className="grid-2">
          {REFLECTION.map((r, i) => (
            <Reveal key={r.t} className={`card top-red feature ${i === REFLECTION.length - 1 ? "span-2" : ""}`} delay={(i % 2) * 100}>
              <h3 className="label-d">{r.t}</h3>
              <p>{r.d}</p>
            </Reveal>
          ))}
        </div>
        <Callout label="Declaración de uso de inteligencia artificial" tone="soft">
          <p>
            <b>Como objeto de estudio:</b> el sistema comercial evaluado y la herramienta desarrollada por el autor son, ambos, el
            material de la investigación. <b>Como herramienta de apoyo:</b> asistentes de inteligencia artificial generativa en la
            escritura y revisión de textos, en la producción de piezas gráficas y en el desarrollo del código de la herramienta
            propia.
          </p>
          <p className="muted">
            Los datos empíricos —la intención declarada por los artistas, las respuestas del experto y de los usuarios, la
            entrevista al creador del sistema y los registros audiovisuales— fueron recogidos directamente por el autor y no
            fueron generados ni completados por ninguna herramienta de inteligencia artificial. Las decisiones de diseño, la
            interpretación de los resultados y las conclusiones son responsabilidad del autor.
          </p>
        </Callout>
      </section>

      <section className="section" id="conclusiones">
        <SectionHead n="09" kicker="Conclusiones" title="Lo que se sostiene" />
        <ol className="conclusions">
          {CONCLUSIONS.map((c, i) => (
            <Reveal as="li" key={c.t} className={i >= 3 ? "v" : ""} delay={i * 90}>
              <span className="c-num">{i + 1}</span>
              <div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal className="motto">
          <p className="display">
            El producto es la experiencia. <span className="violet">La herramienta es el medio.</span>
          </p>
        </Reveal>
        <p className="sublabel violet">Trabajo futuro</p>
        <div className="future">
          {FUTURE.map(([t, d, first], i) => (
            <Reveal key={t} className={`future-item ${first ? "first" : ""}`} delay={i * 90}>
              <span className="display">{String(i + 1).padStart(2, "0")}</span>
              <b>{t}</b>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
