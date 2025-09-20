"use client"
import { useState } from "react"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  defaultCourse?: string
}

export default function RegistrationModal({ isOpen, onClose, defaultCourse = "Общий курс" }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: defaultCourse
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
        body: JSON.stringify({
          name: formData.name,
          age: '18', // Default age
          phone: formData.phone,
          email: `modal@${formData.course.toLowerCase().replace(/\s+/g, '')}.local`, // Default email
          course: formData.course,
          telegram: '',
          additional_info: ''
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Заявка отправлена успешно! Мы свяжемся с вами в ближайшее время.')
        setFormData({
          name: '',
          phone: '',
          course: defaultCourse
        })
        setTimeout(() => {
          onClose()
          setSubmitMessage('')
        }, 2000)
      } else {
        setSubmitMessage(data.error || 'Произошла ошибка при отправке заявки')
      }
    } catch (error) {
      setSubmitMessage('Ошибка сети. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Оставить заявку</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">✨ Ваше имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Введите ваше имя"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">📞 Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? 'Отправка...' : '🚀 Отправить заявку'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </div>
        </div>
      </div>
    </div>
  )
}