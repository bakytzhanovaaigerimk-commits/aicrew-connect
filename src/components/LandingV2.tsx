'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function LandingV2() {
  const matrixRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Matrix rain effect
    if (matrixRef.current) {
      const chars = '01アイクルーコネクト';
      for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.className = 'absolute text-green-400 font-mono text-sm opacity-20';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDelay = Math.random() * 5 + 's';

        for (let j = 0; j < 20; j++) {
          const char = document.createElement('div');
          char.textContent = chars[Math.floor(Math.random() * chars.length)];
          column.appendChild(char);
        }

        matrixRef.current.appendChild(column);

        anime({
          targets: column,
          translateY: ['100vh', '-100vh'],
          duration: 5000 + Math.random() * 3000,
          loop: true,
          delay: Math.random() * 2000,
          easing: 'linear'
        });
      }
    }

    // Glitch title effect
    if (titleRef.current) {
      const glitchAnimation = () => {
        anime({
          targets: titleRef.current,
          translateX: [
            { value: -2, duration: 50 },
            { value: 2, duration: 50 },
            { value: 0, duration: 50 }
          ],
          textShadow: [
            { value: '2px 0 #ff0000, -2px 0 #00ffff', duration: 100 },
            { value: 'none', duration: 100 }
          ],
          complete: () => {
            setTimeout(glitchAnimation, Math.random() * 3000 + 2000);
          }
        });
      };

      // Initial title animation
      anime({
        targets: titleRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000,
        easing: 'easeOutQuart',
        complete: glitchAnimation
      });
    }

    // Grid lines animation
    if (gridRef.current) {
      const gridLines = Array.from({ length: 20 }, (_, i) => {
        const line = document.createElement('div');
        line.className = i % 2 === 0 ?
          'absolute h-px bg-cyan-400 opacity-30' :
          'absolute w-px bg-cyan-400 opacity-30';

        if (i % 2 === 0) {
          line.style.width = '100%';
          line.style.top = (i * 5) + '%';
        } else {
          line.style.height = '100%';
          line.style.left = (i * 5) + '%';
        }

        gridRef.current?.appendChild(line);
        return line;
      });

      anime({
        targets: gridLines,
        scaleX: (i: number) => i % 2 === 0 ? [0, 1] : 1,
        scaleY: (i: number) => i % 2 !== 0 ? [0, 1] : 1,
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuart'
      });
    }

    // Scanning line effect
    if (scanlineRef.current) {
      anime({
        targets: scanlineRef.current,
        translateY: ['0%', '100vh'],
        duration: 3000,
        loop: true,
        easing: 'linear'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Matrix rain background */}
      <div ref={matrixRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Grid overlay */}
      <div ref={gridRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Scanning line */}
      <div
        ref={scanlineRef}
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 pointer-events-none"
      ></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl">
          <div className="mb-4 text-cyan-400 font-mono text-sm tracking-wider">
            {'>'} SYSTEM INITIALIZED
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-white mb-8 font-mono opacity-0"
            style={{
              textShadow: '0 0 20px #00ffff40'
            }}
          >
            AI_CREW_CONNECT
          </h1>

          <div className="text-green-400 font-mono text-lg mb-8">
            <div className="typewriter">
              CONNECTING MINDS • BUILDING FUTURE • ERROR_404_LIMITS_NOT_FOUND
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-mono uppercase tracking-wider overflow-hidden transition-all duration-300 hover:text-black">
              <span className="relative z-10">EXECUTE</span>
              <div className="absolute inset-0 bg-cyan-400 transform skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-green-400 text-green-400 font-mono uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all duration-300">
              DOWNLOAD
            </button>
          </div>

          <div className="mt-12 text-gray-500 font-mono text-xs">
            CONNECTION_STATUS: SECURE • ENCRYPTION: QUANTUM • ACCESS_LEVEL: ADMIN
          </div>
        </div>
      </div>

      <style jsx>{`
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 4s steps(60, end) infinite;
        }

        @keyframes typing {
          0%, 20% { width: 0 }
          80%, 100% { width: 100% }
        }
      `}</style>
    </div>
  );
}