"use client"
import { useEffect, useRef, useState } from "react"
import anime from "animejs/lib/anime.es.js"
import Link from "next/link"
import RegistrationModal from "@/components/RegistrationModal"

export default function VibeCoding() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  })

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(`Вайб Кодинг - ${plan}`)
    setIsModalOpen(true)
  }

  useEffect(() => {
    // Cyberpunk background effects
    if (backgroundRef.current) {
      const lines = Array.from({ length: 8 }, (_, i) => {
        const line = document.createElement('div')
        line.className = 'absolute bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent'
        line.style.width = '100%'
        line.style.height = '2px'
        line.style.top = Math.random() * 100 + '%'
        line.style.left = '0'

        backgroundRef.current?.appendChild(line)

        anime({
          targets: line,
          translateX: ['-100%', '200%'],
          opacity: [0, 1, 0],
          duration: anime.random(3000, 6000),
          loop: true,
          delay: anime.random(0, 3000),
          easing: 'linear'
        })
      })

      // Floating dots
      const dots = Array.from({ length: 20 }, (_, i) => {
        const dot = document.createElement('div')
        dot.className = 'absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60'
        dot.style.left = Math.random() * 100 + '%'
        dot.style.top = Math.random() * 100 + '%'

        backgroundRef.current?.appendChild(dot)

        anime({
          targets: dot,
          translateY: [0, -50, 0],
          scale: [0.5, 1.5, 0.5],
          opacity: [0.3, 1, 0.3],
          duration: anime.random(4000, 8000),
          loop: true,
          delay: anime.random(0, 2000),
          easing: 'easeInOutSine'
        })
      })
    }

    // Page animations
    anime.timeline({
      easing: 'easeOutExpo'
    })
    .add({
      targets: '.hero-content',
      opacity: [0, 1],
      translateY: [100, 0],
      scale: [0.9, 1],
      duration: 1500,
      delay: 300
    })
    .add({
      targets: '.section-item',
      opacity: [0, 1],
      translateY: [60, 0],
      delay: anime.stagger(200),
      duration: 1000
    }, '-=800')
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Cyberpunk Background */}
      <div ref={backgroundRef} className="fixed inset-0 pointer-events-none z-0"></div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 opacity-5 z-0" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-2xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">💻</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg opacity-30 blur animate-pulse"></div>
              </div>
              <div>
                <div className="text-2xl font-black text-white tracking-tight">VIBE CODING</div>
                <div className="text-sm text-cyan-300 font-medium">Code The Future</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-white/70 hover:text-cyan-400 transition-colors font-medium">
                Главная
              </Link>
              <Link href="/vibe-coding" className="text-cyan-400 font-bold">
                Вайб Кодинг
              </Link>
              <Link href="/ai-creator" className="text-white/70 hover:text-cyan-400 transition-colors font-medium">
                AI Creator
              </Link>
              <Link href="/ai-kids" className="text-white/70 hover:text-cyan-400 transition-colors font-medium">
                AI Kids
              </Link>
            </div>

            <button
              onClick={() => handlePlanSelect('Общий курс')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 font-bold">
              ЗАПИСАТЬСЯ
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-7xl mx-auto">
          <div className="hero-content opacity-0">
            {/* Glitch Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-lg mb-8 glitch-border">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-cyan-300 font-mono font-bold">&gt; SYSTEM_OVERRIDE.EXE</span>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-tight font-mono">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 glitch-text">
                VIBE
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl text-cyan-400 mt-4">
                CODING
              </span>
            </h1>

            {/* Matrix subtitle */}
            <div className="text-2xl md:text-3xl text-cyan-300 mb-8 font-mono">
              &gt; ОСВОЙ ЗА 3 МЕСЯЦА
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-16">
              ПОЛУЧИ РАБОТУ В США ОТ <span className="text-green-400 animate-pulse">$8-25/ЧАС</span>
            </div>

            {/* Terminal */}
            <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-8 max-w-4xl mx-auto mb-16 text-left">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 text-white/70 text-sm font-mono">terminal@vibe-coding:~$</div>
              </div>
              <div className="font-mono text-cyan-300 space-y-2">
                <div>$ ./start_revolution.sh</div>
                <div className="text-green-400">&gt; Initializing VIBE CODING protocol...</div>
                <div className="text-yellow-400">&gt; Loading future-tech modules...</div>
                <div className="text-blue-400">&gt; Connecting to USA job market...</div>
                <div className="text-cyan-400">&gt; Ready to transform your life!</div>
                <div className="text-white animate-pulse">▊</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => handlePlanSelect('Трансформация')}
                className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xl rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30">
                <span className="relative z-10">&gt; ЗАПУСТИТЬ ТРАНСФОРМАЦИЮ</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
              <button className="px-12 py-5 border-2 border-cyan-500/50 text-cyan-400 rounded-lg hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-xl text-xl font-mono font-bold">
                &gt; СМОТРЕТЬ ДЕМО
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="relative z-10 py-24 px-6 bg-red-500/5 backdrop-blur-sm border-y border-red-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-mono">
              &gt; SYSTEM ERROR DETECTED
            </h2>
            <p className="text-xl text-red-400 font-mono">ПОЧЕМУ МЕСТНЫЕ IT-ЗАРПЛАТЫ НЕ РАСТУТ?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="section-item group p-8 bg-red-500/10 backdrop-blur-xl rounded-lg border border-red-500/30 hover:border-red-400 transition-all duration-300 opacity-0">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mr-6">
                  <span className="text-3xl">💸</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono">[ERROR] СИСТЕМНЫЙ СБОЙ</h3>
                  <div className="text-red-400 text-sm font-mono">status: CRITICAL</div>
                </div>
              </div>
              <p className="text-gray-300 font-mono text-sm">
                &gt; Местные IT зарплаты $300-800/месяц - это баг в матрице
              </p>
            </div>

            <div className="section-item group p-8 bg-red-500/10 backdrop-blur-xl rounded-lg border border-red-500/30 hover:border-red-400 transition-all duration-300 opacity-0">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mr-6">
                  <span className="text-3xl">🌐</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono">[BLOCKED] ДОСТУП ЗАБЛОКИРОВАН</h3>
                  <div className="text-red-400 text-sm font-mono">connection: DENIED</div>
                </div>
              </div>
              <p className="text-gray-300 font-mono text-sm">
                &gt; Нет прямого подключения к американским проектам
              </p>
            </div>

            <div className="section-item group p-8 bg-red-500/10 backdrop-blur-xl rounded-lg border border-red-500/30 hover:border-red-400 transition-all duration-300 opacity-0">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mr-6">
                  <span className="text-3xl">🔒</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono">[LEGACY] УСТАРЕВШИЙ КОД</h3>
                  <div className="text-red-400 text-sm font-mono">version: DEPRECATED</div>
                </div>
              </div>
              <p className="text-gray-300 font-mono text-sm">
                &gt; Традиционное программирование занимает годы
              </p>
            </div>

            <div className="section-item group p-8 bg-red-500/10 backdrop-blur-xl rounded-lg border border-red-500/30 hover:border-red-400 transition-all duration-300 opacity-0">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mr-6">
                  <span className="text-3xl">⚠️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-mono">[WARNING] НЕТ ГАРАНТИЙ</h3>
                  <div className="text-red-400 text-sm font-mono">guarantee: NULL</div>
                </div>
              </div>
              <p className="text-gray-300 font-mono text-sm">
                &gt; Большинство курсов не дают гарантии трудоустройства
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 font-mono">
              &gt; SOLUTION_FOUND
            </h2>
            <div className="text-2xl text-cyan-400 font-mono mb-4">КОСМИЧЕСКАЯ ПРОГРАММА ОБУЧЕНИЯ</div>
            <div className="text-3xl font-bold text-white">ТВОЁ БУДУЩЕЕ</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Module 1: WEB */}
            <div className="section-item group p-8 bg-blue-500/10 backdrop-blur-xl rounded-lg border border-blue-500/30 hover:border-blue-400 transition-all duration-500 opacity-0">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-mono">MODULE_1: WEB</h3>
                <p className="text-blue-300 font-mono text-sm">8 уроков киберпанк веб-разработки</p>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; HTML.exe
                </div>
                <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; CSS.framework
                </div>
                <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; JavaScript.core
                </div>
                <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; React.library
                </div>
              </div>
            </div>

            {/* Module 2: MOBILE */}
            <div className="section-item group p-8 bg-purple-500/10 backdrop-blur-xl rounded-lg border border-purple-500/30 hover:border-purple-400 transition-all duration-500 opacity-0">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-mono">MODULE_2: MOBILE</h3>
                <p className="text-purple-300 font-mono text-sm">8 уроков мобильного будущего</p>
              </div>
              <div className="space-y-3">
                <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; ReactNative.framework
                </div>
                <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; Flutter.sdk
                </div>
                <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; MobileUI.design
                </div>
                <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; AppStore.deploy
                </div>
              </div>
            </div>

            {/* Module 3: API */}
            <div className="section-item group p-8 bg-green-500/10 backdrop-blur-xl rounded-lg border border-green-500/30 hover:border-green-400 transition-all duration-500 opacity-0">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">⚙️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-mono">MODULE_3: API</h3>
                <p className="text-green-300 font-mono text-sm">8 уроков автоматизации</p>
              </div>
              <div className="space-y-3">
                <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; NodeJS.runtime
                </div>
                <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; Python.script
                </div>
                <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; REST.api
                </div>
                <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded font-mono text-sm">
                  &gt; Automation.bot
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="relative z-10 py-24 px-6 bg-green-500/5 backdrop-blur-sm border-y border-green-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-mono">
              &gt; SUCCESS_STORIES.LOG
            </h2>
            <p className="text-xl text-green-400 font-mono">НАШИ ВЫПУСКНИКИ РАБОТАЮТ В АМЕРИКЕ</p>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl rounded-lg border border-green-500/30 p-10 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-lg mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-300 font-mono text-sm">STATUS: EMPLOYED</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-4 font-mono">SAIA.IM</h3>
              <p className="text-xl text-gray-300 mb-6">ИИ-Платформа для автоматизации</p>
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                <div className="text-3xl font-bold text-green-400 font-mono">$18-25/час</div>
                <div className="bg-purple-500 text-white px-4 py-2 rounded font-mono font-bold">SENIOR_DEV</div>
                <div className="text-cyan-400 font-mono">Киберпанк мастер</div>
              </div>
            </div>

            <div className="bg-black/50 rounded-lg p-6 border border-cyan-500/30">
              <div className="flex items-start gap-4">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-gray-300 font-mono text-lg italic mb-4">
                    &quot;Получила $1000 за первый проект. Переделывала 3 раза, но уложилась в сроки и теперь работает на автомате&quot;
                  </p>
                  <p className="text-cyan-400 font-mono font-bold">- Анна, выпускница</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-mono">
              &gt; CHOOSE_YOUR_PATH
            </h2>
            <p className="text-xl text-cyan-300 font-mono">ВЫБЕРИ СВОЙ ПЛАН ОБУЧЕНИЯ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Базовый план */}
            <div className="section-item p-8 bg-blue-500/10 backdrop-blur-xl rounded-lg border border-blue-500/30 hover:border-blue-400 transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 font-mono">Базовый</h3>
                <div className="text-4xl font-black text-cyan-400 mb-6 font-mono">
                  45 000 ₸
                  <span className="text-lg text-cyan-300 block">/ месяц</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-cyan-300 font-mono">
                  <span className="text-cyan-400 mr-2">▸</span>
                  Групповые занятия
                </div>
                <div className="flex items-center text-cyan-300 font-mono">
                  <span className="text-cyan-400 mr-2">▸</span>
                  Материалы курса
                </div>
                <div className="flex items-center text-cyan-300 font-mono">
                  <span className="text-cyan-400 mr-2">▸</span>
                  Фотоотчёт для родителей
                </div>
                <div className="flex items-center text-cyan-300 font-mono">
                  <span className="text-cyan-400 mr-2">▸</span>
                  Сертификат об окончании
                </div>
              </div>
              <button
                onClick={() => handlePlanSelect('Базовый')}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 font-mono"
              >
                Выбрать план
              </button>
            </div>

            {/* Стандарт план */}
            <div className="section-item p-8 bg-purple-500/10 backdrop-blur-xl rounded-lg border border-purple-500/30 hover:border-purple-400 transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold font-mono">
                  Популярный
                </div>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 font-mono">Стандарт</h3>
                <div className="text-4xl font-black text-purple-400 mb-6 font-mono">
                  60 000 ₸
                  <span className="text-lg text-purple-300 block">/ месяц</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-purple-300 font-mono">
                  <span className="text-purple-400 mr-2">▸</span>
                  Всё из пакета «Базовый»
                </div>
                <div className="flex items-center text-purple-300 font-mono">
                  <span className="text-purple-400 mr-2">▸</span>
                  Индивидуальный проект
                </div>
                <div className="flex items-center text-purple-300 font-mono">
                  <span className="text-purple-400 mr-2">▸</span>
                  Презентация проекта
                </div>
                <div className="flex items-center text-purple-300 font-mono">
                  <span className="text-purple-400 mr-2">▸</span>
                  Дополнительные материалы
                </div>
              </div>
              <button
                onClick={() => handlePlanSelect('Стандарт')}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 font-mono"
              >
                Выбрать план
              </button>
            </div>

            {/* Премиум план */}
            <div className="section-item p-8 bg-yellow-500/10 backdrop-blur-xl rounded-lg border border-yellow-500/30 hover:border-yellow-400 transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 font-mono">Премиум</h3>
                <div className="text-4xl font-black text-yellow-400 mb-6 font-mono">
                  95 000 ₸
                  <span className="text-lg text-yellow-300 block">/ месяц</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-yellow-300 font-mono">
                  <span className="text-yellow-400 mr-2">▸</span>
                  Всё из пакета «Стандарт»
                </div>
                <div className="flex items-center text-yellow-300 font-mono">
                  <span className="text-yellow-400 mr-2">▸</span>
                  Индивидуальный ментор
                </div>
                <div className="flex items-center text-yellow-300 font-mono">
                  <span className="text-yellow-400 mr-2">▸</span>
                  Персональный трек обучения
                </div>
                <div className="flex items-center text-yellow-300 font-mono">
                  <span className="text-yellow-400 mr-2">▸</span>
                  1-на-1 сессии
                </div>
              </div>
              <button
                onClick={() => handlePlanSelect('Премиум')}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 transform hover:scale-105 font-mono"
              >
                Выбрать план
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Registration */}
      <section className="relative z-10 py-24 px-6 bg-black/20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl rounded-lg border border-cyan-500/30 p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-mono">
                &gt; БЫСТРАЯ ЗАЯВКА
              </h2>
              <p className="text-lg text-cyan-300 font-mono">ОСТАВЬ КОНТАКТЫ И МЫ СВЯЖЕМСЯ</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-cyan-300 font-mono mb-3">&gt; ИМЯ:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-300 placeholder-cyan-600 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label className="block text-cyan-300 font-mono mb-3">&gt; ТЕЛЕФОН:</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-6 py-4 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-300 placeholder-cyan-600 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  placeholder="+7 ___ ___ ____"
                />
              </div>

              <button
                type="button"
                onClick={() => handlePlanSelect('Быстрая заявка')}
                className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xl rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 font-mono"
              >
                &gt; ОТПРАВИТЬ ЗАЯВКУ
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 bg-black/40 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-cyan-400 font-mono text-sm mb-4">
              &gt; CONTACT_PROTOCOLS:
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-cyan-300 font-mono">
              <a href="mailto:dias@aicrewconnect.com" className="hover:text-cyan-400 transition-colors">
                email: dias@aicrewconnect.com
              </a>
              <a href="https://t.me/z_dias_c" className="hover:text-cyan-400 transition-colors">
                telegram: @z_dias_c
              </a>
            </div>
            <div className="mt-8 text-gray-500 font-mono text-xs">
              © 2025 VIBE-CODING.exe | FUTURE.STARTS.NOW 💀
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .glitch-text {
          animation: glitch 2s linear infinite;
        }

        .glitch-border {
          animation: borderGlitch 3s linear infinite;
        }

        @keyframes glitch {
          2%, 64% {
            transform: translate(2px, 0) skew(0deg);
          }
          4%, 60% {
            transform: translate(-2px, 0) skew(0deg);
          }
          62% {
            transform: translate(0, 0) skew(5deg);
          }
        }

        @keyframes borderGlitch {
          0%, 100% {
            border-color: rgba(6, 182, 212, 0.3);
          }
          50% {
            border-color: rgba(6, 182, 212, 0.8);
          }
        }
      `}</style>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourse={selectedPlan || "Вайб Кодинг"}
      />
    </div>
  );
}