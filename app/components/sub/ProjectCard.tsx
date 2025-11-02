"use client";

import Image from "next/image";
import React from "react";
import { Github, ExternalLink } from "lucide-react";

interface Props {
  src: string;
  title: string;
  subtitle: string;
  tech: string;
  description: string;
  githubUrl?: string;
  githubText?: string;
  demoUrl?: string;
  demoText?: string;
}

const ProjectCard = ({
  src,
  title,
  subtitle,
  tech,
  description,
  githubUrl,
  demoUrl,
  githubText,
  demoText,
}: Props) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#3A0CA3]/50 bg-gradient-to-b from-[#0b0b15]/80 to-[#10002B]/60 backdrop-blur-xl shadow-[0_0_25px_rgba(112,66,248,0.2)] transition-all hover:shadow-[0_0_35px_rgba(112,66,248,0.4)] hover:scale-[1.02] w-full">
      {/* Image Section */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 700px"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          {title}
        </h1>
        <p className="text-gray-400 text-sm mt-1">{subtitle}</p>

        {/* Divider */}
        <div className="w-full h-[1px] my-3 bg-gradient-to-r from-purple-500/50 to-cyan-500/50"></div>

        {/* Tech stack */}
        <p className="text-cyan-400 text-sm italic">{tech}</p>

        {/* Description */}
        <p className="mt-3 text-gray-300 text-sm leading-relaxed whitespace-pre-line">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-purple-500/60 rounded-lg text-sm text-white hover:bg-purple-600/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
            >
              <Github size={16} />
              {githubText || "GitHub"}
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-cyan-500/60 rounded-lg text-sm text-white hover:bg-cyan-600/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
            >
              <ExternalLink size={16} />
              {demoText || "Live Demo"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
