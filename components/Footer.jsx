"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

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

  return (
    <footer
      ref={footerRef}
      className="bg-black/40 text-white py-16 px-6 rounded-t-[40px] border-t border-[#13adff] rounded-b-[40px] border-b overflow-hidden relative"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-[#13adff]">OsmanDev</h2>
          <p className="text-white/70 mt-2 leading-relaxed">
            Crafting modern web experiences. Let’s build something amazing together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2 text-[#13adff]">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-[#0caaff] transition">Home</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-[#0caaff] transition">Projects</a>
            </li>
            <li>
              <a href="#about" className="hover:text-[#0caaff] transition">About</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#0caaff] transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2 text-[#13adff]">Contact</h3>
          <p>📧 <a href="mailto:osmangonidevx@gmail.com" className="hover:underline">osmangonidevx@gmail.com</a></p>
          <p>📱 <a href="tel:+8801874787550" className="hover:underline">+880 1874-787550</a></p>
          <p>📍 Chittagong, Bangladesh</p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-2 text-[#13adff]">Follow Me</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.linkedin.com/in/osman-goni-devx" target="_blank" rel="noreferrer" className="hover:text-[#0caaff] transition">
              LinkedIn
            </a>
            <a href="https://github.com/osman-devx" target="_blank" rel="noreferrer" className="hover:text-[#0caaff] transition">
              GitHub
            </a>
            <a href="https://twitter.com/osman-devx" target="_blank" rel="noreferrer" className="hover:text-[#0caaff] transition">
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="text-center text-white/50 mt-12 text-sm">
        ⚡ © 2025 Osman. All rights reserved.
      </p>
    </footer>
  );
}
