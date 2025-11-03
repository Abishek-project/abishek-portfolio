"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap=5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[9px] border border-[#7042f88b] opacity-[0.9] flex items-center justify-center md:justify-start mx-auto md:mx-0"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Full Stack Developer | Flutter Developer{" "}
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            Abishek J{" "}
          </span>
        </motion.div>
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 my-4 sm:my-6 max-w-[600px] leading-relaxed"
        >
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Hi! I’m a Flutter Developer with 3.5 years of experience building
          beautiful, high-performance mobile apps, complemented by full-stack
          development expertise.
          <span className="block mt-4">
            Explore my portfolio to see how I bring ideas to life through code!
          </span>
        </motion.p>

        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
          href="#contact"
        >
          Let&apos;s Connect
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="relative w-full h-full flex justify-center items-center"
      >
        {/* Main tech image */}
        <Image
          src="/mainIconsdark.svg"
          alt="work icons"
          height={600}
          width={600}
          className="object-contain"
        />

        {/* Flutter PNG — positioned top-right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute top-[6%] right-[16%]"
        >
          <Image
            src="/flutter.png" // 👈 keep this in your /public folder
            alt="Flutter Logo"
            width={40}
            height={40}
            className="opacity-90 hover:opacity-100 hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(180,155,255,0.6)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
