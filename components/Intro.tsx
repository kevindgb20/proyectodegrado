"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/hooks";
import { A } from "./Evidencia";
import Reveal from "./Reveal";
import { Callout, Icon, SectionHead, Sub } from "./ui";

const LAYERS = ["Base rítmica", "Bajo", "Melodía", "Efectos"];

/** Las capas entran una a una, de abajo arriba, y un cabezal recorre el bucle. */
function Layers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.35);
  return (
    <div ref={ref} className={`layers ${inView ? "play" : ""}`}>
      <div className="loop-ico">
        <Icon name="loop" size={46} />
        <small>en bucle</small>
      </div>
      <ol className="layer-stack">
        {[...LAYERS].reverse().map((l) => {
          const i = LAYERS.indexOf(l);
          return (
            <li key={l} style={{ ["--i" as string]: i }} className={`layer l${i}`}>
              <span className="wave" aria-hidden="true" />
              <span className="head" aria-hidden="true" />
              <b>{l}</b>
              <small>capa {i + 1}</small>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Score({ value, label, cycle, text, tone }: { value: number; label: string; cycle: string; text: string; tone: "red" | "violet" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.5);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setV(i);
      if (i >= value) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [inView, value]);
  return (
    <div ref={ref} className={`score t-${tone}`}>
      <p className="label">{cycle}</p>
      <div className="score-row">
        <b className="display score-n">
          {v}
          <small>/5</small>
        </b>
        <span className="dots" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((k) => (
            <i key={k} className={k <= v ? "on" : ""} />
          ))}
        </span>
      </div>
      <p className="score-label">{label}</p>
      <p className="muted">{text}</p>
    </div>
  );
}

export default function Intro() {
  return (
    <>
      <section className="section" id="informacion">
        <SectionHead
          n="01"
          kicker="Información general del proyecto"
          title="Qué estudia este proyecto"
          lead={
            <>
              Este proyecto estudia la relación comunicativa entre el sonido y la luz en un evento en vivo. Su objeto es la{" "}
              <b>traducción</b>: el paso del discurso sonoro de un intérprete a una respuesta lumínica, cuando quien ejecuta ese
              paso es un sistema de inteligencia artificial.
            </>
          }
        />
        <div className="two-col">
          <Reveal className="card top-red prose">
            <p className="label">La luz en la puesta en escena</p>
            <p>
              La iluminación hace parte del diseño de la puesta en escena: delimita el espacio, dirige la atención, marca el
              tiempo del evento y construye atmósfera mediante color, intensidad y movimiento. Por eso se diseña con
              anticipación y se opera durante la función.
            </p>
            <p className="strong">Cuando esa operación se automatiza, la pregunta deja de ser técnica y pasa a ser comunicativa.</p>
          </Reveal>
          <Reveal className="card top-red prose" delay={120}>
            <p className="label">El caso de estudio · el Loopstation</p>
            <p>
              El equipo que hace posible el formato es la loop station. El referente de la categoría es la{" "}
              <b>BOSS RC-505mkII</b>, un looper de sobremesa que graba y superpone audio en vivo sobre cinco pistas de frase
              estéreo simultáneas, con efectos de entrada y de pista y patrones rítmicos integrados.
            </p>
            <p>
              Que el equipo sostenga varias pistas a la vez permite que la pieza se construya delante del público: cada capa
              sigue sonando en bucle mientras el artista graba la siguiente. Eso determina lo que recibe el sistema de
              iluminación: <b>una música que crece por partes, y no una mezcla ya terminada.</b>
            </p>
          </Reveal>
        </div>

        <div className="loop-grid">
          <Reveal className="card top-red">
            <p className="label">Las capas, una sobre otra</p>
            <Layers />
            <p className="hint">Cada capa sigue sonando en bucle mientras el artista graba la siguiente.</p>
          </Reveal>
          <Reveal className="card top-violet prose" delay={120}>
            <p className="label violet">Desde dónde se aborda</p>
            <p>
              Desde el diseño digital y multimedia, bajo el paradigma de <b>investigación a través del diseño</b>: el prototipo
              no ilustra el resultado sino que opera como instrumento de investigación.
            </p>
            <p>
              El producto es una experiencia escénica de iluminación y la herramienta desarrollada por el autor es el medio que
              la hace posible. El aporte está en haber establecido, con evidencia recogida en contexto real, qué se requiere
              para que una iluminación generada con inteligencia artificial transmita el mensaje de un artista.
            </p>
          </Reveal>
        </div>

        <div className="ficha">
          {[
            ["Título", "Del sonido a la luz: experiencia de traducción sonora en iluminación escénica apoyada con inteligencia artificial"],
            ["Autor", <>Kevin Daniel Guzmán Bernal · <A l="M">hoja de vida y portafolio</A></>],
            ["Director", "Daniel Andrés Valbuena Romero"],
            ["Codirector", "Francisco Ernesto Cuenca Camacho"],
            ["Programa", "Diseño Digital y Multimedia · Facultad de Ingeniería y Arquitectura"],
            ["Línea de profundización", "Animación y Audiovisuales"],
            ["Modalidad", "Proyecto de grado · 2026"],
            ["Palabras clave", "iluminación escénica · inteligencia artificial · traducción intersemiótica · Loopstation · diseño de experiencia · DMX"],
          ].map(([k, v], i) => (
            <Reveal key={k as string} className="ficha-row" delay={i * 50}>
              <span>{k}</span>
              <b>{v}</b>
            </Reveal>
          ))}
        </div>
        <p className="hint">
          El aporte a la línea de profundización es doble: trabaja sobre un lenguaje audiovisual poco explorado en el programa
          —la iluminación escénica entendida como recurso narrativo y no como soporte técnico— y el resultado es una pieza
          audiovisual, el registro de la experiencia, que es la forma en que este tipo de obra circula entre su público.
        </p>
      </section>

      <section className="section" id="resumen">
        <SectionHead
          n="02"
          kicker="Resumen ejecutivo"
          title="De la brecha al producto"
          lead={
            <>
              Este proyecto diseña una experiencia escénica en la que la iluminación, generada con inteligencia artificial,
              transmite al espectador el mensaje de un artista de Loopstation. Parte de una brecha:{" "}
              <b>el canal visual opera, pero el mensaje se pierde al pasar del sonido a la luz.</b>
            </>
          }
        />
        <div className="scores">
          <Reveal className="card top-red">
            <Score
              value={1}
              cycle="Primer ciclo · sistema comercial"
              label="Correspondencia entre su intención y la luz"
              text="Lo que el artista valoró de la correspondencia entre su intención y la luz que vio, con MyStrow."
              tone="red"
            />
          </Reveal>
          <div className="scores-arrow" aria-hidden="true">
            <i />
            <span>herramienta propia</span>
          </div>
          <Reveal className="card top-violet" delay={150}>
            <Score
              value={5}
              cycle="Segundo ciclo · herramienta propia"
              label="En las tres afirmaciones de la escala"
              text="Lo que valoró el mismo artista con la experiencia construida con la herramienta propia."
              tone="violet"
            />
          </Reveal>
        </div>
        <div className="two-col mt-lg">
          <Reveal className="card prose">
            <p className="label">Lo que se encontró</p>
            <p>
              Se evaluó un sistema comercial, MyStrow, en condiciones reales de interpretación. Tres miradas independientes
              coincidieron en que la luz no seguía la música ni distinguía las partes de la pieza: el artista valoró la
              correspondencia con 1 de 5; un experto profesional valoró el color y la intensidad con 2 de 5 y el ritmo de
              cambio con 1 de 5; y once de trece personas describieron la iluminación como ausente o contradictoria.
            </p>
            <p className="strong">El sistema no separaba el sonido en sus componentes: respondía a su energía y no a su estructura.</p>
          </Reveal>
          <Reveal className="card top-violet prose" delay={120}>
            <p className="label violet">Lo que resultó</p>
            <p>
              De esos hallazgos nació una herramienta propia: analiza la pieza, la devuelve dividida en partes y recibe un
              prompt con el mensaje que se quiere transmitir, del que resulta un diseño de iluminación previsualizable y
              corregible. Con ella se construyó una experiencia escénica sobre <em>Renegade</em>, de Mahiro.
            </p>
            <p>
              Evaluada con los mismos tres marcos: el artista valoró con 5 de 5 las tres afirmaciones; el experto —el mismo del
              primer ciclo— dio por coherentes los cuatro recursos que antes había señalado como fallidos; y las diez personas
              del público afirmaron que retirar la iluminación le restaría algo a la experiencia.
            </p>
            <p className="muted">Persiste un defecto de naturaleza distinta: la latencia de algunos efectos.</p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="justificacion">
        <SectionHead
          n="03"
          kicker="Justificación del proyecto"
          title="Por qué existe"
          lead="Este proyecto existe para construir una experiencia escénica en iluminación; todo lo demás —la evaluación del sistema comercial, los testeos, el desarrollo de la herramienta— está al servicio de ese fin. Y esa experiencia depende de que la luz diga algo: si se limita a reaccionar al volumen, el espectador ve destellos pero no entiende nada."
        />
        <Callout tone="soft">
          El referente es el trabajo de un diseñador de iluminación: alguien que conoce la pieza, entiende qué quiere decir el
          artista y decide la luz en consecuencia. La pregunta es qué habría que darle a un sistema automatizado para acercarse
          a ese lugar. La respuesta no se dio por supuesta: se midió con tres miradas independientes sobre un mismo registro, y
          el resultado determinó el curso del trabajo.
        </Callout>
        <div className="grid-2 mt-lg">
          <Reveal className="card top-red feature">
            <Icon name="book" className="red" size={32} />
            <h3 className="label-d">Pertinencia académica</h3>
            <p>
              Los sistemas de iluminación automatizada suelen evaluarse por su desempeño técnico: si la luz responde a tiempo, si
              el color corresponde a la frecuencia, si no hay cortes. Evaluarlos por lo que el espectador entiende es una pregunta
              distinta y requiere otro procedimiento.
            </p>
            <p>
              Este proyecto propone uno: pedir al artista que declare su intención antes de interpretar, registrar la
              interpretación con el sistema operando y mostrar ese registro a tres grupos que no comparten criterio.{" "}
              <b>Lo que se mide no es la luz sino la distancia entre lo que el artista quiso decir y lo que cada uno leyó.</b> Y
              aporta una respuesta: el prompt.
            </p>
          </Reveal>
          <Reveal className="card top-red feature" delay={120}>
            <Icon name="users" className="red" size={32} />
            <h3 className="label-d">Pertinencia comercial y cultural</h3>
            <p>
              Existe un mercado activo de software DMX asistido por inteligencia artificial —Maestro DMX, SoundSwitch y
              MyStrow, entre otros— dirigido a artistas y pequeños montajes, y los hallazgos señalan una carencia compartida por
              esa categoría junto con una vía para resolverla.
            </p>
            <p>
              En lo cultural, el Loopstation es un formato con comunidad propia y circulación internacional; su público lo
              consume principalmente en video, lo que vuelve la calidad del registro visual parte del valor de la obra.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
