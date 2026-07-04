'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

// Custom GitHub inline icon
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

// Bento Card Wrapper supporting native anchor fallback to bypass pop-up blockers
function BentoCard({ children, className = "", href }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const Component = href ? motion.a : motion.div;
  const extraProps = href ? { href, target: '_blank', rel: 'noreferrer' } : {};

  return (
    <Component
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.012, y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative bg-[#0d0d0d]/40 border border-white/5 backdrop-blur-[16px] rounded-3xl p-8 overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${className} ${href ? 'cursor-pointer block' : ''}`}
      {...extraProps}
    >
      {/* Spotlight Hover Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-350 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.05), transparent 85%)`,
        }}
      />
      <div className="relative z-20 h-full flex flex-col justify-between">
        {children}
      </div>
    </Component>
  );
}

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full text-left">
      
      {/* 1. Profile Bio Card (col-span-8) */}
      <BentoCard className="md:col-span-8 min-h-[320px]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-widest">
              Available for Full-Time &amp; Freelance
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Monika Srirangam
          </h2>
          <p className="text-[#8A8A8A] text-sm md:text-base leading-relaxed max-w-2xl font-medium">
            Results-oriented software engineering professional with 4 years of hands-on experience building secure web/mobile systems, designing robust backend APIs, and optimizing relational/NoSQL databases. Precise, clean, and optimized layouts.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 pt-8 border-t border-white/5 mt-8 text-xs font-mono text-[#8A8A8A]">
          <span className="flex items-center gap-2"><MapPin size={12} /> Hyderabad, India</span>
          <span className="flex items-center gap-2"><Mail size={12} /> srirangammonika26@gmail.com</span>
          <span className="flex items-center gap-2"><Phone size={12} /> 8247255039</span>
        </div>
      </BentoCard>

      {/* 2. Core Strengths Card (col-span-4) */}
      <BentoCard className="md:col-span-4">
        <div>
          <span className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-widest block mb-4">
            ABILITIES
          </span>
          <h3 className="text-xl font-bold text-white mb-6">Core Strengths</h3>
          <ul className="flex flex-col gap-4 text-xs font-mono text-[#8A8A8A]">
            <li className="flex items-center gap-2.5"><Award size={14} className="text-white" /> Effective Communication</li>
            <li className="flex items-center gap-2.5"><Award size={14} className="text-white" /> Team Leadership</li>
            <li className="flex items-center gap-2.5"><Award size={14} className="text-white" /> Continuous Learning</li>
            <li className="flex items-center gap-2.5"><Award size={14} className="text-white" /> Strong Ability to Prioritize Tasks</li>
          </ul>
        </div>
        
        <div className="pt-6 mt-6 border-t border-white/5 flex gap-4">
          <a
            href="https://github.com/Monikasrirangam"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 text-[#8A8A8A] hover:text-white transition-colors duration-200"
          >
            <GithubIcon size={14} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/5 text-[#8A8A8A] hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </BentoCard>

      {/* 3. Featured Showcase Module 1: Code-Archaeologist (col-span-6) */}
      <BentoCard
        className="md:col-span-6 project-card"
        href="https://github.com/Monikasrirangam/Code-Archaeologist"
      >
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-[#8A8A8A]">
              Developer Utility
            </span>
            <div className="flex gap-2">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-[#8A8A8A] group-hover:text-white transition-colors">
                <GithubIcon size={12} />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-[#8A8A8A] group-hover:text-white transition-colors">
                <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
            Code-Archaeologist
          </h3>
          <p className="text-[#8A8A8A] text-xs leading-relaxed mb-6 font-medium">
            A developer utility that recursively scrapes code structures, builds AST maps, and reports static complexity scores.
          </p>
        </div>

        {/* Code Viewport */}
        <div className="w-full bg-black/40 border border-white/5 rounded-2xl overflow-hidden p-5 aspect-[1.8/1] flex flex-col justify-between font-mono text-[9px] md:text-[10px] text-white/70">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-white/30 text-[8px]">archaeologist_ast.py</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1">
            <p className="text-[#5C67F2]"><span className="text-[#F94706]">def</span> <span className="text-blue-400">dig_repository</span>(path):</p>
            <p className="text-[#8A8A8A]">  # Recursively scrape structures</p>
            <p className="text-white">  ast = parse_files(path)</p>
            <p className="text-white">  analysis = run_static_checks(ast)</p>
            <p className="text-green-400">  return {"{"}"metrics": analysis.scores{"}"}</p>
          </div>
        </div>
      </BentoCard>

      {/* 4. Featured Showcase Module 2: Weather-App (col-span-6) */}
      <BentoCard
        className="md:col-span-6 project-card"
        href="https://github.com/Monikasrirangam/weather-app"
      >
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-[#8A8A8A]">
              API Dashboard
            </span>
            <div className="flex gap-2">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-[#8A8A8A] group-hover:text-white transition-colors">
                <GithubIcon size={12} />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-[#8A8A8A] group-hover:text-white transition-colors">
                <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
            Weather-App
          </h3>
          <p className="text-[#8A8A8A] text-xs leading-relaxed mb-6 font-medium">
            A beautiful, minimalist real-time dashboard visualizing localized API weather metrics, wind speed, and UV forecasts.
          </p>
        </div>

        {/* Weather UI Viewport */}
        <div className="w-full bg-black/40 border border-white/5 rounded-2xl overflow-hidden p-5 aspect-[1.8/1] flex flex-col justify-between font-sans">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 text-[8px] text-[#8A8A8A] font-mono">
            <span>LIVE INTERFACE MOCK</span>
            <span className="text-white/40">http://weather-forecast</span>
          </div>
          <div className="flex-1 flex items-center justify-between py-1">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase font-mono text-[#8A8A8A]">Hyderabad</span>
              <span className="text-2xl font-extrabold text-white">32°C</span>
              <span className="text-[8px] text-white/40">Feels like 34°C • Scattered Clouds</span>
            </div>
            <div className="text-2xl bg-white/5 p-2 rounded-xl">☀️</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[8px] text-[#8A8A8A] font-mono pt-2 border-t border-white/5">
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
      </BentoCard>

      {/* 5. Career History Card (col-span-8) */}
      <BentoCard className="md:col-span-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase size={14} className="text-white" />
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-widest">
              Professional Timeline
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {/* Job 1 */}
            <div className="border-l border-white/5 pl-4 ml-1.5 relative">
              <div className="absolute w-2 h-2 rounded-full bg-white -left-[4.5px] top-1.5" />
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-sm font-bold text-white">Full Stack Web Developer</h4>
                <span className="text-[10px] font-mono text-[#8A8A8A]">March 2022 - April 2026</span>
              </div>
              <h5 className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-wider mb-2">
                Movate, Hyderabad, India
              </h5>
              <p className="text-[#8A8A8A] text-xs leading-relaxed">
                Developed responsive web applications using JavaScript, React, and Node.js. Collaborated with cross-functional teams to define project requirements, design APIs, and optimize query latency in MongoDB and PostgreSQL.
              </p>
            </div>

            {/* Job 2 */}
            <div className="border-l border-white/5 pl-4 ml-1.5 relative">
              <div className="absolute w-2 h-2 rounded-full bg-white -left-[4.5px] top-1.5 opacity-50" />
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-sm font-bold text-white">Intern Engineer</h4>
                <span className="text-[10px] font-mono text-[#8A8A8A]">March 2021 - January 2022</span>
              </div>
              <h5 className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-wider mb-2">
                Gayatri Enterprise Private, Hyderabad
              </h5>
              <p className="text-[#8A8A8A] text-xs leading-relaxed">
                Developed efficient Python scripts for automated data processing tasks, assisted in implementing RESTful APIs, and troubleshot code bugs.
              </p>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* 6. Education Card (col-span-4) */}
      <BentoCard className="md:col-span-4">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap size={14} className="text-white" />
            <span className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-widest">
              Academics
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <div className="flex justify-between items-start gap-2 mb-1">
                <h4 className="text-xs font-bold text-white">B.Sc in Computers</h4>
                <span className="text-[8px] font-mono text-[#8A8A8A] bg-white/5 border border-white/5 px-1.5 py-0.5 rounded">2022</span>
              </div>
              <p className="text-[10px] text-[#8A8A8A]">YSR &amp; BS College, Tadepalligudem</p>
            </div>

            <div>
              <div className="flex justify-between items-start gap-2 mb-1">
                <h4 className="text-xs font-bold text-white">Intermediate Education</h4>
                <span className="text-[8px] font-mono text-[#8A8A8A] bg-white/5 border border-white/5 px-1.5 py-0.5 rounded">2018</span>
              </div>
              <p className="text-[10px] text-[#8A8A8A]">Aditya Jr. College, Tadepalligudem</p>
            </div>
          </div>
        </div>
      </BentoCard>

    </div>
  );
}
