"use client";

import { infoList } from "@/database";
import { toolsData } from "@/public/assets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import AccordionItems from "./AccordionItems";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

// Reusable LinkButton for internal/external links
const LinkButton = ({ href, children, external = false, className = "" }) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 hover:text-[#13adff] ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`transition-colors duration-300 hover:text-[#13adff] ${className}`}>
      {children}
    </Link>
  );
};

const About = () => {
  const headingRef = useRef(null);
  const profileRef = useRef(null);
  const descriptionRef = useRef(null);
  const infoRefs = useRef([]);
  const toolsRef = useRef(null);
  const accordionRef = useRef(null);

  useEffect(() => {
    const fadeIn = (element, opts = {}) => {
      if (!element) return;
      gsap.fromTo(
        element,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 85%" },
          ...opts,
        }
      );
    };

    fadeIn(headingRef.current);
    fadeIn(profileRef.current, { y: -40 });
    fadeIn(descriptionRef.current, { y: 40 });
    fadeIn(toolsRef.current);
    fadeIn(accordionRef.current);

    infoRefs.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        }
      );
    });
  }, []);

  const brand = "hsl(var(--accent))";
  const cardBg = "bg-[hsl(var(--card)/0.95)]";
  const softBorder = "border border-[hsl(var(--accent)/0.15)]";
  const softShadow = "shadow-[0_10px_30px_rgba(0,0,0,0.2)]";

  return (
    <section
      id="about"
      className="mt-16 scroll-mt-24 rounded-[30px] border-b border-t border-[#13adff] mb-12 px-4 py-10 sm:px-6 sm:py-14 md:px-10 lg:px-16 lg:py-20"
    >
      {/* Heading */}
      <div ref={headingRef} className="mx-auto mb-20 max-w-3xl text-center space-y-2">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase" style={{ color: brand }}>
          Hey there!
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-Bebas tracking-wide text-[hsl(var(--foreground))]">
          I’m Osman
        </h2>

        <p className="text-sm sm:text-base text-[hsl(var(--muted-foreground)/0.8)]">
          A front-end developer who loves building interfaces that feel natural and fun to use.
        </p>
      </div>

      {/* Main Container */}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        {/* Profile Card */}
        <aside
          ref={profileRef}
          className={`w-full max-w-sm mx-auto lg:mx-0 rounded-3xl ${softBorder} ${cardBg} ${softShadow} p-5 sm:p-6 flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-lg`}
        >
          <div className="relative mb-5 w-full overflow-hidden rounded-2xl">
            <Image
              src="/profile-2.png"
              width={500}
              height={500}
              alt="Osman – Front-end Engineer"
              className="h-auto w-full object-cover"
            />
            <LinkButton href="/contact" className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs sm:text-sm font-medium shadow-md bg-[#13adff] text-[hsl(var(--background))] hover:text-white" >
              Available for projects
            </LinkButton>
          </div>

          <div className="mb-3 flex items-center gap-3 sm:gap-4">
            <h3 className="text-3xl sm:text-4xl font-Bebas tracking-wide text-[hsl(var(--foreground))]">Osman</h3>
            <div className="flex gap-2 sm:gap-3">
              <LinkButton href="https://www.linkedin.com/in/osman-goni-devx" external>
                <Image src="/Linkedin.png" width={24} height={24} alt="LinkedIn" className="opacity-80 hover:opacity-100 transition" />
              </LinkButton>
              <LinkButton href="https://github.com/AhmedOsman-1" external>
                <Image src="/github.png" width={24} height={24} alt="GitHub" className="opacity-80 hover:opacity-100 transition" />
              </LinkButton>
            </div>
          </div>

          <p className="text-sm sm:text-base font-medium" style={{ color: brand }}>
            Front-End Developer · React & Next.js
          </p>

          <p className="mt-2 text-sm sm:text-base text-[hsl(var(--muted-foreground)/0.8)] text-center transition-colors duration-300 hover:text-[#13adff]">
            I craft clean, fast, and friendly interfaces for web apps and landing pages.
          </p>

          <Button asChild variant="outline" className={`mt-4 w-full rounded-2xl border border-[hsl(var(--accent)/0.2)] text-black hover:bg-[hsl(var(--accent))] bg-[hsl(var(--accent))] hover:text-white transition`}>
            <Link href="/contact">Let’s chat!</Link>
          </Button>
        </aside>

        {/* Right Column */}
        <div className="flex-1 space-y-6 sm:space-y-8">
          {/* Description Box */}
          <div ref={descriptionRef} className={`rounded-3xl ${cardBg} ${softBorder} ${softShadow} p-4 sm:p-6 transform transition-transform hover:scale-[1.02] hover:shadow-lg mb-14`}>
            <p className="text-base sm:text-lg leading-relaxed text-[hsl(var(--foreground))] transition-colors duration-300 hover:text-[#13adff]">
              With <span className="font-semibold">2 years of focused front-end experience</span>, I make sure interfaces feel intuitive, fast, and just a little bit delightful.
            </p>

            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[hsl(var(--muted-foreground)/0.8)] transition-colors duration-300 hover:text-[#13adff]">
              Clean code, reusable components, and micro-interactions are my baseline—making every project enjoyable for users.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {infoList.map(({ title, description, img }, i) => (
              <div
                key={i}
                ref={(el) => (infoRefs.current[i] = el)}
                className={`flex flex-col gap-2 sm:gap-3 rounded-3xl ${cardBg} ${softBorder} p-4 sm:p-5 transform transition-transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md`}
              >
                <div className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full" style={{ backgroundColor: "hsl(var(--accent)/0.15)" }}>
                  <Image src={img} width={28} height={28} alt={title} />
                </div>

                <h3 className="text-base sm:text-sm font-semibold text-[hsl(var(--foreground))] transition-colors duration-300 hover:text-[#13adff]">{title}</h3>
                <p className="text-xs sm:text-sm text-[hsl(var(--muted-foreground)/0.8)] transition-colors duration-300 hover:text-[#13adff]">{description}</p>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="pt-3 sm:pt-4">
            <h4 ref={toolsRef} className="mb-2 sm:mb-3 text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground)/0.6)]">
              Tools behind the craft
            </h4>

            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {toolsData.map((tool, index) => (
                <li key={index} className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl ${cardBg} ${softBorder} ${softShadow} transform transition-transform hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-md`}>
                  <Image src={tool} alt="tool" width={28} height={28} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div ref={accordionRef} className={`mt-10 sm:mt-14 rounded-3xl ${cardBg} ${softBorder} ${softShadow} p-5 sm:p-6 transform transition-transform hover:scale-[1.01] hover:shadow-lg`}>
        <AccordionItems />
      </div>
    </section>
  );
};

export default About;
