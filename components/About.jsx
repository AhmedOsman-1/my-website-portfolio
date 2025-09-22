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
  // Refs
  const headingRef = useRef(null);
  const profileRef = useRef(null);
  const descriptionRef = useRef(null);
  const infoRefs = useRef([]);
  const toolsRef = useRef(null);
  const accordionRef = useRef(null);

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    }

    // Profile card animation
    if (profileRef.current) {
      gsap.fromTo(
        profileRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: profileRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }

    // Description card animation
    if (descriptionRef.current) {
      gsap.fromTo(
        descriptionRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }

    // Info cards animation
    infoRefs.current.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    });

    // Tools animation
    if (toolsRef.current) {
      gsap.fromTo(
        toolsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: toolsRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    }

    // Accordion animation
    if (accordionRef.current) {
      gsap.fromTo(
        accordionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: accordionRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section className=" rounded-[50px] border border-white/30 bg-white shadow-xl mt-12 w-full px-[10%] py-16 scroll-mt-20 overflow-hidden" >
      {/* Section Header */}
      <div className="text-center mb-12" ref={headingRef}>
        <h4 className="text-lg font-Poppins text-black mb-2">Introduction</h4>
        <h2 className="text-5xl font-Bebas font-bold text-slate-900">Who am I?</h2>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        {/* Profile Card */}
        <div
          ref={profileRef}
          className="border border-gray-200 rounded-3xl p-6 flex flex-col items-center text-center  shadow-lg transition-transform duration-500 hover:scale-105 w-full sm:w-[350px] lg:w-[400px] mx-auto"
        >
          <Image
            src="/pic54.png"
            width={500}
            height={500}
            alt="King of Front End"
            className="rounded-3xl w-full mb-4"
          />
          <div className="flex items-center gap-4 mb-2">
            <p className="text-5xl font-Bebas text-zinc-900">Osman</p>
            <div className="flex gap-3">
              <Link href="https://www.linkedin.com/in/osman-goni-devx " target="_blank">
                <Image
                  src="/Linkedin2.png"
                  width={28}
                  height={28}
                  alt="LinkedIn"
                  className="hover:scale-110 transition-transform duration-300"
                />
              </Link>
              <Link href="https://github.com/AhmedOsman-1" target="_blank">
                <Image
                  src="/github.png"
                  width={28}
                  height={28}
                  alt="GitHub"
                  className="hover:scale-110 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
          <p className="text-slate-700  font-Poppins text-lg ">Front-End Developer</p>
          <Button
            variant="outline"
            className="mt-4 hover:scale-105 transition-transform duration-300"
            href="/contact"
          >
            Book Appointment
          </Button>
        </div>

        {/* Description + Languages/Projects */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Description Card */}
          <div
            ref={descriptionRef}
            className="border border-gray-200 rounded-3xl p-6 flex flex-col items-center text-center shadow-lg transition-transform duration-500 hover:scale-105 w-full mx-auto"
          >
            <p className="text-slate-900 font-Poppins text-lg leading-relaxed max-w-3xl">
              Hey there! I love coding. With 2 years of experience, I bring not just skills but a constant
              hunger to learn and improve. I craft beautiful, performant, and scalable front-end solutions.
            </p>
          </div>

          {/* Languages & Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
            {infoList.map(({ title, description, img }, index) => (
              <div
                key={index}
                ref={(el) => (infoRefs.current[index] = el)}
                className="border border-gray-200 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105 w-full max-w-[500px] mx-auto"
              >
                <Image src={img} width={50} height={50} alt={title} className="mb-4" />
                <h3 className="font-semibold text-black text-lg mb-2">{title}</h3>
                <p className="text-gray-700 text-sm">{description}</p>
              </div>
            ))}
          </div>

          {/* Tools */}
          <h4
            ref={toolsRef}
            className="text-black font-Bebas text-lg text-center mt-4"
          >
            Tools Behind the magic
          </h4>
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-2">
            {toolsData.map((tool, index) => (
              <li
                key={index}
                className="flex items-center justify-center w-12 sm:w-14 aspect-square rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
              >
                <Image src={tool} alt="tool" width={50} height={50} className="w-6 sm:w-7" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Accordion Section */}
      <div ref={accordionRef} className="mt-12">
        <AccordionItems />
      </div>
    </section>
  );
};

export default About;
