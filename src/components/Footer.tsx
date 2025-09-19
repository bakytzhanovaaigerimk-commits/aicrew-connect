'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: footerRef.current?.children,
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(100),
              duration: 600,
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="border-t border-white/20 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 opacity-0">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-4">AI CREW CONNECT</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Платформа для создания высокопроизводительных IT-команд с использованием искусственного интеллекта.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-white">f</span>
              </button>
              <button className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <span className="text-white">t</span>
              </button>
              <button className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                <span className="text-white">in</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <span className="text-white">gh</span>
              </button>
            </div>
          </div>

          <div className="opacity-0">
            <h4 className="text-xl font-semibold text-white mb-4">Продукт</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Возможности</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Интеграции</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Безопасность</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Цены</a></li>
            </ul>
          </div>

          <div className="opacity-0">
            <h4 className="text-xl font-semibold text-white mb-4">Поддержка</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Документация</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Контакты</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Статус</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 opacity-0">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 AI Crew Connect. Все права защищены.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}