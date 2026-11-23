import { IMAGE_IDS, driveImage } from "@/lib/drive";
import ImageGrid, { type Img } from "./ImageViewer";
import { SectionHead } from "./ui";

const SLIDES: Img[] = [
  { src: driveImage(IMAGE_IDS["01-planteamiento"], 1920), n: "01", kicker: "Planteamiento", title: "El problema" },
  { src: driveImage(IMAGE_IDS["02-metodologia"], 1920), n: "02", kicker: "Metodología", title: "Research through design" },
  { src: driveImage(IMAGE_IDS["03-usuario-y-actores"], 1920), n: "03", kicker: "Usuario", title: "El usuario y los actores" },
  { src: driveImage(IMAGE_IDS["04-momentos-significativos"], 1920), n: "04", kicker: "Desarrollo", title: "Momentos significativos" },
  { src: driveImage(IMAGE_IDS["05-roadmap-y-testeos"], 1920), n: "05", kicker: "Roadmap", title: "Planificación y testeos" },
  { src: driveImage(IMAGE_IDS["06-conclusiones"], 1920), n: "06", kicker: "Cierre", title: "Conclusiones" },
  { src: driveImage(IMAGE_IDS["07-mystrow-hallazgos"], 1920), n: "07", kicker: "Línea base", title: "MyStrow · los hallazgos" },
  { src: driveImage(IMAGE_IDS["08-loopstation"], 1920), n: "08", kicker: "Formato", title: "El Loopstation" },
  { src: driveImage(IMAGE_IDS["09-la-herramienta"], 1920), n: "09", kicker: "Herramienta", title: "De los hallazgos al sistema" },
  { src: driveImage(IMAGE_IDS["10-mahiro-renegade"], 1920), n: "10", kicker: "Producto", title: "Mahiro · Renegade" },
  { src: driveImage(IMAGE_IDS["11-el-prompt"], 1920), n: "11", kicker: "Prompt", title: "Las decisiones de diseño" },
  { src: driveImage(IMAGE_IDS["12-testeos-antes-despues"], 1920), n: "12", kicker: "Resultados", title: "Los seis testeos · antes y después" },
].map((x) => ({ ...x, w: 1920, h: 1080 }));

export default function Galeria() {
  return (
    <section className="section" id="imagenes">
      <SectionHead
        kicker="Material gráfico"
        title="Imágenes"
        lead="Las doce piezas gráficas del proyecto. Toca cualquiera para verla en grande; usa las flechas del teclado o desliza para pasar de una a otra."
      />
      <ImageGrid list={SLIDES} />
    </section>
  );
}
