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

const AccordionItems = () => {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    // Animate the whole section heading
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelector("h4"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
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
          duration: 0.6,
          ease: "power3.out",
          delay: index * 0.1, 
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 75%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="mt-8">
      <h4 className="text-2xl md:text-3xl uppercase font-Bebas font-semibold text-center mb-6 text-slate-900">
        Frequiently Asked Questions:
      </h4>
      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {[
          {
            title: "What’s your approach to building a project?",
            content:
              "We'll go through what you're doing right now, what's working and what's not, and we'll make sure to optimize your project for maximum performance. Then I'll show you how we can build a simple system that brings in better leads and help you close them.",
          },
          {
            title: "How did you get into front-end development?",
            content:
              "Honestly, I started out just curious about how websites worked. One line of code turned into late-night experiments, and before I knew it, I was building full projects.",
          },
          {
            title: "Do you only build websites, or do you also design?",
            content:
              "I’m primarily a developer, but I have a good eye for design. I love collaborating with designers, but if needed, I can create clean and simple layouts myself.",
          },
          
          {
            title: "What kind of projects do you usually build?",
            content:
              "I’ve built landing pages, personal portfolios, SaaS dashboards, eCommerce stores, blog platforms, and social media-style apps. My goal is always to create functional products that users love.",
          },
          {
            title: "Can you customize a website for my business?",
            content:
              "Absolutely! I design websites that match your brand identity, focus on conversions, and deliver measurable results.",
          },
          {
            title: "What tools do you use daily?",
            content:
              "VS Code, GitHub, Chrome DevTools, Figma, and sometimes Notion to keep my workflow organized.",
          },
          {
            title: "Are you open for freelance work or full-time roles?",
            content:
              "Yes! I collaborate with startups, SaaS companies, agencies, and coaches. Whether freelance or full-time, I’m always open to impactful opportunities.",
          },
        ].map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default AccordionItems;
