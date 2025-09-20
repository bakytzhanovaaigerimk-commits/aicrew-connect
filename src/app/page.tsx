"use client"
import { useState } from "react"
import RegistrationModal from "@/components/RegistrationModal"

export default function Home() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          age: '18',
          phone: contactForm.phone,
          email: 'contact@form.local',
          course: 'Общий запрос',
          telegram: '',
          additional_info: ''
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Заявка отправлена успешно!')
        setContactForm({ name: '', phone: '' })
      } else {
        setSubmitMessage('Ошибка при отправке заявки')
      }
    } catch (error) {
      setSubmitMessage('Ошибка сети')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <div>
                <div className="text-2xl font-black text-white">AICREW</div>
                <div className="text-sm text-blue-300">AICREW CONNECT</div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              <span className="text-white/90 hover:text-white cursor-pointer">Главная</span>
              <a href="/vibe-coding" className="text-white/70 hover:text-white">Вайб Кодинг</a>
              <a href="/ai-creator" className="text-white/70 hover:text-white">AI Creator</a>
              <a href="/ai-kids" className="text-white/70 hover:text-white">AI Kids</a>
            </div>

            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold"
            >
              Начать Обучение
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6">
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI АКАДЕМИЯ
            </span>
            <span className="block text-5xl md:text-6xl text-white/90 mt-4">
              ИИ-Образования Будущего
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-white/80 mb-16 max-w-4xl mx-auto">
            Курсы Искусственного интеллекта для детей от 8 до 17 лет.
            <span className="text-blue-300"> Воплощай фантазии в реальность!</span>
          </p>

          <button
            onClick={() => setIsRegistrationModalOpen(true)}
            className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl rounded-2xl"
          >
            Начать Обучение
          </button>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Наши Программы</h2>
            <p className="text-xl text-white/70">Выбери свой путь в мире искусственного интеллекта</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Вайб Кодинг */}
            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-6xl mb-6">💻</div>
              <h3 className="text-2xl font-bold text-white mb-4">Вайб Кодинг</h3>
              <p className="text-white/70 mb-6">Программирование будущего с элементами искусственного интеллекта</p>
              <ul className="space-y-2 mb-8">
                <li className="text-white/60">• Web разработка</li>
                <li className="text-white/60">• Mobile приложения</li>
                <li className="text-white/60">• API интеграции</li>
              </ul>
              <a href="/vibe-coding" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl text-center hover:scale-105 transition-transform">
                Подробнее
              </a>
            </div>

            {/* AI Creator */}
            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-6xl mb-6">🎨</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Creator</h3>
              <p className="text-white/70 mb-6">Творческие проекты с ИИ - от генерации арта до создания контента</p>
              <ul className="space-y-2 mb-8">
                <li className="text-white/60">• AI Art генерация</li>
                <li className="text-white/60">• Видео контент</li>
                <li className="text-white/60">• Музыка и звук</li>
              </ul>
              <a href="/ai-creator" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl text-center hover:scale-105 transition-transform">
                Подробнее
              </a>
            </div>

            {/* AI Kids */}
            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-6xl mb-6">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Kids</h3>
              <p className="text-white/70 mb-6">Интерактивное знакомство с ИИ для самых юных исследователей</p>
              <ul className="space-y-2 mb-8">
                <li className="text-white/60">• Игровое обучение</li>
                <li className="text-white/60">• Создание мультиков</li>
                <li className="text-white/60">• Интерактивные сказки</li>
              </ul>
              <a href="/ai-kids" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl text-center hover:scale-105 transition-transform">
                Подробнее
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Связаться с нами</h2>
            <p className="text-xl text-white/70">Готовы начать путешествие в мир ИИ?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-8">Записаться на курс</h3>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  placeholder="Ваше имя"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleContactFormChange}
                  placeholder="Телефон"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  required
                />

                {submitMessage && (
                  <div className="p-4 rounded-xl text-center text-white bg-blue-500/20">
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-8">Контакты</h3>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">WhatsApp</div>
                    <a href="https://wa.me/77088098009" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200">
                      +7 708 809 8009
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <a href="mailto:info@aicrew.connect" className="text-blue-300 hover:text-blue-200">
                      info@aicrew.connect
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <div className="text-white font-semibold mb-4">Социальные сети</div>
                  <div className="flex space-x-4">
                    <a href="https://www.instagram.com/code_on_vibe/" target="_blank" rel="noopener noreferrer"
                       className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://t.me/ai_corgi" target="_blank" rel="noopener noreferrer"
                       className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/@noaicancode" target="_blank" rel="noopener noreferrer"
                       className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </div>
  )
}