"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Lock/unlock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Detect scroll
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const navItems = ["Projects", "About", "Services"];

  // Scroll to section
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // height of navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Background Logo */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] pointer-events-none">
        <Image src="/bg-logo.jpeg" height={500} width={1000} alt="background logo" />
      </div>

      {/* Navbar */}
      <nav
        className={`w-full mt-2 fixed top-0 left-0 px-5 lg:px-8 xl:px-[8%] flex items-center justify-between z-50 transition-all duration-300
        ${isScrolled ? "bg-white/60 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" width={130} height={120} alt="logo" priority />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 px-10 py-2 bg-white/60 backdrop-blur-md border border-gray-200 rounded-full shadow-sm">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => handleScrollTo(item.toLowerCase())}
                className="font-Poppins relative group"
              >
                {item}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#00a6ff] transition-all group-hover:w-full"></span>
              </button>
            </li>
          ))}
          <li>
            <Link href="/contact" className="font-Poppins relative group">
              Contact
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#00a6ff] transition-all group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Image src="/nightMode.png" width={20} height={20} alt="night mode" />
          </button>

          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-3 btn-primary px-8 py-2.5"
          >
            Let&apos;s Talk
            <Image src="/arrowRight.png" width={20} height={20} alt="arrow" />
          </Link>

          {/* Mobile Button */}
          <button className="block md:hidden ml-3" onClick={() => setMenuOpen(true)}>
            <Image src="/menu2.png" width={24} height={24} alt="Menu" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/10 backdrop-blur-sm flex justify-center items-start">
          <div className="bg-white w-4/5 max-w-sm mt-16 rounded-xl shadow-xl flex flex-col items-center overflow-y-auto max-h-[80vh]">
            
            {/* Close Button */}
            <div className="flex justify-end w-full px-4 py-4">
              <button onClick={() => setMenuOpen(false)}>
                <Image src="/close-black.png" width={28} height={28} alt="close" className="w-7" />
              </button>
            </div>

            {/* Mobile Nav */}
            <ul className="flex flex-col items-center w-full mt-2">
              {navItems.map((item) => (
                <li key={item} className="w-full border-b border-gray-200 text-center py-3">
                  <button
                    onClick={() => handleScrollTo(item.toLowerCase())}
                    className="font-Poppins text-lg hover:text-[#00a6ff] transition"
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li className="w-full border-b border-gray-200 text-center py-3">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="font-Poppins text-lg hover:text-[#00a6ff] transition"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile CTA */}
            <div className="w-3/4 my-6 text-center">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary px-6 py-3 w-full text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
