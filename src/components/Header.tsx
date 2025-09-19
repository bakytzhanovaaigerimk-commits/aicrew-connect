'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      anime({
        targets: headerRef.current,
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 800,
        delay: 300,
        easing: 'easeOutExpo'
      });
    }
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          AI CREW CONNECT
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-white hover:text-blue-300 transition-colors">Home</a>
          <a href="#features" className="text-white hover:text-blue-300 transition-colors">Features</a>
          <a href="#about" className="text-white hover:text-blue-300 transition-colors">About</a>
          <a href="#contact" className="text-white hover:text-blue-300 transition-colors">Contact</a>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
          Get Started
        </button>
      </nav>
    </header>
  );
}