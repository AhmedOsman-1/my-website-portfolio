import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      {/* Navbar always on black bg */}
      <Navbar />

      {/* Header section white bg with bottom rounded */}
      <section className="bg-white rounded-b-[80px]">
        <Header />
      </section>
      <Services />

    </main>
  );
}
