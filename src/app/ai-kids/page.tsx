"use client"
import { useEffect, useRef, useState } from "react"
import anime from "animejs/lib/anime.es.js"
import Link from "next/link"

export default function AIKids() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    telegram: '',
    parent_name: '',
    program: '',
    tariff: '',
    additional_info: '',
    course: 'AI Kids'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Регистрация прошла успешно! Мы свяжемся с вами в ближайшее время.')
        setFormData({
          name: '',
          age: '',
          phone: '',
          email: '',
          telegram: '',
          parent_name: '',
          program: '',
          tariff: '',
          additional_info: '',
          course: 'AI Kids'
        })
      } else {
        setSubmitMessage(data.error || 'Произошла ошибка при регистрации')
      }
    } catch (error) {
      setSubmitMessage('Ошибка сети. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    // Futuristic floating elements for kids
    if (backgroundRef.current) {
      const shapes = Array.from({ length: 15 }, (_, i) => {
        const shape = document.createElement('div')
        const icons = ['◆', '○', '▲', '★', '■', '▼', '◇', '☆', '□', '▽']
        const randomIcon = icons[Math.floor(Math.random() * icons.length)]

        shape.innerHTML = randomIcon
        shape.className = 'absolute text-2xl opacity-30 pointer-events-none text-blue-400'
        shape.style.left = Math.random() * 100 + '%'
        shape.style.top = Math.random() * 100 + '%'
        shape.style.fontSize = (Math.random() * 25 + 15) + 'px'

        backgroundRef.current?.appendChild(shape)

        anime({
          targets: shape,
          translateX: () => anime.random(-150, 150),
          translateY: () => anime.random(-150, 150),
          rotate: () => anime.random(0, 360),
          scale: [0.5, 1.5, 0.7],
          opacity: [0.2, 0.6, 0.2],
          duration: anime.random(10000, 15000),
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine',
          delay: anime.random(0, 4000)
        })
      })
    }

    // Fun animations for kids
    anime.timeline({
      easing: 'easeOutBounce'
    })
    .add({
      targets: '.hero-content',
      opacity: [0, 1],
      translateY: [80, 0],
      scale: [0.8, 1],
      duration: 1500,
      delay: 200
    })
    .add({
      targets: '.age-card',
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.7, 1],
      rotate: [10, 0],
      delay: anime.stagger(200),
      duration: 1000
    }, '-=800')
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4);
        }
        .glow-button {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2);
        }
        .neon-card {
          position: relative;
          border: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.1);
        }
        .neon-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          padding: 2px;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4), rgba(219, 39, 119, 0.4));
          border-radius: inherit;
          z-index: -1;
        }
        .playful-hover:hover {
          transform: scale(1.05) rotate(1deg);
          transition: all 0.3s ease;
        }
      `}</style>

      {/* Playful Tech Background */}
      <div ref={backgroundRef} className="fixed inset-0 pointer-events-none z-0"></div>

      {/* Future Tech Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(219, 39, 119, 0.2) 0%, transparent 40%)'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 neon-card">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white glow-text">AICREW CONNECT</div>
                <div className="text-sm text-blue-400 font-mono">AI Kids</div>
              </div>
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium hover:glow-text">Главная</Link>
              <Link href="/vibe-coding" className="text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium hover:glow-text">Вайб кодинг</Link>
              <Link href="/ai-creator" className="text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium hover:glow-text">AI Creator</Link>
              <Link href="/ai-kids" className="text-blue-400 font-semibold glow-text">AI Kids</Link>
              <Link href="/admin/students" className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 font-medium hover:glow-text">📊 Студенты</Link>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg shadow-blue-500/30 glow-button">
              Записаться
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-6xl mx-auto">
          <div className="hero-content opacity-0">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 glow-text">
                AI KIDS
              </span>
              <span className="block text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 glow-text">
                Магия Искусственного
              </span>
              <span className="block text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 glow-text">
                Интеллекта
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-medium">
              Где фантазии становятся реальностью!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-blue-500/30 p-6 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 neon-card playful-hover">
                <div className="text-4xl mb-3 flex justify-center">
                  <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-white">Рисование</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-purple-500/30 p-6 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 neon-card playful-hover">
                <div className="text-4xl mb-3 flex justify-center">
                  <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-white">Сказки</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-pink-500/30 p-6 shadow-xl hover:shadow-pink-500/20 transition-all duration-300 neon-card playful-hover">
                <div className="text-4xl mb-3 flex justify-center">
                  <svg className="w-12 h-12 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-white">Игры</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-cyan-500/30 p-6 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 neon-card playful-hover">
                <div className="text-4xl mb-3 flex justify-center">
                  <svg className="w-12 h-12 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-white">Мультики</div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-3xl font-bold text-xl shadow-xl shadow-blue-500/30 glow-button">
                Превращаем мечты в реальность!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="relative z-10 py-20 px-6 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 glow-text">
              Программы для Каждого Возраста
            </h2>
            <p className="text-xl text-gray-300">
              От первых шагов до создания собственных проектов
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 8-12 лет */}
            <div className="age-card bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-blue-500/30 p-8 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 opacity-0 neon-card">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">8-12 лет</h3>
                <p className="text-gray-300 text-lg">Юные исследователи</p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-700/50 rounded-2xl p-6 border border-blue-500/20">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-blue-500/30">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">Знакомство с ИИ</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center"><span className="text-blue-400 mr-2">▸</span> Что такое ИИ?</li>
                    <li className="flex items-center"><span className="text-blue-400 mr-2">▸</span> Первые картинки</li>
                    <li className="flex items-center"><span className="text-blue-400 mr-2">▸</span> Создание сказок</li>
                    <li className="flex items-center"><span className="text-blue-400 mr-2">▸</span> Простые мультфильмы</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-2xl p-6 border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-purple-500/30">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">Творческие проекты</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Постеры и мемы</li>
                    <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Презентации</li>
                    <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Музыка с ИИ</li>
                    <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Командные проекты</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-2xl p-6 border border-cyan-500/20">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-cyan-500/30">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">Большой проект</h4>
                  </div>
                  <p className="text-gray-300">
                    <span className="text-cyan-400 font-semibold">▸ Результат:</span> Своя книга / мультфильм / игра / блог
                  </p>
                </div>
              </div>
            </div>

            {/* 12-17 лет */}
            <div className="age-card bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-purple-500/30 p-8 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 opacity-0 neon-card">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">12-17 лет</h3>
                <p className="text-gray-300 text-lg">Цифровые новаторы</p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-700/50 rounded-2xl p-6 border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-purple-500/30">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">Контент для соцсетей</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> TikTok/YouTube</li>
                    <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Instagram посты</li>
                    <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Музыка и треки</li>
                    <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Собственный сайт</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-2xl p-6 border border-orange-500/20">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-orange-500/30">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">Программирование</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center"><span className="text-orange-400 mr-2">▸</span> Python основы</li>
                    <li className="flex items-center"><span className="text-orange-400 mr-2">▸</span> Telegram боты</li>
                    <li className="flex items-center"><span className="text-orange-400 mr-2">▸</span> API интеграции</li>
                    <li className="flex items-center"><span className="text-orange-400 mr-2">▸</span> Автоматизация</li>
                  </ul>
                </div>

                <div className="bg-slate-700/50 rounded-2xl p-6 border border-pink-500/20">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-pink-500/30">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">Финальный проект</h4>
                  </div>
                  <p className="text-gray-300">
                    <span className="text-pink-400 font-semibold">▸ Результат:</span> Полноценный проект + портфолио для будущей карьеры
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Kids Learn */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 glow-text">
                Что Изучают
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 glow-text">
                Наши Ученики
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-pink-500/30 p-8 shadow-xl hover:shadow-pink-500/20 transition-all duration-300 neon-card">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Цифровое Искусство</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-pink-400 mr-2">▸</span> Создание картинок с ИИ</li>
                <li className="flex items-center"><span className="text-pink-400 mr-2">▸</span> Дизайн персонажей</li>
                <li className="flex items-center"><span className="text-pink-400 mr-2">▸</span> Иллюстрации к историям</li>
                <li className="flex items-center"><span className="text-pink-400 mr-2">▸</span> NFT коллекции</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-blue-500/30 p-8 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 neon-card">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Storytelling</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-blue-400 mr-2">▸</span> Написание сказок</li>
                <li className="flex items-center"><span className="text-blue-400 mr-2">▸</span> Создание комиксов</li>
                <li className="flex items-center"><span className="text-blue-400 mr-2">▸</span> Интерактивные истории</li>
                <li className="flex items-center"><span className="text-blue-400 mr-2">▸</span> Сценарии для видео</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-emerald-500/30 p-8 shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 neon-card">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Игровая Логика</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-emerald-400 mr-2">▸</span> Scratch программирование</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-2">▸</span> Создание игр</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-2">▸</span> Логические задачи</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-2">▸</span> Алгоритмическое мышление</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-purple-500/30 p-8 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 neon-card">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Видео Контент</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Анимация персонажей</li>
                <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Монтаж видео</li>
                <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> Озвучка и эффекты</li>
                <li className="flex items-center"><span className="text-purple-400 mr-2">▸</span> YouTube каналы</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-orange-500/30 p-8 shadow-xl hover:shadow-orange-500/20 transition-all duration-300 neon-card">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Музыка и Звук</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-orange-400 mr-2">▸</span> Создание мелодий</li>
                <li className="flex items-center"><span className="text-orange-400 mr-2">▸</span> Звуковые эффекты</li>
                <li className="flex items-center"><span className="text-orange-400 mr-2">▸</span> Подкасты</li>
                <li className="flex items-center"><span className="text-orange-400 mr-2">▸</span> Музыкальные клипы</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-cyan-500/30 p-8 shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 neon-card">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm3.5 6.5H9v-2h2v2zm0-4H9V8h2v6zm4 4h-2v-2h2v2zm0-4h-2V8h2v6zm1.5-1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">ИИ Помощники</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-cyan-400 mr-2">▸</span> Чат-боты</li>
                <li className="flex items-center"><span className="text-cyan-400 mr-2">▸</span> Голосовые помощники</li>
                <li className="flex items-center"><span className="text-cyan-400 mr-2">▸</span> Умные игры</li>
                <li className="flex items-center"><span className="text-cyan-400 mr-2">▸</span> Обучающие системы</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing for Kids */}
      <section className="relative z-10 py-20 px-6 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 glow-text">
              Пакеты Обучения
            </h2>
            <p className="text-xl text-gray-300">Выберите подходящий формат для вашего ребенка</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-emerald-500/30 p-8 shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 neon-card">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Базовый</h3>
                <div className="text-3xl font-bold text-emerald-400 mb-2">45 000 ₸</div>
                <div className="text-gray-300">/ месяц</div>
              </div>
              <ul className="space-y-4 text-gray-300 mb-8">
                <li className="flex items-center"><span className="text-emerald-400 mr-3">▸</span> Групповые занятия</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-3">▸</span> Материалы курса</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-3">▸</span> Фотоотчёт для родителей</li>
                <li className="flex items-center"><span className="text-emerald-400 mr-3">▸</span> Сертификат об окончании</li>
              </ul>
              <button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                Выбрать план
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-blue-500/30 p-8 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 ring-4 ring-blue-500/50 neon-card">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Стандарт</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">60 000 ₸</div>
                <div className="text-gray-300">/ месяц</div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm mt-2 shadow-lg shadow-blue-500/30">Популярный</div>
              </div>
              <ul className="space-y-4 text-gray-300 mb-8">
                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Всё из пакета «Базовый»</li>
                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Индивидуальный проект</li>
                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Презентация проекта</li>
                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Дополнительные материалы</li>
              </ul>
              <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/30">
                Выбрать план
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-purple-500/30 p-8 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 neon-card">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 5l5.5-3L12 4.5 15.5 2 21 5l-2 11H5zm2.2-2h9.6l.9-5.4L15 6.1 12 7.8 9 6.1 6.3 8.6 7.2 14z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Премиум</h3>
                <div className="text-3xl font-bold text-purple-400 mb-2">95 000 ₸</div>
                <div className="text-gray-300">/ месяц</div>
              </div>
              <ul className="space-y-4 text-gray-300 mb-8">
                <li className="flex items-center"><span className="text-purple-400 mr-3">▸</span> Всё из пакета «Стандарт»</li>
                <li className="flex items-center"><span className="text-purple-400 mr-3">▸</span> Индивидуальный ментор</li>
                <li className="flex items-center"><span className="text-purple-400 mr-3">▸</span> Персональный трек обучения</li>
                <li className="flex items-center"><span className="text-purple-400 mr-3">▸</span> 1-на-1 сессии</li>
              </ul>
              <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/30">
                Выбрать план
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-6 glow-text">Специальные скидки</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl px-6 py-3 shadow-lg shadow-emerald-500/20">
                <span className="text-emerald-400 font-semibold">Второй ребёнок — 15% скидка</span>
              </div>
              <div className="bg-slate-800/50 border border-blue-500/30 rounded-2xl px-6 py-3 shadow-lg shadow-blue-500/20">
                <span className="text-blue-400 font-semibold">Приведи друга — 10% скидка</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 glow-text">
                ЗАПИСАТЬ РЕБЕНКА НА AI KIDS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Registration Form */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-blue-500/30 p-8 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 neon-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">🧒 Имя ребенка</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700/50 text-white placeholder-gray-400"
                    placeholder="Введите имя ребенка"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">🎂 Возраст ребенка</label>
                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700/50 text-white"
                    required
                  >
                    <option value="">Выберите возраст</option>
                    <option value="8">8 лет</option>
                    <option value="9">9 лет</option>
                    <option value="10">10 лет</option>
                    <option value="11">11 лет</option>
                    <option value="12">12 лет</option>
                    <option value="13">13 лет</option>
                    <option value="14">14 лет</option>
                    <option value="15">15 лет</option>
                    <option value="16">16 лет</option>
                    <option value="17">17 лет</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">👨‍👩‍👧‍👦 Имя родителя</label>
                  <input
                    type="text"
                    name="parent_name"
                    value={formData.parent_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700/50 text-white placeholder-gray-400"
                    placeholder="Ваше имя"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">📱 Telegram (@username)</label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700/50 text-white placeholder-gray-400"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">📞 Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700/50 text-white placeholder-gray-400"
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">✉️ Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700/50 text-white placeholder-gray-400"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">🎯 Выберите программу</label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700/50 text-white"
                  >
                    <option value="">Выберите программу</option>
                    <option value="8-12">8-12 лет: Юные исследователи</option>
                    <option value="12-17">12-17 лет: Цифровые новаторы</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">💎 Выберите тариф</label>
                  <select
                    name="tariff"
                    value={formData.tariff}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700/50 text-white"
                  >
                    <option value="">Выберите тариф</option>
                    <option value="basic">Базовый — 45 000 ₸/месяц</option>
                    <option value="standard">Стандарт — 60 000 ₸/месяц</option>
                    <option value="premium">Премиум — 95 000 ₸/месяц</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">💬 Дополнительная информация</label>
                  <textarea
                    name="additional_info"
                    value={formData.additional_info}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700/50 text-white placeholder-gray-400 h-24 resize-none"
                    placeholder="Интересы ребенка, опыт с компьютером, особые пожелания..."
                  ></textarea>
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-xl text-center font-medium ${
                    submitMessage.includes('успешно')
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl ${
                    isSubmitting
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-blue-500/30 glow-button'
                  }`}
                >
                  {isSubmitting ? 'Отправка...' : '🌟 ЗАПИСАТЬ РЕБЕНКА 🌟'}
                </button>
              </form>
            </div>

            {/* Benefits Card */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-emerald-500/30 p-8 shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 neon-card">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-emerald-500/30">
                    <span className="text-white text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Пробный урок</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  Вернем деньги, если не понравится
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-blue-500/30 p-8 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 neon-card">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-blue-500/30">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Индивидуальный подход</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  К каждому ребенку
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-purple-500/30 p-8 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 neon-card">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-purple-500/30">
                    <span className="text-white text-2xl">🤝</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Поддержка родителей</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  На всех этапах обучения
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-orange-500/30 p-8 shadow-xl hover:shadow-orange-500/20 transition-all duration-300 neon-card">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mr-4 shadow-lg shadow-orange-500/30">
                    <span className="text-white text-2xl">📸</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Фотоотчеты</h3>
                </div>
                <p className="text-gray-300 text-lg">
                  С каждого занятия
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 bg-slate-900/80 backdrop-blur-sm border-t border-blue-500/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-sm text-gray-300">
            © 2025 AI Kids. Где мечты становятся реальностью!
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/77088098009" target="_blank"
         className="whatsapp-button"
         style={{
           position: "fixed",
           bottom: "20px",
           right: "20px",
           background: "linear-gradient(45deg, #25D366, #128C7E)",
           color: "white",
           width: "60px",
           height: "60px",
           borderRadius: "50%",
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
           fontSize: "28px",
           textAlign: "center",
           zIndex: 1000,
           textDecoration: "none",
           boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0,0,0,0.2)",
           transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
           animation: "pulse 2s infinite"
         }}
         onMouseEnter={(e) => {
           const target = e.target as HTMLElement;
           target.style.transform = "scale(1.1)";
           target.style.boxShadow = "0 6px 20px rgba(37, 211, 102, 0.6), 0 4px 12px rgba(0,0,0,0.3)";
         }}
         onMouseLeave={(e) => {
           const target = e.target as HTMLElement;
           target.style.transform = "scale(1)";
           target.style.boxShadow = "0 4px 12px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0,0,0,0.2)";
         }}>
         💬
      </a>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0,0,0,0.2);
          }
          50% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.6), 0 2px 6px rgba(0,0,0,0.2), 0 0 0 10px rgba(37, 211, 102, 0.1);
          }
          100% {
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4), 0 2px 6px rgba(0,0,0,0.2);
          }
        }
      `}</style>
    </div>
  );
}