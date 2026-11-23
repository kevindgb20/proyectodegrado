import { LIBRO } from "@/lib/drive";
import StageCanvas from "./StageCanvas";

const TITLE = ["Del sonido", "a la luz"];

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <StageCanvas />
      <div className="hero-vignette" />
      <div className="hero-inner">
        <span className="bar hero-bar" aria-hidden="true" />
        <h1 className="display hero-title">
          {TITLE.map((l, i) => (
            <span key={l} className="line" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
              {l}
            </span>
          ))}
        </h1>
        <p className="hero-sub">Experiencia de traducción sonora en iluminación escénica apoyada con inteligencia artificial</p>
        <p className="hero-author">Kevin Daniel Guzmán Bernal</p>
        <p className="hero-meta">
          Universidad Colegio Mayor de Cundinamarca
          <br />
          Facultad de Ingeniería y Arquitectura
          <br />
          Diseño Digital y Multimedia
        </p>
        <p className="hero-meta dim">
          Director · Daniel Andrés Valbuena Romero
          <br />
          Codirector · Francisco Ernesto Cuenca Camacho
        </p>
        <p className="hero-meta">Bogotá · 2026</p>
        <div className="hero-cta">
          <a className="btn primary" href="#videos">
            Ver la experiencia
          </a>
          <a className="btn ghost" href="#informacion">
            Conocer el proyecto
          </a>
          <a className="btn ghost" href={LIBRO} target="_blank" rel="noreferrer">
            Libro digital (PDF)
          </a>
        </div>
      </div>
      <a href="#informacion" className="scroll-cue" aria-label="Bajar">
        <span />
      </a>
    </section>
  );
}
