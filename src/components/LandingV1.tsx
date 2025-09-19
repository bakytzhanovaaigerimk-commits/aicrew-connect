'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function LandingV1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Morphing shapes animation
    if (shapesRef.current) {
      const shapes = shapesRef.current.children;

      anime({
        targets: shapes,
        translateX: () => anime.random(-200, 200),
        translateY: () => anime.random(-200, 200),
        scale: [0, 1],
        rotate: () => anime.random(0, 360),
        opacity: [0, 0.8],
        duration: 2000,
        delay: anime.stagger(200),
        easing: 'easeOutElastic(1, .8)',
        complete: () => {
          // Floating animation
          anime({
            targets: shapes,
            translateX: () => `+=${anime.random(-50, 50)}`,
            translateY: () => `+=${anime.random(-30, 30)}`,
            rotate: () => `+=${anime.random(-45, 45)}`,
            duration: 4000,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine'
          });
        }
      });
    }

    // Text morphing effect
    if (titleRef.current) {
      const text = titleRef.current;
      const letters = text.textContent?.split('') || [];
      text.innerHTML = letters.map(letter =>
        letter === ' ' ? ' ' : `<span style="display:inline-block;">${letter}</span>`
      ).join('');

      anime({
        targets: text.children,
        translateY: [-100, 0],
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: [180, 0],
        delay: anime.stagger(100),
        duration: 1000,
        easing: 'easeOutBack'
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Floating geometric shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute w-20 h-20 bg-blue-400 rounded-full opacity-0" />
        <div className="absolute w-16 h-16 bg-purple-400 transform rotate-45 opacity-0" />
        <div className="absolute w-24 h-24 bg-pink-400 rounded-full opacity-0" />
        <div className="absolute w-12 h-12 bg-cyan-400 transform rotate-45 opacity-0" />
        <div className="absolute w-18 h-18 bg-yellow-400 rounded-full opacity-0" />
        <div className="absolute w-14 h-14 bg-green-400 transform rotate-45 opacity-0" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-white mb-8"
          >
            AI CREW CONNECT
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 opacity-0"
             style={{animation: 'fadeInUp 1s ease-out 2s forwards'}}>
            Минимализм. Элегантность. Инновации.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0"
               style={{animation: 'fadeInUp 1s ease-out 2.5s forwards'}}>
            <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Начать</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300">
              Узнать больше
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}