"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Card from "./Card";
import CarouselButtons from "./CarouselButtons";
import { servicesData } from "@/database";

gsap.registerPlugin(Draggable, ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  const getCardsToShow = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 1;
  }, []);

  useEffect(() => {
    const resize = () => setCardsToShow(getCardsToShow());
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [getCardsToShow]);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current[0]) return;

    const gap = 32;
    const cardWidth = cardsRef.current[0].offsetWidth;
    const totalCards = cardsRef.current.length;
    const lastIndex = Math.max(totalCards - cardsToShow, 0);

    gsap.set(containerRef.current, { x: 0 });

    Draggable.create(containerRef.current, {
      type: "x",
      inertia: true,
      bounds: { minX: -(lastIndex * (cardWidth + gap)), maxX: 0 },
      cursor: "grab",
      snap: (x) => {
        const idx = Math.round(Math.abs(x) / (cardWidth + gap));
        return -idx * (cardWidth + gap);
      },
      onDragEnd() {
        const idx = Math.round(Math.abs(this.x) / (cardWidth + gap));
        const clamped = Math.min(idx, lastIndex);
        gsap.to(containerRef.current, {
          x: -clamped * (cardWidth + gap),
          duration: 0.5,
          ease: "power3.out",
        });
        setCurrentIndex(clamped);
      },
    });

    // Animate cards only once
    gsap.fromTo(
      cardsRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
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
          once: true,
        },
      }
    );

    // Heading animation only once
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 90%", once: true },
        }
      );
    }
  }, [cardsToShow]);

  const slide = (direction) => {
    if (!cardsRef.current[0]) return;

    const gap = 32;
    const cardWidth = cardsRef.current[0].offsetWidth;
    const totalCards = cardsRef.current.length;
    const lastIndex = Math.max(totalCards - cardsToShow, 0);

    let newIndex = currentIndex;
    if (direction === "left") newIndex = Math.max(currentIndex - 1, 0);
    else newIndex = Math.min(currentIndex + 1, lastIndex);

    setCurrentIndex(newIndex);
    gsap.to(containerRef.current, {
      x: -newIndex * (cardWidth + gap),
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-cover border-[#13adff] border-t mt-24 bg-center bg-no-repeat rounded-t-[40px] rounded-b-[40px]">
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-12">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold font-Bebas uppercase tracking-wide">
          Let me <span className="text-[#13adff]">bring your ideas</span> to life
        </h1>
        <p className="text-white/70 md:text-lg lg:text-xl max-w-2xl mx-auto mt-4">
          I&#39;ll show you how we can build a simple system that brings in better leads and help you close them.
        </p>
        <p className="uppercase font-bold text-[#13adff] mt-6">
          Here&#39;s my services to help you shine
        </p>
      </div>

      {/* Cards */}
      <div ref={containerRef} className="flex gap-8 cursor-grab select-none px-6 will-change-transform">
        {servicesData.map((service, i) => (
          <Card key={service.id} item={service} type="service" cardRef={(el) => (cardsRef.current[i] = el)} />
        ))}
      </div>

      {/* Carousel Buttons */}
      <CarouselButtons
        onLeftClick={() => slide("left")}
        onRightClick={() => slide("right")}
        disableLeft={currentIndex === 0}
        disableRight={currentIndex >= servicesData.length - cardsToShow}
      />
    </section>
  );
}
