"use client"
import { useEffect, useRef, useState } from "react"
import anime from "animejs/lib/anime.es.js"
import Link from "next/link"

export default function AICreator() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    telegram: '',
    course: 'AI Creator'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          course: 'AI Creator'
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
    // Soft floating elements
    if (backgroundRef.current) {
      const shapes = Array.from({ length: 8 }, (_, i) => {
        const shape = document.createElement('div')
        const size = Math.random() * 80 + 40

        shape.className = 'absolute rounded-full opacity-20'
        shape.style.width = size + 'px'
        shape.style.height = size + 'px'
        shape.style.background = `linear-gradient(135deg, rgba(167, 199, 231, 0.3), rgba(180, 231, 206, 0.3), rgba(199, 190, 231, 0.3))`
        shape.style.left = Math.random() * 100 + '%'
        shape.style.top = Math.random() * 100 + '%'
        shape.style.filter = 'blur(20px)'

        backgroundRef.current?.appendChild(shape)

        anime({
          targets: shape,
          translateX: () => anime.random(-100, 100),
          translateY: () => anime.random(-100, 100),
          scale: [1, 1.2, 1],
          duration: anime.random(15000, 20000),
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine',
          delay: anime.random(0, 3000)
        })
      })
    }

    // Gentle page animations
    anime.timeline({
      easing: 'easeOutExpo'
    })
    .add({
      targets: '.hero-content',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1200,
      delay: 200
    })
    .add({
      targets: '.feature-item',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100),
      duration: 800
    }, '-=600')
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden" style={{
      background: 'linear-gradient(135deg, #A7C7E7 0%, #B4E7CE 50%, #C7BEE7 100%)',
      backgroundColor: '#FAFAFA'
    }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }

        .pastel-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(167, 199, 231, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pastel-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(167, 199, 231, 0.25);
          border-color: rgba(167, 199, 231, 0.5);
        }

        .pastel-button {
          background: linear-gradient(135deg, #A7C7E7, #B4E7CE);
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(167, 199, 231, 0.3);
        }

        .pastel-button:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 30px rgba(167, 199, 231, 0.4);
        }

        .video-container {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
        }

        .video-container video {
          transition: transform 0.3s ease;
        }

        .video-container:hover video {
          transform: scale(1.02);
        }
      `}</style>

      {/* Soft Background */}
      <div ref={backgroundRef} className="fixed inset-0 pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-blue-200/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-300 to-teal-300 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-700">AICREW CONNECT</div>
                <div className="text-sm text-purple-400">AI Creator</div>
              </div>
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-500 transition-all duration-300 font-medium">Главная</Link>
              <Link href="/vibe-coding" className="text-gray-600 hover:text-blue-500 transition-all duration-300 font-medium">Вайб кодинг</Link>
              <Link href="/ai-creator" className="text-blue-500 font-semibold">AI Creator</Link>
              <Link href="/ai-kids" className="text-gray-600 hover:text-blue-500 transition-all duration-300 font-medium">AI Kids</Link>
              <Link href="/admin/students" className="text-yellow-600 hover:text-yellow-500 transition-all duration-300 font-medium">📊 Студенты</Link>
            </div>

            <button className="pastel-button text-white px-8 py-3 rounded-full font-semibold">
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
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 mb-4">
                AI CREATOR
              </span>
              <span className="block text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">
                Творческое Будущее
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-600 mb-12 font-light">
              Создавай уникальный контент с помощью ИИ
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              <div className="pastel-card rounded-3xl p-6 shadow-xl">
                <div className="text-4xl mb-3 flex justify-center">
                  <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-gray-700">Арт</div>
              </div>
              <div className="pastel-card rounded-3xl p-6 shadow-xl">
                <div className="text-4xl mb-3 flex justify-center">
                  <svg className="w-12 h-12 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-gray-700">Видео</div>
              </div>
              <div className="pastel-card rounded-3xl p-6 shadow-xl">
                <div className="text-4xl mb-3 flex justify-center">
                  <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-gray-700">Музыка</div>
              </div>
              <div className="pastel-card rounded-3xl p-6 shadow-xl">
                <div className="text-4xl mb-3 flex justify-center">
                  <svg className="w-12 h-12 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-gray-700">Тексты</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Works Gallery */}
      <section className="relative z-10 py-20 px-6 bg-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">
              РАБОТЫ НАШИХ AI CREATORS
            </h2>
            <p className="text-xl text-gray-600">
              Посмотри, что создают студенты после прохождения курса
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-purple-400 mb-8 flex items-center">
              <span className="mr-3">🎬</span> Видео Портфолио
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Crystal Samurai Fashion */}
              <div className="feature-item pastel-card rounded-3xl p-6 shadow-xl opacity-0">
                <div className="video-container aspect-video mb-4 relative">
                  <video
                    className="w-full h-full object-cover rounded-2xl"
                    controls
                    preload="metadata"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='100%25' height='100%25' fill='%23A7C7E7'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3ECrystal Samurai%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='12' font-family='Arial'%3EFashion Shoot%3C/text%3E%3C/svg%3E"
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  >
                    <source src="/videos/Crystal_Samurai_Fashion_Shoot.mp4" type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/90 to-purple-300/90 rounded-2xl flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-3 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <div className="text-sm font-semibold">Видео будет загружено</div>
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-700 mb-2">Crystal Samurai Fashion</h4>
                <p className="text-gray-500 text-sm">Модная съемка с AI</p>
              </div>

              {/* AI Визуалы и Лого */}
              <div className="feature-item pastel-card rounded-3xl p-6 shadow-xl opacity-0">
                <div className="video-container aspect-video mb-4 relative">
                  <video
                    className="w-full h-full object-cover rounded-2xl"
                    controls
                    preload="metadata"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='100%25' height='100%25' fill='%23B4E7CE'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3EAI Визуалы%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='12' font-family='Arial'%3Eи Лого%3C/text%3E%3C/svg%3E"
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  >
                    <source src="/videos/AI_Generated_Visuals_and_Logo_Emergence.mp4" type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-200/90 to-green-300/90 rounded-2xl flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-3 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <div className="text-sm font-semibold">Видео будет загружено</div>
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-700 mb-2">AI Визуалы и Лого</h4>
                <p className="text-gray-500 text-sm">Брендинг с ИИ</p>
              </div>

              {/* AI Аватар */}
              <div className="feature-item pastel-card rounded-3xl p-6 shadow-xl opacity-0">
                <div className="video-container aspect-video mb-4 relative">
                  <video
                    className="w-full h-full object-cover rounded-2xl"
                    controls
                    preload="metadata"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='100%25' height='100%25' fill='%23C7BEE7'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='16' font-family='Arial'%3EAI Аватар%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='12' font-family='Arial'%3EПерсонаж%3C/text%3E%3C/svg%3E"
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  >
                    <source src="/videos/Quick_Avatar_Video.mp4" type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200/90 to-pink-300/90 rounded-2xl flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-3 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <div className="text-sm font-semibold">Видео будет загружено</div>
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-700 mb-2">AI Аватар</h4>
                <p className="text-gray-500 text-sm">Персональный персонаж</p>
              </div>

              {/* StarZ */}
              <div className="feature-item pastel-card rounded-3xl p-6 shadow-xl opacity-0">
                <div className="video-container aspect-video mb-4 relative">
                  <video
                    className="w-full h-full object-cover rounded-2xl"
                    controls
                    preload="metadata"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='100%25' height='100%25' fill='%23FFF6A3'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%23333' font-size='20' font-family='Arial'%3EStarZ%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='%23333' font-size='12' font-family='Arial'%3EАнимация%3C/text%3E%3C/svg%3E"
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  >
                    <source src="/videos/starZ.mp4" type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/90 to-orange-300/90 rounded-2xl flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-3 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <div className="text-sm font-semibold">Видео будет загружено</div>
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-700 mb-2">StarZ</h4>
                <p className="text-gray-500 text-sm">Космическая анимация</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button className="pastel-button text-white px-12 py-4 rounded-2xl font-bold text-lg">
              Создать свой проект
            </button>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-700">
              Путь Творческого Развития
            </h2>
            <p className="text-xl text-gray-600 mt-6">От новичка до AI-художника за 6 месяцев</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Beginner */}
            <div className="pastel-card rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-300 to-teal-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Новичок</h3>
                <p className="text-gray-500">Месяцы 1-2</p>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>Основы промт-инженерии</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>Первые AI-изображения</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>Создание текстового контента</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>Генерация простой музыки</span>
                </li>
              </ul>
            </div>

            {/* Intermediate */}
            <div className="pastel-card rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Продвинутый</h3>
                <p className="text-gray-500">Месяцы 3-4</p>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>Создание видео контента</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>3D моделирование с AI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>Контент для соц.сетей</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>Первые коммерческие проекты</span>
                </li>
              </ul>
            </div>

            {/* Expert */}
            <div className="pastel-card rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 5l5.5-3L12 4.5 15.5 2 21 5l-2 11H5zm2.2-2h9.6l.9-5.4L15 6.1 12 7.8 9 6.1 6.3 8.6 7.2 14z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Эксперт</h3>
                <p className="text-gray-500">Месяцы 5-6</p>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>Собственная AI-студия</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>Доход $1000+ в месяц</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>Уникальный творческий стиль</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>Менторство новичков</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400">
                ГОТОВ СТАТЬ
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">
                AI CREATOR
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400">
                БУДУЩЕГО?
              </span>
            </h2>

            <div className="flex justify-center mb-8">
              <div className="text-6xl">🚀</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="pastel-card rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">🚀</div>
                <div className="font-semibold text-gray-700">Мгновенное создание контента</div>
              </div>
              <div className="pastel-card rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">💎</div>
                <div className="font-semibold text-gray-700">Профессиональное качество</div>
              </div>
              <div className="pastel-card rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">🌟</div>
                <div className="font-semibold text-gray-700">Безграничное творчество</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Registration Form */}
            <div className="pastel-card rounded-3xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-600 font-medium mb-2">✨ Твоё имя</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80"
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-2">🎂 Возраст</label>
                  <select
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80"
                    required
                  >
                    <option value="">Выберите возраст</option>
                    {Array.from({ length: 50 }, (_, i) => i + 16).map(age => (
                      <option key={age} value={age}>{age} лет</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-2">📞 Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80"
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-2">📱 Telegram (@username)</label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-2">✉️ Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80"
                    placeholder="your@email.com"
                    required
                  />
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
                  className={`w-full py-4 rounded-2xl font-bold text-xl transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'pastel-button text-white hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'Отправка...' : '🌟 ЗАПИСАТЬСЯ НА КУРС 🌟'}
                </button>
              </form>
            </div>

            {/* Pricing Card */}
            <div className="text-center">
              <div className="pastel-card rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-red-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -30%
                </div>
                <div className="absolute top-4 left-4 bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                  🔥 Акция до конца месяца!
                </div>

                <div className="mt-8 mb-8">
                  <div className="text-gray-400 line-through text-2xl mb-2">$500</div>
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-4">
                    $350
                  </div>
                </div>

                <button className="w-full pastel-button text-white py-4 rounded-2xl font-bold text-xl mb-6">
                  🌟 СТАТЬ AI CREATOR ЗА $350 🌟
                </button>

                <div className="space-y-3 text-left">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1 text-lg">✨</span>
                    <span className="text-gray-600">30 дней гарантии возврата</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-400 mr-3 mt-1 text-lg">🎯</span>
                    <span className="text-gray-600">Персональное менторство включено</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-purple-400 mr-3 mt-1 text-lg">🚀</span>
                    <span className="text-gray-600">Доступ к закрытому сообществу AI Creators</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-teal-400 mr-3 mt-1 text-lg">📅</span>
                    <span className="text-gray-600">Пожизненный доступ к курсу</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 bg-white/40 backdrop-blur-sm border-t border-blue-200/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-sm text-gray-600">
            © 2025 AI Creator. Творческое будущее начинается здесь!
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