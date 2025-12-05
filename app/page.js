import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import RecentProjects from "@/components/RecentProjects";
import Services from "@/components/Services";

export default function Home() {
  return (
   <main className="bg-[#0B0F1A] backdrop-blur-lg bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url()" }}>
  <Navbar />

  <section id="header" className="bg-white rounded-b-[80px] shadow-xl">
    <Header />
  </section>

  <section id="projects">
    <RecentProjects />
  </section>

  <section id="services">
    <Services />
  </section>

  <section id="about">
    <About />
  </section>

  <section id="contact">
    <Contact />
  </section>

  <Footer />
</main>

  );
}
