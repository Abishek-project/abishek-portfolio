"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";

const experiences = [
  {
    title: "Software Engineer",
    company: "Grootan Technologies",
    duration: "February 2024 – Present",
    description:
      "Developing secure, high-performance fintech and enterprise apps using Flutter for mobile and desktop.",
    points: [
      "Developed a fintech desktop application for a banking client using Flutter, improving delivery speed by 40%.",
      "Fixed a critical security leak by replacing default input fields with encrypted secure fields, preventing password exposure in Windows memory dumps and eliminating 100% plaintext risk.",
      "Enabled real-time multi-device activation via WebSocket, cutting user setup time by 50%.",
      "Designed and developed a secure financial login app using Flutter (Android & iOS) with integrated biometric authentication (Face ID, Touch ID), reducing login failures by 45%.",
      "Applied Clean Architecture with BLoC and GetIt, improving code maintainability by 60%.",
    ],
  },

  {
    title: "Flutter Developer",
    company: "Agile Cyber Solutions",
    duration: "July 2022 – February 2024",
    description:
      "Developed cross-platform mobile applications with a focus on performance, security, and AI-powered user experiences.",
    points: [
      "Utilized Flutter and Dart to develop MyThings — an offline- and online-capable productivity app published on both the App Store and Google Play.",
      "Enhanced user security by implementing real-time device monitoring and remote logout features, reducing unauthorized access incidents by 70%.",
      "Implemented an AI-powered auto-suggestion system in the Inbox feature to categorize and store incoming documents, cutting manual sorting time by 60%.",
      "Tech Stack: Flutter, Firebase, Hive, Neo4j, GetX.",
    ],
  },
];

const WorkExperience = () => {
  return (
    <motion.section
      id="experience"
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center justify-center px-6 md:px-20 mt-28 w-full text-white"
    >
      {/* Header */}
      <motion.div variants={slideInFromTop} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Work Experience
        </h2>
        <p className="text-gray-400 mt-3 text-lg">
          My professional journey so far
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative w-full max-w-5xl">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-cyan-500/60 to-purple-500/60" />

        {/* Experience Cards */}
        <div className="flex flex-col space-y-20 md:space-y-24">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                variants={isLeft ? slideInFromLeft(0.3) : slideInFromRight(0.3)}
                className={`relative flex flex-col md:flex-row items-center w-full ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-cyan-500 w-4 h-4 rounded-full shadow-[0_0_15px_#06b6d4]" />

                {/* Card */}
                <div
                  className={`bg-[#0b0b15]/80 backdrop-blur-md border border-[#7042f88b] rounded-2xl p-6 md:p-8 shadow-lg max-w-[500px] w-full 
                    ${
                      isLeft
                        ? "md:mr-auto md:pr-12 md:ml-0 md:text-right md:translate-x-[-40px]"
                        : "md:ml-auto md:pl-12 md:mr-0 md:text-left md:translate-x-[40px]"
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-lg sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 break-words">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap">
                      <Calendar size={16} />
                      {exp.duration}
                    </div>
                  </div>

                  <p className="text-blue-400 font-medium mt-1">
                    {exp.company}
                  </p>
                  <p className="text-gray-300 mt-3 text-start">
                    {exp.description}
                  </p>

                  <ul className="list-none mt-4 space-y-2 text-gray-400 text-sm text-start">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-cyan-400 mt-1">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default WorkExperience;
