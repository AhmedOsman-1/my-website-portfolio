"use client";

import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Card = ({ item, type, cardRef }) => {
  const cardContainer = useRef(null);

  useEffect(() => {
    if (!cardContainer.current) return;

    const el = cardContainer.current;

    // Hover in
    const handleMouseEnter = () => {
      gsap.to(el, {
        scale: 1.05,
        y: -16,
        boxShadow: "0px 20px 50px rgba(0,200,255,0.5)",
        duration: 0.5,
        ease: "power3.out",
      });
    };

    // Hover out
    const handleMouseLeave = () => {
      gsap.to(el, {
        scale: 1,
        y: 0,
        boxShadow: "0px 15px 35px rgba(0,200,255,0.15)",
        duration: 0.5,
        ease: "power3.out",
      });
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={(el) => {
        cardRef && cardRef(el); // maintain parent ref
        cardContainer.current = el;
      }}
      className="flex-shrink-0 w-[90%] md:w-[45%] lg:w-[30%]
        relative overflow-hidden
        backdrop-blur-md
        border border-white/20
        shadow-[0_15px_35px_rgba(0,200,255,0.15)]
        rounded-2xl"
      style={{ height: "42vh", minHeight: "420px"}}
      
    >
      {/* Image Section */}
      <div className="relative w-full h-[70%] overflow-hidden p-4 flex items-center justify-center">
        <Image
          src={item.img}
          alt={item.title}
          className="w-[95%] h-[90%] object-contain"
          width={500}
          height={500}
        />
      </div>

      {/* Bottom Section */}
      <div
        style={{ backgroundImage: "url('/bg.jpg')" }}
        className="bg-cover bg-center bg-no-repeat p-4 border-t border-white/10 h-1/2 flex flex-col justify-between"
      >
        <div>
          <h2 className="text-[#09c6ff] font-bold text-lg md:text-xl line-clamp-1">
            {item.title}
          </h2>

          {/* Service description OR Project des */}
          <p className="text-white text-sm md:text-base mt-1 line-clamp-2">
            {type === "service" ? item.description : item.des}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          {type === "project" && (
            <div className="flex -space-x-2">
              {item.iconLists.map((icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-[#0C3A63]/60 border border-white/20 rounded-full flex items-center justify-center"
                >
                  <Image src={icon} alt={icon} width={18} height={18} />
                </div>
              ))}
            </div>
          )} 

          {type === "project" && (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[#09c6ff] font-medium hover:underline"
            >
              <p className="text-xs md:text-sm">Check Live</p>
              <FaLocationArrow color="#fff" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
