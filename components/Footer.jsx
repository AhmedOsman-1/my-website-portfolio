"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Linkedin, Github, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  // Smooth scroll handler
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // height of navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  // Reusable Quick Links
  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-black/40 text-white py-4 rounded-t-[30px] border-t border-[#13adff] overflow-hidden relative"
      style={{ backgroundImage: "url('/bg-card.jpeg')" }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-3xl font-bold text-[#00a6ff]">Osman.G</h2>
          <p className="text-white/70 mt-3 leading-relaxed">
            I craft modern web experiences people love. <br />
            Let’s build something extraordinary together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-[#13adff]">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleScrollTo(link.id)}
                  className="hover:text-[#0caaff] transition-colors duration-200"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4 text-[#13adff]">Contact</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <a
                href="mailto:osmangonidevx@gmail.com"
                className="hover:underline"
              >
                osmangonidevx@gmail.com
              </a>
            </li>
            <li>
              Phone :{" "}
              <a href="tel:+8801874787550" className="hover:underline">
                +880 1874-787550
              </a>
            </li>
            <li>Location : Chittagong, Bangladesh</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-4 text-[#13adff]">Follow Me</h3>
          <div className="flex flex-col space-y-4 mt-2">
            <a
              href="https://www.linkedin.com/in/osman-goni-dev/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#0caaff] transition-colors duration-200 flex items-center gap-1"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href="https://github.com/AhmedOsman-1"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#0caaff] transition-colors duration-200 flex items-center gap-1"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://twitter.com/osman-devx"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#0caaff] transition-colors duration-200 flex items-center gap-1"
            >
              <Twitter size={18} /> Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="text-center text-white/50 mt-12 text-sm">
        © 2025 OsmanDev. All rights reserved.
      </p>
    </footer>
  );
}
