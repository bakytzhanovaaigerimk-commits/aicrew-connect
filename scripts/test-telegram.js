const axios = require('axios');

const TELEGRAM_TOKEN = "8479942990:AAFw-fqhBWDXKffUSZ25G000VX7rpPL4d_I";
const CHAT_ID = "-8479942990";

async function testTelegram() {
  try {
    console.log('🚀 Testing Telegram notification...');

    const testMessage = `🎓 <b>Тест уведомления!</b>

👤 <b>Имя:</b> Тест Студент
🎂 <b>Возраст:</b> 16 лет
📞 <b>Телефон:</b> +7 777 123 45 67
✉️ <b>Email:</b> test@aicrew.connect
📚 <b>Курс:</b> AI Creator
📱 <b>Telegram:</b> @test_student

⏰ <b>Время регистрации:</b> ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Asia/Almaty',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

✅ <b>Система уведомлений работает!</b>`;

    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: testMessage,
        parse_mode: 'HTML'
      }
    );

    if (response.status === 200) {
      console.log('✅ Telegram уведомление отправлено успешно!');
      console.log('📱 Проверьте ваш Telegram чат:', CHAT_ID);
      return true;
    } else {
      console.log('❌ Ошибка отправки:', response.status);
      return false;
    }

  } catch (error) {
    console.error('❌ Ошибка Telegram API:', error.response?.data || error.message);
    return false;
  }
}

testTelegram();