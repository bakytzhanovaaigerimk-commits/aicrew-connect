const axios = require('axios');

// ЗАМЕНИТЕ ЭТИ ДАННЫЕ НА ВАШИ НОВЫЕ!
const NEW_TOKEN = "8479942990:AAFm0fbmWzIDl2n-_twdPMcWcb-3R38uyfs"; // От @BotFather
const NEW_CHAT_ID = "500852390";   // Ваш ID или группы

async function testNewTelegramBot() {
  try {
    console.log('🤖 Тестируем новый Telegram бот...');
    console.log('Token:', NEW_TOKEN.substring(0, 10) + '...');
    console.log('Chat ID:', NEW_CHAT_ID);

    if (NEW_TOKEN === "ВСТАВЬТЕ_НОВЫЙ_ТОКЕН_СЮДА") {
      console.log('❌ ОШИБКА: Замените NEW_TOKEN на реальный токен от @BotFather');
      return false;
    }

    if (NEW_CHAT_ID === "ВСТАВЬТЕ_CHAT_ID_СЮДА") {
      console.log('❌ ОШИБКА: Замените NEW_CHAT_ID на реальный ID чата');
      return false;
    }

    const testMessage = `🎉 <b>Тест нового бота!</b>

🤖 Бот AI Crew Connect успешно настроен!
⏰ Время: ${new Date().toLocaleString('ru-RU')}

✅ Telegram уведомления работают!
🚀 Готов принимать заявки студентов!`;

    const response = await axios.post(
      `https://api.telegram.org/bot${NEW_TOKEN}/sendMessage`,
      {
        chat_id: NEW_CHAT_ID,
        text: testMessage,
        parse_mode: 'HTML'
      }
    );

    if (response.status === 200) {
      console.log('✅ УСПЕШНО! Telegram бот работает!');
      console.log('📱 Проверьте ваш Telegram - должно прийти тестовое сообщение');
      console.log('');
      console.log('🔧 Теперь обновите .env.local:');
      console.log(`TELEGRAM_TOKEN="${NEW_TOKEN}"`);
      console.log(`TELEGRAM_CHAT_ID="${NEW_CHAT_ID}"`);
      return true;
    }

  } catch (error) {
    console.error('❌ Ошибка:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.log('💡 Решение: Неверный токен. Создайте нового бота через @BotFather');
    }
    if (error.response?.status === 403) {
      console.log('💡 Решение: Бот не может писать в чат. Добавьте бота в группу или начните чат');
    }
    if (error.response?.status === 400) {
      console.log('💡 Решение: Неверный Chat ID. Проверьте правильность ID');
    }

    return false;
  }
}

testNewTelegramBot();