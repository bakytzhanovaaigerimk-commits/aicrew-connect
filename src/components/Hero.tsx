'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
    });

    timeline
      .add({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [100, 0],
        duration: 1000,
        delay: 600,
      })
      .add({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
      }, '-=500')
      .add({
        targets: buttonsRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
      }, '-=300');

    if (particlesRef.current) {
      const particles = Array.from({ length: 50 }, (_, i) => {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-blue-400 rounded-full opacity-20';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particlesRef.current?.appendChild(particle);
        return particle;
      });

      anime({
        targets: particles,
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        scale: [0, 1, 0],
        opacity: [0, 0.6, 0],
        duration: 3000,
        delay: anime.stagger(100),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      });
    }
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

      <div className="text-center z-10 max-w-6xl mx-auto px-6">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-white mb-6 opacity-0"
        >
          AI CREW
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            CONNECT
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto opacity-0"
        >
          Объединяем лучших IT-специалистов с передовыми AI-технологиями.
          Создавайте будущее вместе с нами.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center opacity-0">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
            Начать работу
          </button>
          <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:border-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
            Узнать больше
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}