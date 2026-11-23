import { LIBRO } from "@/lib/drive";
import Reveal from "./Reveal";
import { Icon, SectionHead } from "./ui";

const REFS = [
  <>BOSS. (s. f.). <i>RC-505mkII Loop Station</i>. Roland Corporation. <a href="https://www.boss.info/mx/products/rc-505mk2/" target="_blank" rel="noreferrer">boss.info</a></>,
  <>Dewey, J. (1934). <i>Art as experience</i>. Minton, Balch &amp; Company.</>,
  <>Findeli, A. (2008). Searching for design research questions: Some conceptual clarifications. En <i>Questions, hypotheses &amp; conjectures: Discussions on projects by early stage and senior design researchers</i> (pp. 286–303). iUniverse.</>,
  <>Frayling, C. (1993). Research in art and design. <i>Royal College of Art Research Papers, 1</i>(1), 1–5.</>,
  <>Jakobson, R. (1959). On linguistic aspects of translation. En R. A. Brower (Ed.), <i>On translation</i> (pp. 232–239). Harvard University Press.</>,
  <>Keyson, D. V. (2009). <i>Prototyping for design research</i>. Delft University of Technology.</>,
  <>Krippendorff, K. (1993). Major metaphors of communication and some constructivist reflections on their use. <i>Cybernetics &amp; Human Knowing, 2</i>(1), 3–25.</>,
  <>Mahiro. (2025). <i>Renegade</i> [Rutina de beatbox]. Grand Beatbox Battle 2025, segunda ronda, frente a JUNNO. Swissbeatbox.</>,
  <>Mahiro [@mahirolooper]. (s. f.). <i>Publicaciones</i> [Perfil de Instagram]. Instagram. <a href="https://www.instagram.com/mahirolooper" target="_blank" rel="noreferrer">instagram.com/mahirolooper</a></>,
  <>McKinney, J., &amp; Butterworth, P. (2009). <i>The Cambridge introduction to scenography</i>. Cambridge University Press.</>,
  <>Nodi. (s. f.). <i>Nodi</i>. <a href="https://nodi.global/es" target="_blank" rel="noreferrer">nodi.global</a></>,
  <>Schramm, W. (1954). How communication works. En W. Schramm (Ed.), <i>The process and effects of mass communication</i> (pp. 3–26). University of Illinois Press.</>,
  <>Teoría de la Comunicación 1. (s. f.). <i>Modelo de Wilbur Schramm</i> [Figura]. <a href="https://teoriacomunicacion1.wordpress.com/modelos-de-comunicacion/modelo-de-wilbur-schramm/" target="_blank" rel="noreferrer">teoriacomunicacion1.wordpress.com</a></>,
  <>Yiro [@yirobbx]. (s. f.). <i>Publicaciones</i> [Perfil de Instagram]. Instagram. <a href="https://www.instagram.com/yirobbx" target="_blank" rel="noreferrer">instagram.com/yirobbx</a></>,
];

export default function Anexos() {
  return (
    <>
      <section className="section" id="referencias">
        <SectionHead n="10" kicker="Referencias" title="Fuentes citadas" lead="Bajo normas APA 7." />
        <Reveal className="refs">
          <ul>
            {REFS.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="section book-sec">
        <Reveal className="book-dl">
          <Icon name="book" size={40} className="red" />
          <div>
            <b className="display-sm">Libro digital · Del sonido a la luz</b>
            <span className="muted">
              Documento sintético del entregable transmedia · PDF · 31 MB. Los anexos A–M están citados y enlazados en cada parte de esta
              página donde se usan.
            </span>
          </div>
          <a className="btn primary" href={LIBRO} target="_blank" rel="noreferrer">
            <Icon name="download" size={18} /> Descargar
          </a>
        </Reveal>
      </section>
    </>
  );
}
