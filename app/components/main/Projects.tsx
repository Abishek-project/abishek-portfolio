"use client";

import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center pb-40 z-[20]"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        PROJECTS
      </h1>

      {/* Row 1 */}
      <div className="h-full w-full flex flex-col lg:flex-row gap-10 px-10">
        <ProjectCard
          src="/eazybuyCover.png"
          title="EazyBuy - Smart Ecommerce Platform"
          subtitle="Customer & Admin Shopping App"
          tech="Flutter, Node.js, MongoDB, REST APIs"
          description={`EazyBuy is a full-featured ecommerce application built with Flutter for both customers and admins.

The app offers a seamless shopping experience with product browsing, smart search, categorized listings, cart management, order tracking, and secure payments.

Admin users can efficiently manage products, categories, and orders — all within the same ecosystem.

Features: User-friendly UI, real-time order updates, push notifications, profile management, and integrated backend for smooth operations across platforms.`}
          githubUrl="https://github.com/Abishek-project/E-commerce-App-with-Backend"
          demoUrl="https://abishek-project.github.io/E-commerce-App-with-Backend/"
        />

        <ProjectCard
          src="/groupsyncCover.png"
          title="GroupSync - Video Conferencing App"
          subtitle="Seamless Communication Platform"
          tech="Flutter, Firebase, agora_rtc_engine"
          description={`GroupSync is a modern video conferencing app built with Flutter and Firebase to enable smooth, high-quality virtual meetings.

Designed for teams and individuals, it supports business meetings, remote collaborations, and personal video calls with ease.

Features: real-time video and audio, secure authentication, meeting history, and user-friendly interface for a seamless communication experience.`}
          githubUrl="https://github.com/Abishek-project/Video-conferencing-app/"
          demoUrl="https://appetize.io/app/b_h2brbjmpecfr5d2d7dnqeen634"
        />

        <ProjectCard
          src="/aiCover.png"
          title="Nova AI - Personal Assistant"
          subtitle="Your Own Smart Companion"
          tech="Flutter, Gemini 2.5 Flash, Firebase"
          description={`Nova AI is a Jarvis-style personal assistant app built with Flutter and Gemini 2.5 Flash.

It listens, talks, and performs voice-triggered actions — your own intelligent companion that feels alive.

Features: real-time voice interaction, personalized responses, smart action execution, and customizable assistant personality.`}
          githubUrl="https://github.com/Abishek-project/personal-ai-assistant"
          demoUrl="https://www.linkedin.com/posts/abishek-j-dev_flutter-ai-voiceassistant-activity-7386674615525416960-cBSy?utm_source=share&utm_medium=member_desktop&rcm=ACoAADXdpjsBThjEeqIiAWzy71vyniFhGlKVZzE"
        />
      </div>
    </div>
  );
};

export default Projects;
