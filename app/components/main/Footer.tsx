"use client";

import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-[#7042f88b] bg-[#0b0b15]/60 backdrop-blur-md text-gray-400 py-6 text-center">
      <p className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base">
        Made with
        <Heart
          className="text-[#b49bff] fill-[#b49bff] animate-pulse"
          size={16}
        />
        by{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">
          Abishek
        </span>
        <span className="text-gray-500">•</span>© {new Date().getFullYear()} All
        rights reserved
      </p>
    </footer>
  );
};

export default Footer;
