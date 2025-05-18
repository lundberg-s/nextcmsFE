import { useState } from "react";

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function HamburgerMenu({ isOpen, toggleMenu }: HamburgerMenuProps) {

  return (
    <div className="z-10 top-0 right-0">
      <button
        aria-label="Toggle navigation"
        onClick={toggleMenu}
        className="relative w-12 h-10 flex items-center justify-center"
      >
        <div className="relative w-7 h-1 bg-transparent">
          <div
            className={`absolute w-7 h-1 bg-gray-300 rounded-full transition-all duration-200 ${
              isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <div
            className={`absolute w-7 h-1 bg-gray-300 rounded-full transition-all duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`absolute w-7 h-1 bg-gray-300 rounded-full transition-all duration-200 ${
              isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          />
        </div>
      </button>
    </div>
  );
}
