"use client";

import { infoList } from "@/database";
import { toolsData } from "@/public/assets";
import Image from "next/image";
import Link from "next/link";
import AccordionItems from "./AccordionItems";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
          ...opts,
        }
      );
    };

    fadeIn(headingRef.current);
    fadeIn(profileRef.current, { x: -40 });
    fadeIn(descriptionRef.current, { x: 40 });
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
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  const brand = "#FF7800";
  const cardBg = "bg-[#0E0E0E]"; // deep dark but not flat black
  const softBorder = "border border-white/5";
  const softShadow = "shadow-[0_20px_60px_rgba(0,0,0,0.45)]";

  return (
    <section
      id="about"
      className="mt-20 scroll-mt-24 rounded-[40px] bg-[#0A0A0A] border border-white/5 px-6 py-14 md:px-10 lg:px-16 lg:py-20"
    >
      {/* Heading */}
      <div ref={headingRef} className="mx-auto mb-12 max-w-3xl text-center space-y-2">
        <p className="text-xs font-semibold tracking-[0.28em] uppercase" style={{ color: brand }}>
          Introduction
        </p>

        <h2 className="text-4xl md:text-5xl font-Bebas tracking-wide text-white">
          Who am I?
        </h2>

        <p className="text-sm md:text-base text-gray-300">
          A front-end developer focused on building conversion-driven interfaces that feel effortless.
        </p>
      </div>

      {/* Main Container */}
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Profile Card */}
        <aside
          ref={profileRef}
          className={`w-full max-w-sm mx-auto lg:mx-0 rounded-3xl ${softBorder} ${cardBg} ${softShadow} p-6 flex flex-col items-center text-center`}
        >
          <div className="relative mb-6 w-full overflow-hidden rounded-2xl">
            <Image
              src="/profile.png"
              width={500}
              height={500}
              alt="Osman – Front-end Engineer"
              className="h-auto w-full object-cover"
            />

            <span
              style={{ backgroundColor: brand }}
              className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-medium text-black shadow-lg"
            >
              Available for projects
            </span>
          </div>

          {/* Name + Socials */}
          <div className="mb-3 flex items-center gap-4">
            <h3 className="text-4xl font-Bebas tracking-wide text-white">Osman</h3>
            <div className="flex gap-3">
              <Link href="https://www.linkedin.com/in/osman-goni-devx" target="_blank">
                <Image src="/Linkedin2.png" width={26} height={26} alt="LinkedIn" className="opacity-80 hover:opacity-100 transition" />
              </Link>
              <Link href="https://github.com/AhmedOsman-1" target="_blank">
                <Image src="/github.png" width={26} height={26} alt="GitHub" className="opacity-80 hover:opacity-100 transition" />
              </Link>
            </div>
          </div>

          <p className="text-sm font-medium" style={{ color: brand }}>
            Front-End Developer · React & Next.js
          </p>

          <p className="mt-3 text-sm text-gray-300">
            Crafting clean, fast, and scalable interfaces for SaaS, landing pages, and dashboards.
          </p>

          <Button
            asChild
            variant="outline"
            className="mt-5 w-full rounded-2xl border border-white/10 text-white hover:bg-[#FF7800] hover:text-black transition"
          >
            <Link href="/contact">Book a project call</Link>
          </Button>
        </aside>

        {/* Right Column */}
        <div className="flex-1 space-y-8">
          {/* Description Box */}
          <div ref={descriptionRef} className={`rounded-3xl ${cardBg} ${softBorder} ${softShadow} p-6`}>
            <p className="text-base md:text-lg leading-relaxed text-gray-200">
              With around <span className="font-semibold text-white">2 years of focused front-end experience</span>,
              my priority is simple: ship interfaces that feel premium, load fast, and convert better.
            </p>

            <p className="mt-3 text-sm text-gray-400">
              Clean architecture, reusable components, and micro-interactions —
              not optional, but the baseline for every project.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {infoList.map(({ title, description, img }, i) => (
              <div
                key={i}
                ref={(el) => (infoRefs.current[i] = el)}
                className={`flex flex-col gap-3 rounded-3xl ${cardBg} ${softBorder} p-5 ${softShadow} hover:-translate-y-1 transition`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                     style={{ backgroundColor: brand + "22" }}>
                  <Image src={img} width={32} height={32} alt={title} />
                </div>

                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="text-sm text-gray-300">{description}</p>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="pt-4">
            <h4 ref={toolsRef} className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">
              Tools behind the craft
            </h4>

            <ul className="flex flex-wrap justify-center gap-3 md:gap-4">
              {toolsData.map((tool, index) => (
                <li
                  key={index}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cardBg} ${softBorder} ${softShadow} hover:-translate-y-0.5 transition md:h-14 md:w-14`}
                >
                  <Image src={tool} alt="tool" width={32} height={32} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div
        ref={accordionRef}
        className={`mt-14 rounded-3xl ${cardBg} ${softBorder} ${softShadow} p-6`}
      >
        <AccordionItems />
      </div>
    </section>
  );
};

export default About;
