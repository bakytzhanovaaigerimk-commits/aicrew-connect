import axios from 'axios'

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || "8479942990:AAFw-fqhBWDXKffUSZ25G000VX7rpPL4d_I"
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-8479942990" // Your group chat ID

export async function sendTelegramNotification(message: string) {
  try {
    if (!TELEGRAM_TOKEN || !CHAT_ID) {
      console.warn('Telegram credentials not configured')
      return false
    }

    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }
    )

    return response.status === 200
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
    return false
  }
}

export function formatStudentRegistration(studentData: {
  name: string
  age: string
  phone: string
  email: string
  course: string
  telegram?: string
}) {
  const { name, age, phone, email, course, telegram } = studentData

  let message = `🎓 <b>Новая регистрация студента!</b>\n\n`
  message += `👤 <b>Имя:</b> ${name}\n`
  message += `🎂 <b>Возраст:</b> ${age} лет\n`
  message += `📞 <b>Телефон:</b> ${phone}\n`
  message += `✉️ <b>Email:</b> ${email}\n`
  message += `📚 <b>Курс:</b> ${course}\n`

  if (telegram) {
    message += `📱 <b>Telegram:</b> ${telegram}\n`
  }

  message += `\n⏰ <b>Время регистрации:</b> ${new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Almaty',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`

  return message
}