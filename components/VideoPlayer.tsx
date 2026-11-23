"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { drivePreview, driveView } from "@/lib/drive";
import { videoSrc, type Video } from "@/lib/media";

function Player({ video }: { video: Video }) {
  return <iframe className="drive-player" src={drivePreview(videoSrc(video.id).drive)} title={video.title} allow="autoplay; fullscreen" allowFullScreen />;
}

function DriveLink({ video }: { video: Video }) {
  return (
    <a className="anx" href={driveView(videoSrc(video.id).drive)} target="_blank" rel="noreferrer">
      Abrir en Drive ↗
    </a>
  );
}

function Modal({ list, index, onClose, onGo }: { list: Video[]; index: number; onClose: () => void; onGo: (i: number) => void }) {
  const v = list[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const many = list.length > 1;
  const prev = useCallback(() => onGo((index - 1 + list.length) % list.length), [index, list.length, onGo]);
  const next = useCallback(() => onGo((index + 1) % list.length), [index, list.length, onGo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (many && e.key === "PageUp") prev();
      else if (many && e.key === "PageDown") next();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, prev, next, many]);

  return createPortal(
    <div className="lightbox vmodal" role="dialog" aria-modal="true" aria-label={v.title} onClick={onClose}>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <p className="lb-caption">
          <span className="kicker-d">{v.anexo ? `Anexo ${v.anexo} · ${v.dur}` : v.dur}</span>
          <span className="display lb-title">{v.title}</span>
        </p>
        {many && (
          <span className="lb-count display">
            {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
          </span>
        )}
        <button ref={closeRef} className="lb-btn lb-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
      </div>
      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        {many && (
          <button className="lb-btn lb-nav prev" onClick={prev} aria-label="Video anterior">
            ‹
          </button>
        )}
        <div className="lb-frame" key={v.id}>
          <Player video={v} />
        </div>
        {many && (
          <button className="lb-btn lb-nav next" onClick={next} aria-label="Video siguiente">
            ›
          </button>
        )}
      </div>
      <p className="vmodal-desc" onClick={(e) => e.stopPropagation()}>
        {v.desc} <DriveLink video={v} />
      </p>
    </div>,
    document.body,
  );
}

export function PlayIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
    </svg>
  );
}

/** Rejilla de tarjetas de video; cada una abre el visor con navegación por la lista. */
export function VideoGrid({ list, tone = "red", className = "" }: { list: Video[]; tone?: "red" | "violet"; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const last = useRef<HTMLElement | null>(null);
  const close = useCallback(() => {
    setOpen(null);
    last.current?.focus();
  }, []);
  return (
    <>
      <div className={`vgrid ${className}`}>
        {list.map((v, i) => (
          <button
            key={v.id}
            className={`vcard t-${tone}`}
            onClick={(e) => {
              last.current = e.currentTarget;
              setOpen(i);
            }}
            aria-label={`Reproducir ${v.title}, ${v.dur}`}
          >
            <span className="vthumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={videoSrc(v.id).poster} alt="" loading="lazy" className={v.vertical ? "vert" : ""} />
              <span className="vplay">
                <PlayIcon />
              </span>
              <span className="vdur">{v.dur}</span>
            </span>
            <span className="vmeta">
              <b>{v.title}</b>
              <span>{v.desc}</span>
            </span>
          </button>
        ))}
      </div>
      {open !== null && <Modal list={list} index={open} onClose={close} onGo={setOpen} />}
    </>
  );
}

/** Video destacado que se reproduce en la página, sin cargar nada hasta que se pide. */
export function FeatureVideo({ video, tone = "violet", label }: { video: Video; tone?: "red" | "violet"; label: string }) {
  const [playing, setPlaying] = useState(false);
  const s = videoSrc(video.id);
  return (
    <div className={`feature-video t-${tone}`}>
      <div className="fv-frame">
        {playing ? (
          <Player video={video} />
        ) : (
          <button className="fv-poster" onClick={() => setPlaying(true)} aria-label={`Reproducir ${video.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.poster} alt="" />
            <span className="fv-play">
              <PlayIcon size={34} />
            </span>
            <span className="fv-badge">
              {label} · {video.dur}
            </span>
          </button>
        )}
      </div>
      <div className="fv-meta">
        <h3 className="display-sm">{video.title}</h3>
        <p>{video.desc}</p>
        {video.anexo && <span className={`pill ${tone}`}>Anexo {video.anexo}</span>}
        <DriveLink video={video} />
      </div>
    </div>
  );
}
