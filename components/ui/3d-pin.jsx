// components/ui/3d-pin.jsx
"use client";
import Link from "next/link";

export const PinContainer = ({ children, title, href }) => {
  return (
    <Link href={href} target="_blank" className="group">
      <div className="p-4 bg-[#00131F] rounded-3xl hover:scale-105 transition-transform duration-300 cursor-pointer">
        {children}
      </div>
    </Link>
  );
};
