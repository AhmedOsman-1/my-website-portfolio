"use client";

import { projects } from "@/database/index";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import CarouselButtons from "./CarouselButtons"; // ✅ new reusable buttons

gsap.registerPlugin(Draggable, ScrollTrigger);

const RecentProjects = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const callToActionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  const getCardsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 2;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 1;
  };

  useEffect(() => {
    const handleResize = () => setCardsToShow(getCardsToShow());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !cardsRef.current[0]) return;

    const gap = 32;
    const cardWidth = cardsRef.current[0].offsetWidth + gap;
    const totalCards = cardsRef.current.length;

    gsap.set(container, { x: 0 });

    Draggable.create(container, {
      type: "x",
      inertia: true,
      bounds: {
        minX: Math.min(-(totalCards - cardsToShow) * cardWidth, 0),
        maxX: 0,
      },
      cursor: "grab",
      onDragEnd: function () {
        const index = Math.round(Math.abs(this.x) / cardWidth);
        gsap.to(container, {
          x: -index * cardWidth,
          duration: 0.5,
          ease: "power3.out",
        });
        setCurrentIndex(index);
      },
    });
  }, [cardsToShow]);

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

    // Cards animation (stagger)
    gsap.fromTo(
      cardsRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      }
    );

    // CTA animation
    if (callToActionRef.current) {
      gsap.fromTo(
        callToActionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: callToActionRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const slide = (direction) => {
    if (!cardsRef.current[0]) return;

    const gap = 32;
    const cardWidth = cardsRef.current[0].offsetWidth + gap;
    const totalCards = cardsRef.current.length;
    let newIndex = currentIndex;

    if (direction === "left") newIndex = Math.max(currentIndex - 1, 0);
    else newIndex = Math.min(currentIndex + 1, totalCards - cardsToShow);

    setCurrentIndex(newIndex);

    gsap.to(containerRef.current, {
      x: -newIndex * cardWidth,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section
      className="py-24 relative overflow-hidden border border-white/20 bg-gradient-to-b from-[#073147]/50 via-[#0A2A45]/20 to-[#073147]/40 bg-cover bg-center bg-no-repeat rounded-t-[40px] rounded-b-[40px] mt-24"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Main Heading */}
      <h1
        ref={headingRef}
        className="text-white text-4xl md:text-5xl font-extrabold font-Bebas uppercase text-center mb-4 tracking-wide"
      >
        See My Latest <span className="text-[#13adff] font-Bebas">Projects</span>
      </h1>
      <p className="text-white/70 text-center md:text-lg lg:text-xl max-w-2xl mx-auto mb-16">From concept to execution, delivering seamless functionality and design.</p>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="flex gap-8 cursor-grab select-none px-6 will-change-transform"
      >
        {projects.map((project, index) => (
          <Card
            key={project.id}
            item={project}
            type="project"
            cardRef={(el) => (cardsRef.current[index] = el)}
          />
        ))}
      </div>

      <CarouselButtons
        onLeftClick={() => slide("left")}
        onRightClick={() => slide("right")}
        disableLeft={currentIndex === 0}
        disableRight={currentIndex >= projects.length - cardsToShow}
      />

      {/* CTA Section */}
      <div ref={callToActionRef} className="mt-20 text-center px-6 relative">
        <p className="text-white/80 text-center md:text-lg lg:text-xl max-w-2xl mx-auto m-4">Liked my projects?</p>
        <h2 className="text-[#13adff] text-2xl md:text-3xl font-extrabold font-Outfit mb-6 leading-snug uppercase">
            free 1:1 power hour call?
  
        </h2>
        
        <div className="flex justify-center absolute bottom-[50px] md:bottom-[-40px] left-1/2 -translate-x-1/2 animate-bounce">
          <Button href="/contact" text={"Book Appointment"} />
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
