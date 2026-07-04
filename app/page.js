'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import AntiGravityCanvas from '../components/AntiGravityCanvas';
import CustomCursor from '../components/CustomCursor';
import BentoGrid from '../components/BentoGrid';

export default function Page() {
  const { scrollY } = useScroll();
  
  // Header scale scroll parallax effects
  const headerScale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const headerOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Spring physics for load reveal
  const revealVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: custom * 0.1,
      },
    }),
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen text-white select-none overflow-hidden">
      {/* 3D WebGL background */}
      <AntiGravityCanvas />
      
      {/* Dynamic Cursor follower */}
      <CustomCursor />

      {/* Floating Header Navbar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0d0d0d]/80 border border-white/5 backdrop-blur-md px-6 py-3 rounded-full flex gap-6 text-xs font-mono text-[#8A8A8A] shadow-2xl">
        <button onClick={() => handleScrollTo('hero')} className="hover:text-white transition-colors duration-200">HOME</button>
        <button onClick={() => handleScrollTo('bento-section')} className="hover:text-white transition-colors duration-200">PORTFOLIO</button>
        <a href="mailto:srirangammonika26@gmail.com" className="hover:text-white transition-colors duration-200">CONTACT</a>
      </header>

      {/* 1. HERO SECTION */}
      <section
        id="hero"
        className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden z-10"
      >
        <motion.div
          style={{ scale: headerScale, opacity: headerOpacity }}
          className="w-full max-w-4xl text-center flex flex-col items-center gap-6"
        >
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-[#8A8A8A] tracking-wider uppercase"
          >
            AVAILABLE FOR CONTRACTS
          </motion.span>

          {/* Editorial Title */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
          >
            MONIKA <span className="font-serif italic font-normal text-[#8A8A8A]">SRIRANGAM</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="text-sm font-mono text-[#8A8A8A] tracking-widest max-w-md uppercase"
          >
            FULL-STACK SOFTWARE DEVELOPER SPECIALIZING IN WEB INTERFACES, PYTHON SCRIPTS, &amp; API INTEGRATION.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="mt-6 flex gap-4"
          >
            <button
              onClick={() => handleScrollTo('bento-section')}
              className="px-8 py-3.5 bg-white text-black font-bold text-xs rounded-full hover:bg-neutral-200 transition-all duration-200 shadow-lg"
            >
              EXPLORE BENTO WORK
            </button>
            <a
              href="mailto:srirangammonika26@gmail.com"
              className="px-8 py-3.5 border border-white/10 text-white font-bold text-xs rounded-full hover:bg-white/5 transition-all duration-200"
            >
              INQUIRE NOW
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. INFINITE TICKER MARQUEE */}
      <div className="relative w-full overflow-hidden py-6 bg-black/60 border-y border-white/5 backdrop-blur-[16px] z-20">
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ ease: 'linear', duration: 25, repeat: Infinity }}
            className="flex gap-16 text-xs font-mono font-black tracking-widest uppercase text-white/40"
          >
            <span>PYTHON SCRIPTS</span>
            <span>REACT DEVELOPMENT</span>
            <span>RESTFUL API ENGINE</span>
            <span>DATABASE INDEXING</span>
            <span>FASTAPI PIPELINES</span>
            <span>DJANGO WEB DESIGN</span>
            <span>NEXT.JS BENTO MODULES</span>
            <span>PYTHON SCRIPTS</span>
            <span>REACT DEVELOPMENT</span>
            <span>RESTFUL API ENGINE</span>
            <span>DATABASE INDEXING</span>
            <span>FASTAPI PIPELINES</span>
            <span>DJANGO WEB DESIGN</span>
            <span>NEXT.JS BENTO MODULES</span>
          </motion.div>
        </div>
      </div>

      {/* 3. SHOWCASE BENTO GRID SECTION */}
      <section id="bento-section" className="py-32 px-6 max-w-6xl mx-auto z-20 relative">
        <div className="mb-16">
          <span className="text-xs font-mono text-[#8A8A8A] uppercase tracking-widest mb-2 block">
            PORTFOLIO OVERVIEW
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            THE BENTO SHOWCASE
          </h2>
        </div>

        {/* Unified Bento Grid Layout */}
        <BentoGrid />
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 max-w-6xl mx-auto border-t border-white/5 z-20 relative flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-[#8A8A8A]">
        <div className="flex items-center gap-6">
          <a href="mailto:srirangammonika26@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
            <Mail size={12} /> srirangammonika26@gmail.com
          </a>
          <a href="tel:8247255039" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
            <Phone size={12} /> 8247255039
          </a>
        </div>
        
        <p>© {new Date().getFullYear()} Monika Srirangam. Pure WebGL Bento Portfolio.</p>
        
        <div className="flex gap-4">
          <a href="https://github.com/Monikasrirangam" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">GITHUB</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">LINKEDIN</a>
        </div>
      </footer>
    </main>
  );
}
