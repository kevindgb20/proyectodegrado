# Landing · IA Iluminación

Página de presentación del proyecto *Experiencia de traducción sonora en iluminación escénica apoyada con
inteligencia artificial*. Next.js 15 (App Router) + TypeScript, sin dependencias de UI: los efectos son canvas y CSS.

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Efectos
- **Escenario en el hero** (`components/StageCanvas.tsx`): haces volumétricos, charcos de luz en el suelo y polvo
  que sólo se ve dentro de los haces. Cada luz tiene el papel de la app (principal, acompañamiento, acentos, fondo)
  y el haz central es un seguidor que apunta al cursor.
- **Señal de audio compartida** (`lib/audio.ts`): por defecto, una actuación simulada a 100 BPM (voz → groove →
  build → clímax → break…); con «Tocar con tu micrófono» analiza el micrófono real (graves, medios y agudos, golpes y
  estado por votación). Todos los efectos leen el mismo frame.
- HUD en vivo, lámparas de papeles, director autónomo que resalta el estado detectado, propuesta JSON que se escribe
  sola y universo DMX de 512 canales con gamma 2,2 (pasa el cursor para ver canal y valor).
- Manifiesto que se enciende palabra a palabra con el scroll, fader DMX como barra de progreso, foco que sigue al
  cursor y grano de película. Respeta `prefers-reduced-motion`.
