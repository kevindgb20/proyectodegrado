import { LIBRO } from "@/lib/drive";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="footer-cta">
        <span className="bar center" aria-hidden="true" />
        <p className="display footer-title">
          Operar no es <span className="red">comunicar</span>
        </p>
        <p className="lead">
          La intención no se deduce del sonido: debe declararse. Lo que se entrega es <em>Renegade</em>, de Mahiro, iluminada
          a partir de una intención declarada.
        </p>
        <div className="hero-cta center-cta">
          <a className="btn primary" href="#videos">
            Ver la experiencia
          </a>
          <a className="btn ghost" href={LIBRO} target="_blank" rel="noreferrer">
            Libro digital (PDF)
          </a>
        </div>
      </Reveal>
      <div className="footer-bar">
        <span>Del sonido a la luz · Experiencia de traducción sonora en iluminación escénica apoyada con inteligencia artificial</span>
        <span>
          Kevin Daniel Guzmán Bernal · Universidad Colegio Mayor de Cundinamarca · Diseño Digital y Multimedia · 2026
        </span>
      </div>
    </footer>
  );
}
