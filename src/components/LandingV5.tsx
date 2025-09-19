'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function LandingV5() {
  const networkRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const neuronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Neural network visualization
    if (networkRef.current && neuronRef.current) {
      const nodes = Array.from({ length: 20 }, (_, i) => {
        const node = document.createElement('div');
        node.className = 'absolute w-3 h-3 bg-cyan-400 rounded-full opacity-60';

        const angle = (i / 20) * Math.PI * 2;
        const radius = 150 + Math.random() * 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        node.style.left = `calc(50% + ${x}px)`;
        node.style.top = `calc(50% + ${y}px)`;
        node.style.transform = 'translate(-50%, -50%)';
        node.style.boxShadow = '0 0 10px cyan';

        networkRef.current?.appendChild(node);

        // Pulsing animation
        anime({
          targets: node,
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
          duration: 2000 + Math.random() * 1000,
          loop: true,
          easing: 'easeInOutSine'
        });

        return { element: node, x, y };
      });

      // Create connections between nodes
      nodes.forEach((nodeA, i) => {
        nodes.slice(i + 1).forEach(nodeB => {
          const distance = Math.sqrt((nodeA.x - nodeB.x) ** 2 + (nodeA.y - nodeB.y) ** 2);

          if (distance < 200 && Math.random() > 0.7) {
            const connection = document.createElement('div');
            connection.className = 'absolute bg-cyan-300 opacity-30';

            const length = distance;
            const angle = Math.atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x);

            connection.style.width = length + 'px';
            connection.style.height = '1px';
            connection.style.left = `calc(50% + ${nodeA.x}px)`;
            connection.style.top = `calc(50% + ${nodeA.y}px)`;
            connection.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
            connection.style.transformOrigin = '0 0';

            networkRef.current?.appendChild(connection);

            // Data flow animation
            anime({
              targets: connection,
              scaleX: [0, 1, 0],
              opacity: [0.3, 0.8, 0.3],
              duration: 3000,
              loop: true,
              delay: Math.random() * 2000,
              easing: 'easeInOutSine'
            });
          }
        });
      });
    }

    // Organic title animation
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split('') || [];
      titleRef.current.innerHTML = chars.map((char, i) =>
        char === ' ' ? ' ' : `<span class="inline-block" style="transform-origin: center bottom;">${char}</span>`
      ).join('');

      anime({
        targets: titleRef.current.children,
        translateY: [100, 0],
        rotateX: [90, 0],
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: anime.stagger(80),
        duration: 1000,
        easing: 'easeOutElastic(1, .8)'
      });

      // Breathing effect
      anime({
        targets: titleRef.current,
        scale: [1, 1.02, 1],
        duration: 4000,
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    // Central neuron pulse
    if (neuronRef.current) {
      anime({
        targets: neuronRef.current,
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        duration: 4000,
        loop: true,
        easing: 'linear'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden relative">
      {/* Neural Network Background */}
      <div ref={networkRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Central Neuron */}
      <div
        ref={neuronRef}
        className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          boxShadow: '0 0 40px cyan, inset 0 0 20px rgba(255,255,255,0.3)'
        }}
      ></div>

      {/* DNA Helix Background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full"
            style={{
              left: `${10 + (i * 3)}%`,
              top: `${50 + Math.sin(i * 0.5) * 20}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl">
          <div className="mb-8 text-cyan-400 text-sm font-mono tracking-wider opacity-0"
               style={{animation: 'fadeIn 1s ease-out 0.5s forwards'}}>
            {'{'} NEURAL NETWORK INITIALIZED {'}'}
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-8"
            style={{
              background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.5))'
            }}
          >
            AI CREW CONNECT
          </h1>

          <p className="text-xl text-gray-300 mb-12 opacity-0"
             style={{animation: 'fadeInUp 1s ease-out 2s forwards'}}>
            Где искусственный интеллект встречается с человеческим творчеством
          </p>

          {/* Organic Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto opacity-0"
               style={{animation: 'fadeInUp 1s ease-out 2.5s forwards'}}>
            {[
              { value: '99.9%', label: 'Точность', icon: '🎯' },
              { value: '∞', label: 'Возможности', icon: '🚀' },
              { value: '24/7', label: 'Доступность', icon: '⚡' }
            ].map((stat, i) => (
              <div key={i} className="group text-center">
                <div className="text-3xl mb-2 transform transition-transform duration-300 group-hover:scale-125">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0"
               style={{animation: 'fadeInUp 1s ease-out 3s forwards'}}>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Активировать ИИ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>

            <button className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300">
              Изучить сеть
            </button>
          </div>

          <div className="mt-16 text-xs text-gray-500 font-mono opacity-0"
               style={{animation: 'fadeIn 1s ease-out 3.5s forwards'}}>
            SYNAPSES: {Math.floor(Math.random() * 1000000).toLocaleString()} |
            NEURONS: {Math.floor(Math.random() * 10000).toLocaleString()} |
            LEARNING_RATE: 0.{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}