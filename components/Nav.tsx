"use client";

import { useEffect, useState } from "react";

const LINKS = [
  ["#informacion", "Proyecto"],
  ["#problema", "Problema"],
  ["#metodologia", "Metodología"],
  ["#resultados", "Resultados"],
  ["#herramienta", "Herramienta"],
  ["#conclusiones", "Conclusiones"],
  ["#videos", "Videos"],
  ["#imagenes", "Imágenes"],
  ["#referencias", "Referencias"],
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Resalta la sección visible.
  useEffect(() => {
    const els = LINKS.map(([h]) => document.querySelector(h)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`nav ${open ? "open" : ""}`}>
      <a href="#inicio" className="brand">
        <span className="brand-mark" aria-hidden="true" />
        <span className="display">Del sonido a la luz</span>
      </a>
      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menú">
        <span />
        <span />
      </button>
      <nav onClick={() => setOpen(false)}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} className={active === href ? "on" : ""}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
