// Material del proyecto: videos e imágenes (Google Drive, ver drive.ts), cues del prompt y anexos del libro.
import { IMAGE_IDS, VIDEO_IDS, driveImage } from "./drive";

export interface Video {
  id: string;
  title: string;
  desc: string;
  dur: string;
  vertical?: boolean;
  anexo?: string;
}

export interface VideoGroup {
  id: string;
  title: string;
  phase: string;
  text: string;
  anexo?: string;
  tone: "red" | "violet";
  videos: Video[];
}

const v = (id: string) => ({ drive: VIDEO_IDS[id], poster: driveImage(VIDEO_IDS[id], 800) });
export const videoSrc = v;

export const PRODUCTO: Video[] = [
  {
    id: "mvp",
    title: "Renegade · la experiencia escénica",
    desc: "El producto del proyecto: la rutina de Mahiro traducida a luz con la herramienta propia, a partir de una intención declarada. Se ve la pieza analizada en pantalla y los dos grupos de reflectores siguiendo el diseño.",
    dur: "3:33",
    anexo: "L",
  },
  {
    id: "renegade-gbb25",
    title: "Renegade · Mahiro (GBB 2025)",
    desc: "La pieza original: rutina de la segunda ronda del Grand Beatbox Battle 2025, frente a JUNNO. Es la fuente de la letra y de las decisiones cromáticas del prompt. Se reproduce con fines de análisis académico; su autoría corresponde a Mahiro.",
    dur: "3:38",
    anexo: "C",
  },
  {
    id: "experiencia",
    title: "Renegade · interpretación con la iluminación",
    desc: "Interpretación de la pieza en el Loopstation con la luz de la herramienta.",
    dur: "3:37",
    anexo: "L",
  },
  {
    id: "resultado",
    title: "Video del resultado",
    desc: "Presentación narrada del producto: el modelo de Schramm, la pieza, el prompt y la experiencia.",
    dur: "7:49",
  },
];

export const PROCESO_PRINCIPAL: Video = {
  id: "proceso",
  title: "Del sonido a la luz · el proceso",
  desc: "El recorrido completo del proyecto: los sistemas del mercado, los testeos con Yiro y Roberto Castrillón y la herramienta que nació de los hallazgos.",
  dur: "9:58",
};

export const PROCESO: VideoGroup[] = [
  {
    id: "pruebas-mystrow",
    title: "Pruebas controladas del sistema comercial",
    phase: "Fase 02 · Preparación",
    text: "Montaje con reflectores PAR LED e interfaz USB-DMX. MyStrow se probó con pistas grabadas, en su simulador 3D y con señal en vivo.",
    anexo: "A",
    tone: "red",
    videos: [
      { id: "ms-overdrive-par", title: "Overdrive · un PAR LED", desc: "Configuración del modo IA y respuesta de una luminaria real.", dur: "1:35" },
      { id: "ms-overdrive-live", title: "Overdrive en vivo", desc: "La misma pieza con señal en vivo desde el Loopstation.", dur: "1:53", vertical: true },
      { id: "ms-3d-overdrive", title: "Overdrive · simulador 3D", desc: "La respuesta del sistema vista en su entorno 3D.", dur: "0:32" },
      { id: "ms-efectos-manual", title: "Efectos sin IA", desc: "Los efectos de MyStrow disparados a mano, para compararlos con el modo IA.", dur: "0:18", vertical: true },
      { id: "ms-loopstation-3d", title: "Loopstation con IA · 3D", desc: "Interpretación en el Loopstation con el modo IA y el simulador 3D.", dur: "2:37" },
      { id: "ms-ismellfear-3d", title: "I smell fear · 3D con IA", desc: "Otra pieza de Loopstation en el simulador 3D, con el modo IA.", dur: "2:32" },
      { id: "ms-yiro-mp3", title: "Yiro · cyberpunk desde mp3", desc: "La pieza de Yiro cargada como archivo: señal controlada y repetible.", dur: "1:19", vertical: true },
    ],
  },
  {
    id: "pruebas-yiro",
    title: "Pruebas en vivo con Yiro",
    phase: "Fase 02 · Preparación",
    text: "Yiro interpretando en el Loopstation con MyStrow operando la luz en tiempo real.",
    anexo: "A",
    tone: "red",
    videos: [
      { id: "yiro-tema-2", title: "Tema de Yiro", desc: "Interpretación completa con el sistema comercial.", dur: "3:28" },
      { id: "yiro-megalodon", title: "Megalodon", desc: "Interpretación completa con el sistema comercial.", dur: "4:02" },
      { id: "yiro-guaracha", title: "Guaracha", desc: "Fragmento en vivo.", dur: "0:22" },
      { id: "yiro-guaracha-2", title: "Guaracha · toma 2", desc: "Fragmento en vivo.", dur: "0:11" },
      { id: "yiro-sonidos", title: "Sonidos", desc: "Pruebas de sonidos sueltos frente al sistema.", dur: "0:25" },
    ],
  },
  {
    id: "testeo-1",
    title: "Testeo 1 · el registro del artista",
    phase: "Fase 03 · Ciclo 1",
    text: "Interpretación de Yiro con MyStrow. Declaró buscar misterio, movimiento y energía; valoró la correspondencia con 1 de 5.",
    anexo: "D",
    tone: "red",
    videos: [
      { id: "t1-ciberpunk", title: "Cyberpunk", desc: "Registro de la interpretación con MyStrow.", dur: "1:01" },
      { id: "t1-ciberpunk-2", title: "Cyberpunk · toma 2", desc: "Registro de la interpretación con MyStrow.", dur: "0:43" },
      { id: "t1-ciberpunk-3", title: "Cyberpunk · toma 3", desc: "Registro con la paleta del sistema en pantalla.", dur: "1:40" },
      { id: "t1-bpm", title: "Cyberpunk · modo BPM", desc: "El mismo tema con el sistema en modo BPM.", dur: "0:58" },
    ],
  },
  {
    id: "testeo-2",
    title: "Testeo 2 · sesión con el experto",
    phase: "Fase 03 · Ciclo 1",
    text: "Roberto Castrillón, profesional de iluminación, revisa el sistema comercial con equipos reales. Color 2 de 5, intensidad 2 de 5, ritmo de cambio 1 de 5.",
    anexo: "E",
    tone: "red",
    videos: [
      { id: "t2-01", title: "Sesión · parte 1", desc: "9 de octubre de 2026.", dur: "0:47" },
      { id: "t2-02", title: "Sesión · parte 2", desc: "Luminarias y simulador.", dur: "0:35" },
      { id: "t2-03", title: "Sesión · parte 3", desc: "Revisión de modos y efectos.", dur: "0:43" },
      { id: "t2-04", title: "Sesión · parte 4", desc: "Revisión de modos y efectos.", dur: "0:45" },
    ],
  },
  {
    id: "herramienta",
    title: "Desarrollo y pruebas de la herramienta",
    phase: "Fase 03 · Experimentación",
    text: "La herramienta propia operando los reflectores: análisis de la pieza por secciones, propuesta generada desde el prompt y versiones sucesivas hasta la experiencia.",
    anexo: "J",
    tone: "violet",
    videos: [
      { id: "herr-01", title: "Prueba · 15 oct", desc: "Registro del 15 de octubre de 2026.", dur: "2:43", vertical: true },
      { id: "herr-02", title: "Prueba · 15 oct, noche", desc: "Registro del 15 de octubre de 2026.", dur: "2:37" },
      { id: "herr-03", title: "Prueba · 16 oct", desc: "Registro del 16 de octubre de 2026.", dur: "3:14" },
      { id: "herr-04", title: "Prueba · 16 oct, 2", desc: "Registro del 16 de octubre de 2026.", dur: "2:28" },
      { id: "herr-05", title: "Prueba · 16 oct, 3", desc: "Registro del 16 de octubre de 2026.", dur: "2:03" },
      { id: "herr-06", title: "Prueba · 9 nov", desc: "Registro del 9 de noviembre de 2026.", dur: "2:28" },
    ],
  },
  {
    id: "testeo-5",
    title: "Testeo 5 · el experto ve la experiencia",
    phase: "Fase 04 · Ciclo 2",
    text: "El mismo experto revisa la experiencia sobre Renegade y da por coherentes los cuatro recursos que antes había señalado como fallidos.",
    anexo: "H",
    tone: "violet",
    videos: [{ id: "t5-01", title: "Revisión de la experiencia", desc: "10 de noviembre de 2026.", dur: "0:25" }],
  },
];

// Figura 8 y diapositiva 11: las veintidós entradas del prompt de «Renegade».
export type Color = "azul" | "verde" | "blanco" | "mixto";
export interface Cue {
  n: number;
  a: number;
  b: number;
  fade: string;
  rule: string;
  name: string;
  color: Color;
  level: number;
  fx: "static" | "breathe" | "pulse" | "strobe" | "follow" | "step";
  key?: boolean;
}

export const CUES: Cue[] = [
  { n: 1, a: 0, b: 13.7, fade: "f1", rule: "C+F follow_energy azul 20%", name: "construcción", color: "azul", level: 0.2, fx: "follow" },
  { n: 2, a: 13.7, b: 25.5, fade: "f.5", rule: "C+F pulse_onset azul 40%", name: "acusa recibo", color: "azul", level: 0.4, fx: "pulse" },
  { n: 3, a: 25.5, b: 39.2, fade: "f1", rule: "C breathe 40% + F pulse_onset 55%", name: "empieza el tema", color: "azul", level: 0.5, fx: "breathe" },
  { n: 4, a: 39.2, b: 53.7, fade: "f1", rule: "C breathe 50% + F pulse_onset 65%", name: "toma cuerpo", color: "azul", level: 0.6, fx: "pulse" },
  { n: 5, a: 53.7, b: 66.6, fade: "f2", rule: "C+F breathe azul 50%", name: "un solo aliento", color: "azul", level: 0.5, fx: "breathe" },
  { n: 6, a: 66.6, b: 80.9, fade: "f.5", rule: "C breathe + F pulse_onset, acelerando", name: "acumulación", color: "azul", level: 0.7, fx: "pulse" },
  { n: 7, a: 80.9, b: 83.9, fade: "f0", rule: "C+F strobe BLANCO 100%", name: "la ruptura", color: "blanco", level: 1, fx: "strobe", key: true },
  { n: 8, a: 83.9, b: 86, fade: "f0", rule: "C+F static azul 15%", name: "break · no rellenar", color: "azul", level: 0.15, fx: "static" },
  { n: 9, a: 86, b: 99, fade: "f.5", rule: "C strobe azul/verde + F breathe verde", name: "entra el verde", color: "mixto", level: 0.7, fx: "strobe", key: true },
  { n: 10, a: 99, b: 102, fade: "f1.5", rule: "C azul + F verde, fade in", name: "color dividido", color: "mixto", level: 0.5, fx: "static" },
  { n: 11, a: 102, b: 110.8, fade: "f.5", rule: "C pulse_onset azul + F strobe verde", name: "vuelve el cuerpo", color: "mixto", level: 0.75, fx: "pulse" },
  { n: 12, a: 110.8, b: 118.4, fade: "f1.5", rule: "C+F breathe verde 50%", name: "el valle · respiro", color: "verde", level: 0.5, fx: "breathe" },
  { n: 13, a: 118.4, b: 125.6, fade: "f0", rule: "C+F step_beat azul/verde", name: "a golpes", color: "mixto", level: 0.7, fx: "step" },
  { n: 14, a: 125.6, b: 168, fade: "f2", rule: "C breathe verde + F azul en LATIDO", name: "el centro", color: "mixto", level: 0.55, fx: "breathe", key: true },
  { n: 15, a: 168, b: 180, fade: "f1", rule: "respiración y latido en incremento", name: "el ascenso", color: "mixto", level: 0.7, fx: "breathe" },
  { n: 16, a: 180, b: 184.4, fade: "f.5", rule: "C+F strobe azul de 45 a 80%", name: "umbral", color: "azul", level: 0.65, fx: "strobe" },
  { n: 17, a: 184.4, b: 191, fade: "f0", rule: "C pulse_onset + F strobe, 90%", name: "clímax I", color: "mixto", level: 0.9, fx: "strobe" },
  { n: 18, a: 191, b: 197, fade: "f0", rule: "papeles invertidos, color por ataque", name: "clímax II", color: "mixto", level: 0.9, fx: "pulse" },
  { n: 19, a: 197, b: 198, fade: "f0", rule: "C+F static BLANCO 100%", name: "wash · liberación", color: "blanco", level: 1, fx: "static", key: true },
  { n: 20, a: 198, b: 207, fade: "f0", rule: "C pulse_onset + F strobe, 95%", name: "clímax III", color: "mixto", level: 0.95, fx: "strobe" },
  { n: 21, a: 207, b: 214, fade: "f0", rule: "papeles cada 2 s, pulso doblado", name: "escalada", color: "mixto", level: 0.9, fx: "step" },
  { n: 22, a: 214, b: 218.2, fade: "f0", rule: "C+F static BLANCO 100%", name: "fin · no blackout", color: "blanco", level: 1, fx: "static", key: true },
];
export const PIECE_LEN = 218.2;

export const ANEXOS: { l: string; t: string; d: string; url?: string }[] = [
  { l: "A", t: "Bitácora de las pruebas controladas del sistema comercial", d: "Registro del montaje con reflectores PAR LED e interfaz USB-DMX y de las pruebas con pistas grabadas y con señal en vivo.", url: "https://drive.google.com/drive/folders/1DmYrB7TNNPeToE09lJogUynatenT-ohT" },
  { l: "B", t: "Entrevista al creador de MyStrow", d: "Transcripción de la entrevista estructurada a Nicolas Prieto. Confirma que el sistema opera por reglas predefinidas.", url: "https://drive.google.com/drive/folders/1FTI5AJJk3d3CE_AhY4dTb1iCxITaWfkN" },
  { l: "C", t: "Letra de «Renegade», de Mahiro", d: "Transcripción literal del texto cantado, en inglés y en japonés.", url: "https://drive.google.com/drive/folders/1zGkEh5q5jrq88iTW0AiV0u6jEln9zk9z" },
  { l: "D", t: "Testeo 1 · Artista · Sistema comercial", d: "Formato de declaración de intención y lectura diligenciado por Yiro.", url: "https://drive.google.com/drive/folders/1eSMMBE4Dnu-p5plLdTiTvHuv8tKs-Ud0" },
  { l: "E", t: "Testeo 2 · Experto · Sistema comercial", d: "Formato de valoración diligenciado por Roberto Castrillón.", url: "https://drive.google.com/drive/folders/1QLLTcDqLfNzAPZQFzwnRD6AAZIzCfjF4" },
  { l: "F", t: "Testeo 3 · Usuario · Sistema comercial", d: "Respuestas del formulario en línea, trece participantes, sin editar.", url: "https://drive.google.com/drive/folders/10oJlF28yEVlXucabKbVk1L1nZiVZxwA7" },
  { l: "G", t: "Testeo 4 · Artista · Herramienta propia", d: "Parte A respondida solo con el audio y parte B después de ver la iluminación.", url: "https://drive.google.com/drive/folders/142tXftz7SYY9o52F3Ts5v9CvHd0kwtFW" },
  { l: "H", t: "Testeo 5 · Experto · Herramienta propia", d: "Valoración de Roberto Castrillón sobre la experiencia construida con la herramienta.", url: "https://drive.google.com/drive/folders/13y8oAa4peQ6haaRcBN4MOkTn1ZmU_3ia" },
  { l: "I", t: "Testeo 6 · Usuario · Herramienta propia", d: "Respuestas del formulario en línea, diez participantes, sin editar.", url: "https://drive.google.com/drive/folders/1mxykgCIcRg8Q4F5a-Vi21lNJDdET6L-N" },
  { l: "J", t: "Desarrollo y pruebas de la herramienta", d: "Registro del desarrollo, capturas del análisis por secciones y versiones sucesivas del prompt.", url: "https://drive.google.com/drive/folders/10hKne0lnCMNK53BEB_WlrtvEOz8IGcT-" },
  { l: "K", t: "Prompt de «Renegade»", d: "Las veintidós entradas que cubren los 218,2 segundos de la pieza, con sus versiones anteriores." },
  { l: "L", t: "Registro audiovisual de la experiencia", d: "Video de la experiencia escénica sobre «Renegade», producto final del proyecto.", url: "https://drive.google.com/drive/folders/1ctOeLLAuut6Az4lwh0hcOYkauNClHiNb" },
  { l: "M", t: "Hoja de vida y portafolio", d: "Kevin Daniel Guzmán Bernal.", url: "https://drive.google.com/drive/folders/1UXflZsbxVgFmQVZr1oP2nqjDouDq-ilQ?usp=sharing" },
];

export const group = (id: string) => PROCESO.find((g) => g.id === id)!;
export const anexo = (l: string) => ANEXOS.find((a) => a.l === l)!;

export const FORMS_T3 = [
  { src: driveImage(IMAGE_IDS["t3-1"], 2000), n: "T3", kicker: "Testeo 3 · formulario", title: "¿Con qué frecuencia ves o escuchas Loopstation?", w: 2196, h: 924, form: true },
  { src: driveImage(IMAGE_IDS["t3-2"], 2000), n: "T3", kicker: "Testeo 3 · formulario", title: "¿Hubo algún momento en que la luz no iba con lo que escuchabas?", w: 2196, h: 924, form: true },
];
export const FORMS_T6 = [
  { src: driveImage(IMAGE_IDS["t6-1"], 2000), n: "T6", kicker: "Testeo 6 · formulario", title: "¿Hace cuánto sigues el beatbox o el Loopstation?", w: 2196, h: 924, form: true },
  { src: driveImage(IMAGE_IDS["t6-2"], 2000), n: "T6", kicker: "Testeo 6 · formulario", title: "¿Qué tanto sentiste que la iluminación iba con la música?", w: 2196, h: 924, form: true },
  { src: driveImage(IMAGE_IDS["t6-3"], 2000), n: "T6", kicker: "Testeo 6 · formulario", title: "¿La iluminación te ayudó a notar los cambios del tema?", w: 2196, h: 996, form: true },
  { src: driveImage(IMAGE_IDS["t6-4"], 2000), n: "T6", kicker: "Testeo 6 · formulario", title: "¿Hubo algún momento en que la luz te pareciera fuera de lugar?", w: 2196, h: 924, form: true },
];
