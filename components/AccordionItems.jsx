"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brand = "#FF7800";

const AccordionItems = () => {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelector("h4"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );
    }

    itemRefs.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="mt-8">
      <h4 className="text-2xl md:text-3xl uppercase font-Bebas font-semibold text-center mb-6 text-white">
        Frequently Asked Questions
      </h4>

      <Accordion
        type="single"
        collapsible
        className="max-w-3xl mx-auto space-y-3"
      >
        {[
          {
            title: "What’s your approach to building a project?",
            content:
              "We'll audit what you're doing now, optimize what's working, fix what isn't, and create a clean system that brings predictable results.",
          },
          {
            title: "How did you get into front-end development?",
            content:
              "Started with curiosity → obsession → consistency. Over time it became a skillset I sharpen every single day.",
          },
          {
            title: "Do you only build websites, or do you also design?",
            content:
              "Primarily a developer, but I build clean UI layouts and collaborate smoothly with designers.",
          },
          {
            title: "What kind of projects do you usually build?",
            content:
              "Landing pages, SaaS dashboards, eCommerce, portfolios, and interactive web apps.",
          },
          {
            title: "Can you customize a website for my business?",
            content:
              "Absolutely. Tailored, modern, and conversion-focused builds are my specialty.",
          },
          {
            title: "What tools do you use daily?",
            content:
              "VS Code, GitHub, Chrome DevTools, Figma, Notion, Prettier.",
          },
          {
            title: "Are you open for freelance work or full-time roles?",
            content:
              "Yes — I work with startups, SaaS, creators, and agencies on impactful projects.",
          },
        ].map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            ref={(el) => (itemRefs.current[index] = el)}
            className="rounded-2xl bg-[#0E0E0E] border border-white/5 px-4"
          >
            <AccordionTrigger
              className="
                text-white 
                font-medium
                py-4
                hover:no-underline
                hover:bg-white/5 
                transition
                rounded-xl
                aria-expanded:text-[brand]
              "
              style={{
                '--tw-prose-bullets': brand,
              }}
            >
              {item.title}
            </AccordionTrigger>

            <AccordionContent
              className="
                text-gray-300 
                text-sm 
                leading-relaxed
                pb-4
              "
            >
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default AccordionItems;
