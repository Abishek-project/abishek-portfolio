import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between m-auto px-[10px] py-2 md:py-0">
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            ABISHEK J
          </span>
        </a>

        {/* --- Center nav items --- */}
        <div className="w-full md:w-[600px] h-full flex flex-row items-center justify-center md:justify-between md:mr-20 mt-2 md:mt-0">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <a
              href="#about-me"
              className="cursor-pointer hover:text-purple-400 transition-colors"
            >
              About me
            </a>
            <a
              href="#skills"
              className="cursor-pointer hover:text-purple-400 transition-colors"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="cursor-pointer hover:text-purple-400 transition-colors"
            >
              Projects
            </a>
          </div>
        </div>

        {/* --- Social icons --- */}
        <div className="flex flex-row flex-wrap justify-center gap-5 w-full md:w-auto mt-2 md:mt-0">
          {Socials.map((social) => (
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              key={social.name}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src={social.src}
                alt={social.name}
                width={24}
                height={24}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
