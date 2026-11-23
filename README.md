# Landing · Del sonido a la luz

Espacio detallado del proyecto de grado *Del sonido a la luz: experiencia de traducción sonora en iluminación escénica
apoyada con inteligencia artificial* (Kevin Daniel Guzmán Bernal · UCMC · Diseño Digital y Multimedia · 2026).
Todo el contenido sale del libro oficial (`Proyecto de grado/Libro_digital/Libro_IMPRENTA.pdf`) y de sus anexos.

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Estructura (el orden del libro)
01 Información general · 02 Resumen ejecutivo · 03 Justificación · 04 Planteamiento · 05 Objetivos · 06 Metodología ·
07 Resultados (primer ciclo, seis testeos, segundo ciclo, herramienta y experiencia) · 08 Reflexión · 09 Conclusiones ·
Videos · Imágenes · 10 Referencias. Los anexos A–M y sus videos van junto a la parte que documentan.

## Material
Videos, formatos e imágenes de los anexos se sirven desde las carpetas compartidas de **Google Drive** del libro. Los IDs
están en `lib/drive.ts`. Si una carpeta deja de ser pública, su material deja de verse en la página.

Aún no están en Drive y se sirven desde `public/media/`: los videos `resultado`, `proceso`, `mvp` y `renegade-gbb25`,
once piezas gráficas y el libro en PDF. Para pasar un video, se añade su ID en `VIDEO_IDS` (excepto `renegade-gbb25`:
el mapa del prompt necesita un archivo propio, porque el reproductor de Drive no informa en qué segundo va).

`Proyecto de grado/` guarda los originales; la página no la usa.

## Efectos
Escenario con haces y silueta del intérprete en la portada; texto que se enciende con el scroll; capas del Loopstation
que caen en bucle; luces PAR que reaccionan al micrófono («esto es reaccionar»); árbol de problemas que se invierte en
árbol de objetivos; objetivos desplegables; In-Out interactivo; tarjetas de testeos que se voltean; comparación de
recursos del experto antes y después; gráficas con los datos reales de los formularios; **mapa del prompt sincronizado
con Renegade** (22 entradas, dos reflectores simulados); visor de videos y de imágenes a pantalla completa.
