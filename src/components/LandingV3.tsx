'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function LandingV3() {
  const cubesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 3D Cubes Animation
    if (cubesRef.current) {
      const cubes = Array.from({ length: 12 }, (_, i) => {
        const cube = document.createElement('div');
        cube.className = `absolute w-16 h-16 transform-gpu transition-all duration-300 cursor-pointer`;
        cube.style.background = `linear-gradient(45deg,
          hsl(${200 + i * 15}, 70%, 60%),
          hsl(${220 + i * 15}, 80%, 70%))`;
        cube.style.borderRadius = '8px';
        cube.style.boxShadow = `0 8px 32px rgba(59, 130, 246, 0.3)`;

        // Isometric positioning
        const row = Math.floor(i / 4);
        const col = i % 4;
        cube.style.left = `${20 + col * 80 - row * 40}px`;
        cube.style.top = `${20 + row * 60 + col * 30}px`;
        cube.style.transform = `perspective(1000px) rotateX(30deg) rotateY(-30deg) translateZ(0)`;

        // Hover effect
        cube.addEventListener('mouseenter', () => {
          anime({
            targets: cube,
            scale: 1.2,
            rotateZ: 180,
            duration: 300,
            easing: 'easeOutBack'
          });
        });

        cube.addEventListener('mouseleave', () => {
          anime({
            targets: cube,
            scale: 1,
            rotateZ: 0,
            duration: 300,
            easing: 'easeOutBack'
          });
        });

        cubesRef.current?.appendChild(cube);
        return cube;
      });

      // Initial cube animation
      anime({
        targets: cubes,
        opacity: [0, 1],
        translateY: [100, 0],
        rotateX: [90, 30],
        rotateY: [-90, -30],
        delay: anime.stagger(150),
        duration: 1000,
        easing: 'easeOutElastic(1, .8)'
      });

      // Continuous floating animation
      anime({
        targets: cubes,
        translateY: '+=10',
        duration: 2000,
        loop: true,
        direction: 'alternate',
        delay: anime.stagger(200),
        easing: 'easeInOutSine'
      });
    }

    // 3D Title Animation
    if (titleRef.current) {
      anime({
        targets: titleRef.current.children,
        opacity: [0, 1],
        translateZ: [200, 0],
        rotateY: [90, 0],
        scale: [0.5, 1],
        delay: anime.stagger(100),
        duration: 1000,
        easing: 'easeOutElastic(1, .6)'
      });
    }

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });

      if (cubesRef.current) {
        anime({
          targets: cubesRef.current.children,
          rotateY: -30 + x * 10,
          rotateX: 30 + y * 10,
          duration: 300,
          easing: 'easeOutQuart'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden relative perspective-1000">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform skew-y-12 scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500 to-transparent transform -skew-x-12 scale-150"></div>
      </div>

      {/* 3D Cubes Container */}
      <div
        ref={cubesRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 preserve-3d"
        style={{
          transform: `translate(-50%, -50%) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
        }}
      ></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-white mb-8 preserve-3d"
            style={{
              perspective: '1000px',
              textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
            }}
          >
            {'AI CREW CONNECT'.split(' ').map((word, i) => (
              <span key={i} className="inline-block mx-4" style={{
                transformStyle: 'preserve-3d'
              }}>
                {word}
              </span>
            ))}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 opacity-0"
             style={{
               animation: 'slideInUp 1s ease-out 1.5s forwards',
               transform: 'perspective(1000px) rotateX(20deg)'
             }}>
            Погрузитесь в будущее технологий
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0"
               style={{animation: 'slideInUp 1s ease-out 2s forwards'}}>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transform transition-all duration-300 hover:scale-110 hover:rotate-2 preserve-3d">
              <span className="relative z-10">Исследовать</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>

            <button className="px-8 py-4 border-2 border-white text-white rounded-lg transform transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover:-rotate-2">
              Демо
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto opacity-0"
               style={{animation: 'slideInUp 1s ease-out 2.5s forwards'}}>
            {['Инновации', 'Качество', 'Результат'].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white/10 backdrop-blur-lg rounded-xl transform transition-all duration-300 hover:scale-105 hover:bg-white/20"
                style={{
                  transform: `perspective(1000px) rotateY(${i * 5 - 5}deg)`
                }}
              >
                <div className="text-4xl mb-4">
                  {['🚀', '⭐', '🎯'][i]}
                </div>
                <h3 className="text-white font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 50px, -100px) rotateX(20deg);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
}