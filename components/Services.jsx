"use client";

import { servicesData } from "@/database";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import CarouselButtons from "./CarouselButtons";

gsap.registerPlugin(Draggable, ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  // Responsive cards count
  const getCardsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
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
    const cardWidth = cardsRef.current[0].offsetWidth;
    const totalCards = cardsRef.current.length;

    // ✅ lastIndex properly calculate (gap included)
    const lastIndex = Math.max(totalCards - cardsToShow, 0);

    gsap.set(container, { x: 0 });

    Draggable.create(container, {
      type: "x",
      inertia: true,
      bounds: {
        minX: -(lastIndex * (cardWidth + gap)),
        maxX: 0,
      },
      cursor: "grab",
      snap: (x) => {
        const index = Math.round(Math.abs(x) / (cardWidth + gap));
        return -index * (cardWidth + gap);
      },
      onDragEnd: function () {
        const index = Math.round(Math.abs(this.x) / (cardWidth + gap));
        const clampedIndex = Math.min(index, lastIndex);
        gsap.to(container, {
          x: -clampedIndex * (cardWidth + gap),
          duration: 0.4,
          ease: "power3.out",
        });
        setCurrentIndex(clampedIndex);
      },
    });

    // Animate cards
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
          trigger: container,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      }
    );

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
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section
      className="py-24 relative overflow-hidden border border-white/20
      bg-gradient-to-b from-[#071C2A]/60 via-[#0A2A45]/30 to-[#071C2A]/60
      bg-cover bg-center bg-no-repeat rounded-t-[40px] rounded-b-[40px] mt-24"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <h1
        ref={headingRef}
        className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold font-Bebas uppercase text-center mb-4 tracking-wide"
      >
        Let me <span className="text-[#13adff]">bring your ideas</span> <span className="text-white"> to life</span>
      </h1>

      <p className="text-white/70 text-center md:text-lg lg:text-xl max-w-2xl mx-auto mb-16">
  I&#39;ll show you how we can build a simple system that brings in better leads and help you close them. <br />
   <span className="uppercase font-bold text-[#13adff]">

  Here&#39;s my services to help you shine
  </span>
</p>

      <div
        ref={containerRef}
        className="flex gap-8 cursor-grab select-none px-6 will-change-transform"
      >
        {servicesData.map((service, index) => (
          <Card
            key={service.id}
            item={service}
            type="service"
            cardRef={(el) => (cardsRef.current[index] = el)}
          />
        ))}
      </div>

      <CarouselButtons
        onLeftClick={() => slide("left")}
        onRightClick={() => slide("right")}
        disableLeft={currentIndex === 0}
        disableRight={currentIndex >= servicesData.length - cardsToShow}
      />
    </section>
  );
};

export default Services;
