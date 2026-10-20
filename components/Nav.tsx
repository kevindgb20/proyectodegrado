const LINKS = [
  ["#flujo", "Flujo"],
  ["#papeles", "Papeles"],
  ["#en-vivo", "En vivo"],
  ["#ia", "IA"],
  ["#cifras", "Cifras"],
  ["#seguridad", "Seguridad"],
];

export default function Nav() {
  return (
    <header className="nav">
      <a href="#inicio" className="brand">
        <span className="brand-mark" aria-hidden="true" />
        IA Iluminación <small>loopstation → luz</small>
      </a>
      <nav>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
