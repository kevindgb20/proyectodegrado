"use client";

import { useEffect, useRef } from "react";

/** Foco que sigue al cursor por toda la página y un fader DMX que indica el progreso de scroll. */
export default function Ambient() {
  const knob = useRef<HTMLSpanElement>(null);
  const val = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (knob.current) knob.current.style.bottom = `calc(${(p * 100).toFixed(2)}% - 9px)`;
      if (val.current) val.current.textContent = String(Math.round(p * 255)).padStart(3, "0");
      root.style.setProperty("--scroll", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="spotlight" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="fader" aria-hidden="true">
        <span className="fader-track">
          <span className="fader-knob" ref={knob} />
        </span>
        <span className="fader-val mono" ref={val}>
          000
        </span>
      </div>
    </>
  );
}
