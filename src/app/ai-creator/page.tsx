"use client"
import { useEffect, useRef, useState } from "react"
import anime from "animejs/lib/anime.es.js"
import Link from "next/link"

export default function AICreator() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'AI Creator'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [activeTab, setActiveTab] = useState('videos')

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
        body: JSON.stringify({
          name: formData.name,
          age: '18', // Default age for AI Creator
          phone: formData.phone,
          course: formData.course,
          telegram: '',
          additional_info: ''
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Регистрация прошла успешно! Мы свяжемся с вами в ближайшее время.')
        setFormData({
          name: '',
          phone: '',
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
      <style>{`
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

          {/* Portfolio Tabs */}
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="flex bg-white rounded-2xl p-2 shadow-lg">
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'videos'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  🎬 Видео Портфолио
                </button>
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'photos'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  📸 Фото Галерея
                </button>
              </div>
            </div>

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { file: 'Crystal_Samurai_Fashion_Shoot.mp4', title: 'Crystal Samurai Fashion', desc: 'Модная съемка с AI', color: '#A7C7E7' },
                  { file: 'AI_Generated_Visuals_and_Logo_Emergence.mp4', title: 'AI Визуалы и Лого', desc: 'Создание брендинга с ИИ', color: '#B4E7CE' },
                  { file: 'Quick_Avatar_Video.mp4', title: 'Quick Avatar', desc: 'Создание персонального аватара', color: '#FFCCCB' },
                  { file: 'Hailuo_Video_422285314604769283.mp4', title: 'Hailuo AI Video', desc: 'AI видео генерация', color: '#FFB6C1' },
                  { file: 'Test Avatar.mp4', title: 'Test Avatar', desc: 'Демо персонажа', color: '#FFF6A3' },
                  { file: 'IMG_1452.MP4', title: 'AI Creation', desc: 'Творческий процесс', color: '#E6E6FA' },
                  { file: 'video_d693c21df5c18c9dae61b6fcfda2bcdd.mp4', title: 'AI Process', desc: 'Процесс создания', color: '#F0E68C' },
                  { file: 'Бабушка_против_Гопника_Mortal_Kombat.mp4', title: 'Mortal Kombat', desc: 'Эпическая битва с ИИ', color: '#FF6347' }
                ].map((video, index) => (
                  <div key={index} className="group feature-item pastel-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="video-container aspect-video mb-4 relative overflow-hidden rounded-2xl">
                      <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        poster={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='100%25' height='100%25' fill='%23${video.color.replace('#', '')}'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3E${video.title.replace(/[<>&"']/g, '')}%3C/text%3E%3C/svg%3E`}
                      >
                        <source src={`/videos/${video.file}`} type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                      </video>
                    </div>
                    <h4 className="text-xl font-bold text-gray-700 mb-2 group-hover:text-purple-600 transition-colors">{video.title}</h4>
                    <p className="text-gray-500">{video.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  'photo_2025-09-16_14-00-36.jpg',
                  'photo_2025-09-16_14-00-37.jpg',
                  'photo_2025-09-16_14-00-40.jpg',
                  'photo_2025-09-16_14-00-41.jpg',
                  'photo_2025-09-16_14-00-42.jpg',
                  'photo_2025-09-16_14-00-43.jpg',
                  'photo_2025-09-16_14-00-47.jpg',
                  'photo_2025-09-16_14-00-48.jpg',
                  'photo_2025-09-16_14-01-30.jpg',
                  'photo_2025-09-16_14-01-31.jpg',
                  'photo_2025-09-16_14-01-34.jpg',
                  'photo_2025-09-16_14-01-35.jpg',
                  'photo_2025-09-16_14-01-36.jpg',
                  'photo_2025-09-16_14-01-55.jpg',
                  'photo_2025-09-16_14-01-58.jpg',
                  'photo_2025-09-16_14-01-59.jpg'
                ].map((filename, index) => (
                  <div key={index} className="group feature-item pastel-card rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="aspect-square mb-3 relative overflow-hidden rounded-xl">
                      <img
                        src={`/photos/${filename}`}
                        alt={`AI Generated Art ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='100%25' height='100%25' fill='%23E5E7EB'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='16' font-family='Arial'%3EAI Art%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='12' font-family='Arial'%3E${index + 1}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">AI Art #{index + 1}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button className="pastel-button text-white px-12 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-300">
              🚀 Создать свой проект
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
        <div className="max-w-4xl mx-auto">
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

          <div className="flex justify-center">
            {/* Registration Form */}
            <div className="pastel-card rounded-3xl p-8 shadow-xl max-w-md w-full">
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

      <style>{`
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