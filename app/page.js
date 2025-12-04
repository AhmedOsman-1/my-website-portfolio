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

      
      <section className="bg-white rounded-b-[80px] shadow-xl">
        <Header />
      </section>
      <RecentProjects />
      <Services />
      <About />
      <Contact /> 
      <Footer />
    </main>
  );
}
