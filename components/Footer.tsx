import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="footer-cta">
        <h2>
          Que la luz <span className="shimmer">escuche</span>.
        </h2>
        <p className="lead">
          Experiencia de traducción sonora en iluminación escénica apoyada con inteligencia artificial.
        </p>
      </Reveal>
      <div className="footer-bar">
        <span>IA Iluminación · loopstation → luz</span>
        <span className="mono">BOSS RC-505 MK2 → DSP → IA → DMX 512</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
