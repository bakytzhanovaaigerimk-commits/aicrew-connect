'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function LandingV4() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const waveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Create particle system
    if (particlesRef.current) {
      const particles = Array.from({ length: 100 }, (_, i) => {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full opacity-70';

        const size = Math.random() * 6 + 2;
        const hue = Math.random() * 60 + 200; // Blue to purple range

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = `hsl(${hue}, 70%, 60%)`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, 70%, 60%)`;

        particlesRef.current?.appendChild(particle);

        // Particle physics animation
        const animateParticle = () => {
          anime({
            targets: particle,
            translateX: () => anime.random(-300, 300),
            translateY: () => anime.random(-300, 300),
            scale: [1, 0.5, 1],
            opacity: [0.7, 0.2, 0.7],
            duration: anime.random(3000, 8000),
            easing: 'easeInOutSine',
            complete: animateParticle
          });
        };

        setTimeout(animateParticle, Math.random() * 2000);
        return particle;
      });

      // Mouse attraction effect
      const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        particles.forEach(particle => {
          const rect = particle.getBoundingClientRect();
          const particleX = rect.left + rect.width / 2;
          const particleY = rect.top + rect.height / 2;

          const distance = Math.sqrt((mouseX - particleX) ** 2 + (mouseY - particleY) ** 2);

          if (distance < 150) {
            const force = (150 - distance) / 150;
            const deltaX = (mouseX - particleX) * force * 0.1;
            const deltaY = (mouseY - particleY) * force * 0.1;

            anime({
              targets: particle,
              translateX: `+=${deltaX}`,
              translateY: `+=${deltaY}`,
              scale: 1 + force * 0.5,
              duration: 300,
              easing: 'easeOutQuart'
            });
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
    }

    // Liquid text effect
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = text.split('').map((char, i) =>
        char === ' ' ? ' ' : `<span style="display: inline-block; transform-origin: center;">${char}</span>`
      ).join('');

      anime({
        targets: titleRef.current.children,
        scale: [0, 1],
        rotateY: [180, 0],
        opacity: [0, 1],
        elasticity: 600,
        delay: anime.stagger(100),
        duration: 1200
      });

      // Continuous wave effect
      anime({
        targets: titleRef.current.children,
        translateY: '+=20',
        duration: 2000,
        delay: anime.stagger(50),
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      });
    }

    // Animated wave
    if (waveRef.current) {
      anime({
        targets: waveRef.current,
        d: [
          { value: 'M0,100 Q150,50 300,100 T600,100 L600,200 L0,200 Z' },
          { value: 'M0,100 Q150,150 300,100 T600,100 L600,200 L0,200 Z' }
        ],
        duration: 3000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative">
      {/* Particle System */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Animated Wave */}
      <svg className="absolute bottom-0 w-full h-40" viewBox="0 0 600 200" preserveAspectRatio="none">
        <path
          ref={waveRef}
          d="M0,100 Q150,50 300,100 T600,100 L600,200 L0,200 Z"
          fill="rgba(255,255,255,0.1)"
        />
      </svg>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-white mb-8"
            style={{
              background: 'linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
            }}
          >
            AI CREW CONNECT
          </h1>

          <div className="space-y-6 mb-12">
            <p className="text-xl text-gray-300 opacity-0"
               style={{animation: 'fadeInUp 1s ease-out 2s forwards'}}>
              Где частицы встречаются с возможностями
            </p>

            <div className="flex justify-center space-x-8 opacity-0"
                 style={{animation: 'fadeInUp 1s ease-out 2.5s forwards'}}>
              {['Физика', 'Красота', 'Интерактив'].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-2xl transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                    {['⚡', '✨', '🎯'][i]}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0"
               style={{animation: 'fadeInUp 1s ease-out 3s forwards'}}>
            <button className="group relative px-8 py-4 bg-transparent border-2 border-purple-400 text-purple-400 rounded-full overflow-hidden transition-all duration-500 hover:text-white">
              <span className="relative z-10">Запустить симуляцию</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>

            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
              Исследовать
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}