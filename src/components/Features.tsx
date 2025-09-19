'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Matching',
    description: 'Интеллектуальный подбор команд на основе навыков, опыта и совместимости.'
  },
  {
    icon: '👥',
    title: 'Global Community',
    description: 'Подключайтесь к международному сообществу разработчиков и AI-специалистов.'
  },
  {
    icon: '🚀',
    title: 'Fast Deployment',
    description: 'Быстрый запуск проектов с готовыми командами и инструментами.'
  },
  {
    icon: '🔒',
    title: 'Secure Collaboration',
    description: 'Безопасная платформа для совместной работы с защитой данных.'
  },
  {
    icon: '📊',
    title: 'Analytics & Insights',
    description: 'Глубокая аналитика производительности команды и проектов.'
  },
  {
    icon: '⚡',
    title: 'Real-time Communication',
    description: 'Мгновенное общение и обмен файлами в режиме реального времени.'
  }
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: titleRef.current,
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 800,
              easing: 'easeOutExpo'
            });

            anime({
              targets: cardsRef.current?.children,
              opacity: [0, 1],
              translateY: [100, 0],
              scale: [0.8, 1],
              delay: anime.stagger(150),
              duration: 800,
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl font-bold text-center text-white mb-16 opacity-0"
        >
          Наши возможности
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 opacity-0"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}