'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth Spring configurations
  const springConfig = { stiffness: 450, damping: 30, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset cursor by half its default width/height (10px) to center it
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.project-card') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive');

      if (isInteractive) {
        setHovered(true);
        if (target.closest('.project-card')) {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Follower Circle */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 3.5 : 1,
          backgroundColor: hovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
          border: hovered ? '1px solid rgba(255, 255, 255, 1)' : '2px solid rgba(255, 255, 255, 0.85)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center overflow-hidden"
      >
        {cursorText && (
          <span className="text-[5px] font-black tracking-widest text-black font-sans leading-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Tiny Core Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          transform: 'translate(8px, 8px)', // Center inside the outer circle
        }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
    </>
  );
}
