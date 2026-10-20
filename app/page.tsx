import Ambient from "@/components/Ambient";
import Director from "@/components/Director";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Nav from "@/components/Nav";
import Numbers from "@/components/Numbers";
import Pipeline from "@/components/Pipeline";
import Roles from "@/components/Roles";
import Safety from "@/components/Safety";
import Translation from "@/components/Translation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Ambient />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Pipeline />
        <Roles />
        <Director />
        <Translation />
        <Numbers />
        <Safety />
      </main>
      <Footer />
    </>
  );
}
