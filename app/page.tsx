import Ambient from "@/components/Ambient";
import Anexos from "@/components/Anexos";
import Cierre from "@/components/Cierre";
import Footer from "@/components/Footer";
import Galeria from "@/components/Galeria";
import Hero from "@/components/Hero";
import Herramienta from "@/components/Herramienta";
import Intro from "@/components/Intro";
import Manifesto from "@/components/Manifesto";
import Metodologia from "@/components/Metodologia";
import Nav from "@/components/Nav";
import Planteamiento from "@/components/Planteamiento";
import Resultados from "@/components/Resultados";
import Videos from "@/components/Videos";

export default function Home() {
  return (
    <>
      <Ambient />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Intro />
        <Planteamiento />
        <Metodologia />
        <Resultados />
        <Herramienta />
        <Cierre />
        <Videos />
        <Galeria />
        <Anexos />
      </main>
      <Footer />
    </>
  );
}
