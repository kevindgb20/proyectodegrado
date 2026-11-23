"use client";

import type { ReactNode } from "react";
import { ANEXO_FILES, driveView } from "@/lib/drive";
import { anexo, type Video } from "@/lib/media";
import ImageGrid, { type Img } from "./ImageViewer";
import Reveal from "./Reveal";
import { Icon } from "./ui";
import { VideoGrid } from "./VideoPlayer";

/** Enlace en línea a un anexo: abre su archivo en Drive y, si no hay uno principal, la carpeta. */
export function A({ l, children }: { l: string; children?: ReactNode }) {
  const a = anexo(l);
  const file = ANEXO_FILES[l];
  const href = file ? driveView(file.id) : a.url;
  return (
    <a className="anx" href={href} target="_blank" rel="noreferrer" title={a.t}>
      {children ?? `Anexo ${l}`}
    </a>
  );
}

/** Ficha compacta de un anexo, con su archivo y su carpeta de Drive. */
export function AnexoChip({ l }: { l: string }) {
  const a = anexo(l);
  const file = ANEXO_FILES[l];
  return (
    <div className="anx-chip">
      <span className="display anx-l">{l}</span>
      <div className="anx-t">
        <b>{a.t}</b>
        <span>{a.d}</span>
      </div>
      <div className="annex-actions">
        {file && (
          <a href={driveView(file.id)} target="_blank" rel="noreferrer" aria-label={`${file.label}, anexo ${l}, en Drive`}>
            <Icon name="doc" size={15} /> {file.label}
          </a>
        )}
        <a href={a.url} target="_blank" rel="noreferrer" aria-label={`Abrir carpeta del anexo ${l} en Drive`}>
          <Icon name="link" size={15} /> Carpeta
        </a>
      </div>
    </div>
  );
}

export interface EvidenceBlock {
  title?: string;
  text?: ReactNode;
  videos?: Video[];
  images?: Img[];
}

/** Evidencia junto al contenido: anexos, videos e imágenes del momento del proyecto del que se habla. */
export default function Evidencia({
  label = "Evidencia",
  anexos = [],
  blocks = [],
  tone = "red",
  id,
}: {
  label?: string;
  anexos?: string[];
  blocks?: EvidenceBlock[];
  tone?: "red" | "violet";
  id?: string;
}) {
  return (
    <Reveal className={`evidence t-${tone}`}>
      <div id={id} className="ev-anchor" />
      <p className={`ev-label ${tone === "violet" ? "violet" : ""}`}>
        <Icon name="doc" size={16} /> {label}
      </p>
      {anexos.length > 0 && (
        <div className="anx-list">
          {anexos.map((l) => (
            <AnexoChip key={l} l={l} />
          ))}
        </div>
      )}
      {blocks.map((b, i) => (
        <div key={i} className="ev-block">
          {b.title && <h4 className="ev-title">{b.title}</h4>}
          {b.text && <p className="ev-text">{b.text}</p>}
          {b.videos && b.videos.length > 0 && <VideoGrid list={b.videos} tone={tone} />}
          {b.images && b.images.length > 0 && <ImageGrid list={b.images} className="forms" />}
        </div>
      ))}
    </Reveal>
  );
}
