'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function LandingV6() {
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Synthwave grid animation
    if (gridRef.current) {
      const gridLines = Array.from({ length: 40 }, (_, i) => {
        const line = document.createElement('div');
        line.className = 'absolute border-purple-500 opacity-30';

        if (i < 20) {
          // Horizontal lines
          line.style.width = '100%';
          line.style.height = '1px';
          line.style.borderTop = '1px solid';
          line.style.top = `${(i * 5) + 50}%`;
          line.style.left = '0';
        } else {
          // Vertical lines
          line.style.height = '50%';
          line.style.width = '1px';
          line.style.borderLeft = '1px solid';
          line.style.left = `${((i - 20) * 5)}%`;
          line.style.bottom = '0';
        }

        gridRef.current?.appendChild(line);

        // Perspective animation
        anime({
          targets: line,
          opacity: [0.3, 0.8, 0.3],
          duration: 3000 + Math.random() * 2000,
          delay: Math.random() * 1000,
          loop: true,
          easing: 'easeInOutSine'
        });

        return line;
      });

      // Grid perspective effect
      anime({
        targets: gridRef.current,
        rotateX: [0, 60],
        duration: 2000,
        easing: 'easeOutQuart'
      });
    }

    // Retro sun animation
    if (sunRef.current) {
      // Create sun rings
      Array.from({ length: 8 }, (_, i) => {
        const ring = document.createElement('div');
        ring.className = 'absolute rounded-full border-2 border-yellow-400';
        const size = 50 + i * 20;
        ring.style.width = size + 'px';
        ring.style.height = size + 'px';
        ring.style.left = '50%';
        ring.style.top = '50%';
        ring.style.transform = 'translate(-50%, -50%)';
        ring.style.opacity = String(0.8 - i * 0.1);

        sunRef.current?.appendChild(ring);

        anime({
          targets: ring,
          scale: [1, 1.1, 1],
          opacity: [0.8 - i * 0.1, 0.4 - i * 0.05, 0.8 - i * 0.1],
          duration: 2000 + i * 200,
          loop: true,
          easing: 'easeInOutSine'
        });
      });
    }

    // Glitch title effect
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = text.split('').map((char, i) =>
        char === ' ' ? ' ' : `<span class="inline-block retro-char" data-char="${char}">${char}</span>`
      ).join('');

      anime({
        targets: '.retro-char',
        translateY: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 1000,
        easing: 'easeOutBack'
      });

      // Random glitch effect
      setInterval(() => {
        const chars = titleRef.current?.querySelectorAll('.retro-char');
        if (chars) {
          const randomChar = chars[Math.floor(Math.random() * chars.length)] as HTMLElement;
          const originalChar = randomChar.dataset.char;

          anime({
            targets: randomChar,
            translateX: [0, 10, -10, 0],
            color: ['#ffffff', '#ff0080', '#00ffff', '#ffffff'],
            duration: 200,
            complete: () => {
              randomChar.textContent = originalChar || '';
            }
          });
        }
      }, 3000);
    }

    // Audio waveform visualization
    if (waveformRef.current) {
      const bars = Array.from({ length: 20 }, (_, i) => {
        const bar = document.createElement('div');
        bar.className = 'bg-gradient-to-t from-pink-500 to-cyan-400 mx-1';
        bar.style.width = '8px';
        bar.style.height = '20px';
        bar.style.minHeight = '4px';

        waveformRef.current?.appendChild(bar);

        anime({
          targets: bar,
          height: () => Math.random() * 60 + 10 + 'px',
          duration: 600,
          loop: true,
          delay: i * 50,
          easing: 'easeInOutSine'
        });

        return bar;
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-black overflow-hidden relative">
      {/* Synthwave Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      ></div>

      {/* Retro Sun */}
      <div
        ref={sunRef}
        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-60 h-60 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-radial from-yellow-400 via-orange-500 to-pink-600 rounded-full opacity-80"></div>
      </div>

      {/* Neon Mountains */}
      <div className="absolute bottom-0 w-full h-40 opacity-60">
        <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <polygon
            points="0,400 300,100 500,200 800,50 1200,150 1200,400"
            fill="url(#mountainGradient)"
            stroke="#ff0080"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff0080" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl">
          <div className="mb-8 text-cyan-400 font-mono text-sm tracking-wider opacity-0"
               style={{animation: 'neonGlow 2s ease-out 0.5s forwards'}}>
            ▶ LOADING SYNTHWAVE PROTOCOL...
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-8 retro-title"
            style={{
              fontFamily: 'monospace',
              background: 'linear-gradient(45deg, #ff0080, #00ffff, #ff0080)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px #ff0080, 0 0 60px #00ffff',
              filter: 'drop-shadow(0 0 20px #ff0080)'
            }}
          >
            AI CREW CONNECT
          </h1>

          <p className="text-xl text-pink-300 mb-8 font-mono opacity-0"
             style={{animation: 'slideInUp 1s ease-out 2s forwards'}}>
            {'>'} RETRO.FUTURE.CONNECT_
          </p>

          {/* Audio Waveform */}
          <div className="flex justify-center items-end h-20 mb-12 opacity-0"
               style={{animation: 'fadeIn 1s ease-out 2.5s forwards'}}>
            <div ref={waveformRef} className="flex items-end"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0"
               style={{animation: 'slideInUp 1s ease-out 3s forwards'}}>
            <button className="group relative px-8 py-4 bg-transparent border-2 border-pink-500 text-pink-500 font-mono uppercase tracking-wider overflow-hidden transition-all duration-300 hover:text-white">
              <span className="relative z-10">◄ EXECUTE</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-400 transform skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-mono uppercase tracking-wider transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50">
              ► VAPORWAVE
            </button>
          </div>

          <div className="mt-16 flex justify-center space-x-8 opacity-0"
               style={{animation: 'fadeIn 1s ease-out 3.5s forwards'}}>
            {['🎵', '📼', '🕹️', '📺'].map((icon, i) => (
              <div
                key={i}
                className="w-12 h-12 flex items-center justify-center text-2xl bg-pink-500/20 border border-pink-500 rounded transform transition-all duration-300 hover:scale-125 hover:rotate-12 hover:bg-pink-500/40"
                style={{animation: `bounce 2s ease-in-out ${i * 0.2}s infinite`}}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes neonGlow {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}