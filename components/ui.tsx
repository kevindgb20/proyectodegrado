import type { ReactNode } from "react";
import Reveal from "./Reveal";

export function SectionHead({ n, kicker, title, lead }: { n?: string; kicker: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <Reveal as="header" className="shead">
      <p className="kicker-d">{n ? `${n} · ${kicker}` : kicker}</p>
      <h2 className="display">{title}</h2>
      <span className="bar" aria-hidden="true" />
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}

export function Callout({
  label,
  children,
  tone = "red",
  className = "",
}: {
  label?: string;
  children: ReactNode;
  tone?: "red" | "violet" | "soft";
  className?: string;
}) {
  return (
    <Reveal className={`callout c-${tone} ${className}`}>
      {label && <p className="callout-label">{label}</p>}
      <div className="callout-body">{children}</div>
    </Reveal>
  );
}

export function Sub({ children, tone = "red" }: { children: ReactNode; tone?: "red" | "violet" }) {
  return <p className={`sublabel ${tone === "violet" ? "violet" : ""}`}>{children}</p>;
}

const PATHS: Record<string, ReactNode> = {
  download: <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />,
  link: (
    <>
      <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </>
  ),
  book: (
    <>
      <path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" />
      <path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  heart: <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" />,
  mic: (
    <>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  chip: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 1.5v3.5M15 1.5v3.5M9 19v3.5M15 19v3.5M19 9h3.5M19 15h3.5M1.5 9H5M1.5 15H5" />
    </>
  ),
  device: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <circle cx="8.5" cy="14" r="1.6" />
      <circle cx="15.5" cy="14" r="1.6" />
      <path d="M8 8V4M16 8V4" />
    </>
  ),
  chat: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M7 8h10M7 12h6" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l4-1L19 8l-3-3L5 16l-1 4z" />
      <path d="M14 7l3 3M17 3l4 4" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l6 4-6 4z" />
    </>
  ),
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h8" />
    </>
  ),
  loop: (
    <>
      <path d="M21 4v6h-6" />
      <path d="M20.5 15a9 9 0 1 1-2.1-9.4L21 10" />
    </>
  ),
  x: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12.5 3 3 5-6" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  wave: <path d="M3 10v4M7 6v12M11 3v18M15 7v10M19 9v6M23 11v2" />,
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  lamp: (
    <>
      <rect x="9" y="2" width="6" height="5" rx="1" />
      <path d="M12 7 5 20h14L12 7z" />
      <path d="M5 20c2 1.5 12 1.5 14 0" />
    </>
  ),
};

export function Icon({ name, size = 28, className = "" }: { name: keyof typeof PATHS | string; size?: number; className?: string }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
