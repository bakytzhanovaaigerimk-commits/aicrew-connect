"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Student {
  id: number
  name: string
  age: number
  phone: string
  email: string
  course: string
  program?: string
  tariff?: string
  telegram?: string
  parent_name?: string
  additional_info?: string
  created_at: string
}

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/register')
      const data = await response.json()

      if (response.ok) {
        setStudents(data.students)
      } else {
        setError('Ошибка загрузки данных')
      }
    } catch (err) {
      setError('Ошибка сети')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Зарегистрированные студенты
            </h1>
            <Link
              href="/"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              На главную
            </Link>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              Всего студентов: <span className="font-semibold">{students.length}</span>
            </p>
          </div>

          {students.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Пока нет зарегистрированных студентов</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Имя</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Возраст</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Телефон</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Курс</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Программа</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Тариф</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Telegram</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Родитель</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 border-b">Дата регистрации</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">{student.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b font-medium">{student.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">{student.age}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">
                        <a href={`tel:${student.phone}`} className="text-blue-600 hover:underline">
                          {student.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">
                        <a href={`mailto:${student.email}`} className="text-blue-600 hover:underline">
                          {student.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-sm border-b">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.course === 'AI Creator'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {student.course}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">{student.program || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">{student.tariff || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">
                        {student.telegram ? (
                          <a href={`https://t.me/${student.telegram.replace('@', '')}`}
                             className="text-blue-600 hover:underline"
                             target="_blank"
                             rel="noopener noreferrer">
                            {student.telegram}
                          </a>
                        ) : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">{student.parent_name || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 border-b">{formatDate(student.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {students.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Показано {students.length} записей
              </div>
              <button
                onClick={fetchStudents}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Обновить данные
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}