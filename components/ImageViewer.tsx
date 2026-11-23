"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";

export interface Img {
  src: string;
  n: string;
  kicker: string;
  title: string;
  w: number;
  h: number;
  form?: boolean;
}

function Lightbox({ list, index, onClose, onGo }: { list: Img[]; index: number; onClose: () => void; onGo: (i: number) => void }) {
  const img = list[index];
  const total = list.length;
  const prev = useCallback(() => onGo((index - 1 + total) % total), [index, total, onGo]);
  const next = useCallback(() => onGo((index + 1) % total), [index, total, onGo]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const thumbs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, prev, next]);

  useEffect(() => {
    thumbs.current?.querySelector<HTMLElement>(".lb-thumb.cur")?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${img.n}: ${img.title}`} onClick={onClose}>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <p className="lb-caption">
          <span className="kicker-d">
            {img.n} · {img.kicker}
          </span>
          <span className="display lb-title">{img.title}</span>
        </p>
        {total > 1 && (
          <span className="lb-count display">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        )}
        <button ref={closeRef} className="lb-btn lb-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
      </div>
      <div
        className="lb-stage"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
          touchX.current = null;
        }}
      >
        {total > 1 && (
          <button className="lb-btn lb-nav prev" onClick={prev} aria-label="Imagen anterior">
            ‹
          </button>
        )}
        <div className={`lb-frame ${img.form ? "white" : ""}`} key={index}>
          <Image src={img.src} alt={`${img.kicker}: ${img.title}`} width={img.w} height={img.h} sizes="100vw" priority unoptimized={img.src.startsWith("http")} />
        </div>
        {total > 1 && (
          <button className="lb-btn lb-nav next" onClick={next} aria-label="Imagen siguiente">
            ›
          </button>
        )}
      </div>
      {total > 1 && (
        <div className="lb-thumbs" ref={thumbs} onClick={(e) => e.stopPropagation()}>
          {list.map((t, i) => (
            <button key={t.src} className={`lb-thumb ${i === index ? "cur" : ""}`} onClick={() => onGo(i)} aria-label={`Ir a ${t.title}`} aria-current={i === index}>
              <Image src={t.src} alt="" width={160} height={Math.round((160 * t.h) / t.w)} sizes="120px" unoptimized={t.src.startsWith("http")} />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}

/** Rejilla de imágenes con visor a pantalla completa. */
export default function ImageGrid({ list, className = "" }: { list: Img[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const last = useRef<HTMLElement | null>(null);
  const close = useCallback(() => {
    setOpen(null);
    last.current?.focus();
  }, []);
  return (
    <>
      <div className={`gallery ${className}`}>
        {list.map((img, i) => (
          <Reveal key={img.src} delay={(i % 3) * 90} className={`g-item ${img.form ? "form" : ""}`}>
            <button
              className="g-card"
              onClick={(e) => {
                last.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`Ver ${img.title} en grande`}
            >
              <span className="g-img">
                <Image src={img.src} alt={`${img.kicker}: ${img.title}`} width={img.w} height={img.h} sizes="(max-width: 860px) 100vw, (max-width: 1150px) 50vw, 33vw" unoptimized={img.src.startsWith("http")} />
              </span>
              <span className="g-meta">
                <span className="g-n display">{img.n}</span>
                <span className="g-text">
                  <span className="g-kicker">{img.kicker}</span>
                  <span className="g-title">{img.title}</span>
                </span>
                <span className="g-zoom" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      {open !== null && <Lightbox list={list} index={open} onClose={close} onGo={setOpen} />}
    </>
  );
}
