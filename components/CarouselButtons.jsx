"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CarouselButtons = ({ onLeftClick, onRightClick, disableLeft, disableRight }) => {
  return (
    <div className="flex justify-center gap-6 mt-10">
      <button
        onClick={onLeftClick}
        className={`p-3 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40 transition-transform hover:scale-110 ${
          disableLeft ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disableLeft}
      >
        <FaChevronLeft color="#fff" />
      </button>
      <button
        onClick={onRightClick}
        className={`p-3 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40 transition-transform hover:scale-110 ${
          disableRight ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disableRight}
      >
        <FaChevronRight color="#fff" />
      </button>
    </div>
  );
};

export default CarouselButtons;
