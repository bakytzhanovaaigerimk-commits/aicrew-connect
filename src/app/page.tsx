"use client"
import { useEffect, useRef, useState } from "react"
import anime from "animejs/lib/anime.es.js"
import RegistrationModal from "@/components/RegistrationModal"

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    course: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    // Modern geometric background
    if (backgroundRef.current) {
      const shapes = Array.from({ length: 12 }, (_, i) => {
        const shape = document.createElement('div')
        const size = Math.random() * 150 + 100

        shape.className = 'absolute rounded-3xl opacity-10'
        shape.style.width = size + 'px'
        shape.style.height = size + 'px'
        shape.style.background = `linear-gradient(135deg,
          rgba(99, 102, 241, 0.3),
          rgba(168, 85, 247, 0.4),
          rgba(236, 72, 153, 0.3))`
        shape.style.left = Math.random() * 100 + '%'
        shape.style.top = Math.random() * 100 + '%'
        shape.style.filter = 'blur(40px)'

        backgroundRef.current?.appendChild(shape)

        anime({
          targets: shape,
          translateX: () => anime.random(-100, 100),
          translateY: () => anime.random(-100, 100),
          scale: [1, 1.5, 1],
          rotate: () => anime.random(0, 360),
          duration: anime.random(15000, 25000),
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutSine',
          delay: anime.random(0, 5000)
        })
      })
    }

    // Enhanced animations
    anime.timeline({
      easing: 'easeOutExpo'
    })
    .add({
      targets: '.hero-content',
      opacity: [0, 1],
      translateY: [120, 0],
      scale: [0.8, 1],
      duration: 1500,
      delay: 400
    })
    .add({
      targets: '.feature-card',
      opacity: [0, 1],
      translateY: [80, 0],
      rotateX: [45, 0],
      delay: anime.stagger(150),
      duration: 1200
    }, '-=600')

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target

          if (target.classList.contains('courses-section')) {
            anime({
              targets: target.querySelectorAll('.course-card'),
              opacity: [0, 1],
              translateY: [100, 0],
              rotateY: [30, 0],
              delay: anime.stagger(200),
              duration: 1000,
              easing: 'easeOutBack'
            })
          }
        }
      })
    }, observerOptions)

    document.querySelectorAll('.animated-section').forEach(section => {
      sectionObserver.observe(section)
    })

    return () => sectionObserver.disconnect()
  }, [])

  const openModal = (modalType: string) => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
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
          name: contactForm.name,
          age: '18', // Default age for contact form
          phone: contactForm.phone,
          email: 'contact@form.local', // Default email for contact form
          course: contactForm.course,
          telegram: '',
          additional_info: contactForm.message
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Заявка отправлена успешно! Мы свяжемся с вами в ближайшее время.')
        setContactForm({
          name: '',
          phone: '',
          course: '',
          message: ''
        })
        setTimeout(() => {
          setSubmitMessage('')
        }, 5000)
      } else {
        setSubmitMessage(data.error || 'Произошла ошибка при отправке заявки')
      }
    } catch (error) {
      setSubmitMessage('Ошибка сети. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Modern Background */}
      <div ref={backgroundRef} className="fixed inset-0 pointer-events-none z-0"></div>

      {/* Mesh Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/60 via-transparent to-purple-900/60 pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-30 blur"></div>
              </div>
              <div>
                <div className="text-2xl font-black text-white tracking-tight">AICREW</div>
                <div className="text-sm text-blue-300 font-medium">AICREW CONNECT</div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <span className="text-white/90 hover:text-white transition-all duration-300 font-semibold hover:scale-105 cursor-pointer">
                Главная
              </span>
              <a href="/vibe-coding" className="text-white/70 hover:text-white transition-all duration-300 font-medium hover:scale-105">
                Вайб Кодинг
              </a>
              <a href="/ai-creator" className="text-white/70 hover:text-white transition-all duration-300 font-medium hover:scale-105">
                AI Creator
              </a>
              <a href="/ai-kids" className="text-white/70 hover:text-white transition-all duration-300 font-medium hover:scale-105">
                AI Kids
              </a>
            </div>

            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 font-bold"
            >
              Начать Обучение
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-7xl mx-auto">
          <div className="hero-content opacity-0">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-8">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-white font-medium">🚀 Революция в AI-образовании</span>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI АКАДЕМИЯ
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl text-white/90 mt-4">
                ИИ-Образования Будущего
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-white/80 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Курсы Искусственного интеллекта для детей от 8 до 17 лет.
              <span className="text-blue-300 font-medium"> Воплощай фантазии в реальность!</span>
            </p>

            {/* Action Button */}
            <div className="flex justify-center mb-20">
              <button
                onClick={() => setIsRegistrationModalOpen(true)}
                className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30">
                <span className="relative z-10">Начать Обучение</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* Courses Section */}
      <section id="courses" className="animated-section courses-section relative z-10 py-24 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Наши Программы
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Выбери свой путь в мире искусственного интеллекта
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vibe Coding */}
            <div className="course-card group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-600/20 backdrop-blur-xl border border-white/20 opacity-0 hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
              <div className="relative z-10 p-10">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mb-8">
                  <span className="text-3xl">💻</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Вайб Кодинг</h3>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Программирование будущего с элементами искусственного интеллекта
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    <span>Web разработка</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Mobile приложения</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    <span>API интеграции</span>
                  </div>
                </div>
                <a href="/vibe-coding" className="block w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-2xl text-center hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  Подробнее
                </a>
              </div>
            </div>

            {/* AI Creator */}
            <div className="course-card group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-xl border border-white/20 opacity-0 hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent"></div>
              <div className="relative z-10 p-10">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded-3xl flex items-center justify-center mb-8">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">AI Creator</h3>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Творческие проекты с ИИ - от генерации арта до создания контента
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    <span>AI Art генерация</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    <span>Видео контент</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Музыка и звук</span>
                  </div>
                </div>
                <a href="/ai-creator" className="block w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-2xl text-center hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300">
                  Подробнее
                </a>
              </div>
            </div>

            {/* AI Kids */}
            <div className="course-card group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20 opacity-0 hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"></div>
              <div className="relative z-10 p-10">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mb-8">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">AI Kids</h3>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Интерактивное знакомство с ИИ для самых юных исследователей
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    <span>Игровое обучение</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    <span>Создание мультиков</span>
                  </div>
                  <div className="flex items-center text-white/60">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                    <span>Интерактивные сказки</span>
                  </div>
                </div>
                <a href="/ai-kids" className="block w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl text-center hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  Подробнее
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Связаться с нами
            </h2>
            <p className="text-xl text-white/70">
              Готовы начать путешествие в мир ИИ?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center space-x-6 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">WhatsApp</h3>
                  <p className="text-white/70">+7 708 809 8009</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Email</h3>
                  <p className="text-white/70">info@aicrew.connect</p>
                </div>
              </div>

              <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Социальные сети</h3>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/code_on_vibe/" className="w-14 h-14 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
                    </svg>
                  </a>
                  <a href="https://t.me/ai_corgi" className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@noaicancode" className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-8">Записаться на курс</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactFormChange}
                    placeholder="Ваше имя"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors backdrop-blur-xl"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactFormChange}
                    placeholder="Телефон"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors backdrop-blur-xl"
                    required
                  />
                </div>
                <div>
                  <select
                    name="course"
                    value={contactForm.course}
                    onChange={handleContactFormChange}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-blue-400 transition-colors backdrop-blur-xl"
                    required
                  >
                    <option value="">Выберите курс</option>
                    <option value="Вайб Кодинг">Вайб Кодинг</option>
                    <option value="AI Creator">AI Creator</option>
                    <option value="AI Kids">AI Kids</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    placeholder="Сообщение"
                    rows={4}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none backdrop-blur-xl"
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
                  className={`w-full py-4 font-bold rounded-2xl transition-all duration-300 transform ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 bg-black/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <div className="text-2xl font-black text-white">AICREW</div>
                <div className="text-sm text-white/70">AI Education Platform</div>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex space-x-6">
                <a href="https://www.instagram.com/code_on_vibe/" className="text-white/70 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="https://t.me/ai_corgi" className="text-white/70 hover:text-white transition-colors">
                  Telegram
                </a>
                <a href="https://www.youtube.com/@noaicancode" className="text-white/70 hover:text-white transition-colors">
                  YouTube
                </a>
              </div>
              <div className="text-white/50 text-sm">© 2025</div>
            </div>
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

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </div>
  );
}