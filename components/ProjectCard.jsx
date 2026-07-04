'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectCard({ project }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleCardClick = () => {
    window.open(project.github, '_blank');
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
      whileHover={{ scale: 1.015, y: -6 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="project-card relative w-full bg-[#0d0d0d]/80 border border-white/5 rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)] cursor-pointer group overflow-hidden"
    >
      {/* Interactive Radial Spotlight Gradient Border-Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
        }}
      />

      <div className="flex flex-col h-full justify-between relative z-20">
        <div>
          {/* Tags and Links */}
          <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-[#8A8A8A]">
              {project.category}
            </span>
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 text-[#8A8A8A] hover:text-white transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={16} />
              </a>
              <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/15 flex items-center justify-center border border-white/5 text-[#8A8A8A] group-hover:text-white transition-all duration-200">
                <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Title and descriptions */}
          <h3 className="text-3xl font-black text-white mb-3 tracking-tight">
            {project.title}
          </h3>
          <p className="text-[#8A8A8A] text-sm leading-relaxed mb-8 max-w-md">
            {project.description}
          </p>
        </div>

        {/* UI / Mock Container Panel */}
        <div className="w-full bg-black/40 border border-white/5 rounded-2xl overflow-hidden p-6 aspect-[1.8/1] relative flex flex-col justify-between">
          
          {/* Custom Project Viewport Render */}
          {project.id === 'archaeologist' ? (
            <div className="flex-1 flex flex-col justify-between h-full font-mono text-[9px] md:text-[10px] text-white/70 leading-relaxed">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2.5 mb-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-white/30 text-[8px]">code-archaeologist.py</span>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1.5 pl-1">
                <p className="text-[#5C67F2]"><span className="text-[#F94706]">def</span> <span className="text-blue-400">dig_repository</span>(path):</p>
                <p className="text-[#8A8A8A]">  # Recursively scrape structures</p>
                <p className="text-white">  ast = parse_files(path)</p>
                <p className="text-white">  analysis = run_static_checks(ast)</p>
                <p className="text-green-400">  return {"{"}"metrics": analysis.scores{"}"}</p>
              </div>
              <div className="flex justify-between items-center pt-2.5 border-t border-white/5 text-[8px] text-white/30">
                <span>Memory: 12.8MB</span>
                <span className="text-green-500 font-bold">● Active Process</span>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-between h-full font-sans">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-2 text-[9px] text-[#8A8A8A] font-mono">
                <span>SIMULATED APP INTERFACE</span>
                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/5 text-white/50">http://weather-forecast</span>
              </div>
              
              <div className="flex-1 flex items-center justify-between gap-4 py-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8A8A8A]">Hyderabad</span>
                  <span className="text-3xl font-extrabold text-white">32°C</span>
                  <span className="text-[9px] text-white/40">Feels like 34°C • Scattered Clouds</span>
                </div>
                <div className="w-12 h-12 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                  ☀️
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[8px] text-[#8A8A8A] font-mono pt-2.5 border-t border-white/5">
                <div className="bg-white/5 p-1 rounded text-center">
                  <p className="text-white/30">WIND</p>
                  <p className="text-white font-bold">12 km/h</p>
                </div>
                <div className="bg-white/5 p-1 rounded text-center">
                  <p className="text-white/30">HUMIDITY</p>
                  <p className="text-white font-bold">65%</p>
                </div>
                <div className="bg-white/5 p-1 rounded text-center">
                  <p className="text-white/30">UV INDEX</p>
                  <p className="text-white font-bold">Low 2</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
