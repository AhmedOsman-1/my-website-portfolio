"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Background Shape */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] pointer-events-none">
        <Image
          src="/bg-logo.png"
          height={500}
          width={1000}
          alt="background logo"
        />
      </div>

      {/* Navbar */}
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] flex items-center justify-between z-50 transition-all duration-300
        ${isScrolled ? "bg-white/60 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={130}
            height={120}
            alt="logo"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <ul
          className="hidden mt-1 md:flex items-center gap-8 px-10 py-2 bg-white/60 backdrop-blur-md 
          border border-gray-200 rounded-full shadow-sm"
        >
          {["Projects", "About", "Services", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="font-Poppins relative group"
              >
                {item}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#00a6ff] transition-all group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Image
              className="w-6"
              src="/nightMode.png"
              width={20}
              height={20}
              alt="night mode"
            />
          </button>

          <Link
            className="hidden lg:flex items-center gap-3  btn-primary px-8 py-2.5"
            href="/contact"
          >
            Let&#39;s Talk
            <Image src="/arrowRight.png" width={20} height={20} alt="arrow" />
          </Link>

          <button
            className="block md:hidden ml-3"
            onClick={() => setMenuOpen(true)}
          >
            <Image
              className="w-6"
              src="/menu2.png"
              width={24}
              height={24}
              alt="Menu"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-full w-full flex justify-center items-start z-[60] pointer-events-auto bg-black/10 backdrop-blur-sm transition-opacity duration-300">
          <div
            className="bg-white w-4/5 max-w-sm mt-16 rounded-xl shadow-xl flex flex-col items-center overflow-hidden 
            transform transition-transform duration-300 ease-out scale-95 opacity-0 animate-slideIn"
          >
            <div className="flex justify-end w-full px-4 py-4">
              <button onClick={() => setMenuOpen(false)}>
                <Image
                  src="/close-black.png"
                  width={28}
                  height={28}
                  alt="cancel"
                  className="w-7"
                />
              </button>
            </div>

            <ul className="flex flex-col items-center w-full mt-2">
              {["Projects", "Services", "About"].map((item) => (
                <li
                  key={item}
                  className="w-full border-b border-gray-200 text-center py-3"
                >
                  <Link
                    onClick={() => setMenuOpen(false)}
                    className="font-Poppins text-lg hover:text-[#00a6ff] transition"
                    href={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="w-3/4 my-6 text-center">
              <Link
                onClick={() => setMenuOpen(false)}
                href="/contact"
                className="btn-primary px-6 py-3 w-full text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Let&#39;s Talk
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
