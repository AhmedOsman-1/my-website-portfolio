"use client";

import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const Card = ({ item, cardRef }) => {
  const cardContainer = useRef(null);

  useEffect(() => {
    if (!cardContainer.current) return;
    const el = cardContainer.current;

    const handleMouseEnter = () => {
      gsap.to(el, {
        scale: 1.05,
        y: -10,
        boxShadow: "0 0 30px rgba(255,120,0,0.5), 0 20px 50px rgba(255,120,0,0.2)",
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        scale: 1,
        y: 0,
        boxShadow: "0 0 10px rgba(255,120,0,0.1), 0 15px 35px rgba(0,0,0,0.15)",
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

  if (!item || !item.id || !item.img) return null;

  const isService = item.type === "service";
  const href = isService ? "/contact" : item.link || "#";

  return (
    <Link href={href} ref={cardRef} target="_self" className="w-[90%] md:w-[45%] lg:w-[30%] block">
      <div
        ref={cardContainer}
        className="
          relative 
          bg-[hsl(var(--card)/1)] 
          text-[hsl(var(--card-foreground))] 
          border border-[hsl(var(--accent))] 
          rounded-2xl 
          shadow-lg 
          cursor-pointer 
          overflow-hidden 
          h-[42vh] min-h-[420px] 
          flex flex-col 
          transition-all duration-300
          hover:shadow-[0_0_30px_rgba(255,120,0,0.5),0_20px_50px_rgba(255,120,0,0.2)]
        "
      >
        {/* Image */}
        <div className="relative w-full h-[65%] p-4 flex items-center justify-center">
          <Image
            src={item.img}
            alt={item.title || "Project Image"}
            className="w-[95%] h-[90%] object-contain"
            width={500}
            height={500}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between p-4 h-[35%] bg-[hsl(var(--card)/1)] border-t border-[hsl(var(--accent)/0.3)]">
          <div>
            <h2 className="text-[hsl(var(--accent))] font-bold text-lg md:text-xl line-clamp-1">
              {item.title || "Untitled"}
            </h2>
            <p className="text-[hsl(var(--card-foreground)/0.8)] text-sm md:text-base mt-1 line-clamp-2">
              {item.description || item.des || "No description available."}
            </p>
          </div>

          {isService ? (
            <div className="flex items-center gap-1 text-[hsl(var(--accent))] font-medium text-xs md:text-sm mt-3">
              <span>Want the service?</span>
              <FaLocationArrow color="currentColor" size={12} />
            </div>
          ) : (
            <div className="flex justify-between items-center mt-3">
              <div className="flex -space-x-2">
                {(item.iconLists || []).map((icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-[hsl(var(--card)/1)] border border-[hsl(var(--accent)/0.4)] rounded-full flex items-center justify-center hover:border-[hsl(var(--accent))] transition-all duration-300"
                  >
                    <Image src={icon} alt={`icon-${i}`} width={18} height={18} />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-[hsl(var(--accent))] font-medium text-xs md:text-sm">
                <span>{item.link ? "Live" : "On Progress"}</span>
                {item.link && <FaLocationArrow color="currentColor" size={12} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
