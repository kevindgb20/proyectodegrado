import { IMAGE_IDS, driveImage } from "@/lib/drive";
import ImageGrid, { type Img } from "./ImageViewer";
import { SectionHead } from "./ui";

const SLIDES: Img[] = [
  { src: "/media/img/01-planteamiento.png", n: "01", kicker: "Planteamiento", title: "El problema" },
  { src: "/media/img/02-metodologia.png", n: "02", kicker: "Metodología", title: "Cómo se investiga" },
  { src: "/media/img/03-usuario-y-actores.png", n: "03", kicker: "Usuario", title: "Quién evalúa, y por qué" },
  { src: "/media/img/04-momentos-significativos.png", n: "04", kicker: "Desarrollo", title: "Lo que pasó, paso a paso" },
  { src: "/media/img/05-roadmap-y-testeos.png", n: "05", kicker: "Roadmap", title: "Planificación y testeos" },
  { src: "/media/img/06-conclusiones.png", n: "06", kicker: "Cierre", title: "Conclusiones" },
  { src: "/media/img/07-mystrow-hallazgos.png", n: "07", kicker: "Línea base", title: "MyStrow · los hallazgos" },
  { src: "/media/img/08-loopstation.png", n: "08", kicker: "Formato", title: "El Loopstation" },
  { src: "/media/img/09-la-herramienta.png", n: "09", kicker: "Herramienta", title: "De los hallazgos al sistema" },
  { src: "/media/img/10-mahiro-renegade.png", n: "10", kicker: "Producto", title: "Mahiro · Renegade" },
  { src: driveImage(IMAGE_IDS["11-el-prompt"], 1920), n: "11", kicker: "Prompt", title: "Las decisiones de diseño" },
  { src: "/media/img/12-testeos-antes-despues.png", n: "12", kicker: "Resultados", title: "Los seis testeos · antes y después" },
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
