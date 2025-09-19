const axios = require('axios');

const TOKEN = "8479942990:AAFm0fbmWzIDl2n-_twdPMcWcb-3R38uyfs";

async function getChatId() {
  try {
    console.log('🔍 Получаем Chat ID из Telegram...');
    console.log('');
    console.log('📋 ИНСТРУКЦИЯ:');
    console.log('1. Найдите вашего бота в Telegram');
    console.log('2. Нажмите /start');
    console.log('3. Отправьте любое сообщение боту');
    console.log('4. Затем запустите этот скрипт снова');
    console.log('');

    const response = await axios.get(
      `https://api.telegram.org/bot${TOKEN}/getUpdates`
    );

    if (response.data.ok && response.data.result.length > 0) {
      console.log('✅ Найдены сообщения:');
      console.log('');

      response.data.result.forEach((update, index) => {
        if (update.message) {
          const chatId = update.message.chat.id;
          const firstName = update.message.chat.first_name || 'Unknown';
          const text = update.message.text;

          console.log(`📨 Сообщение ${index + 1}:`);
          console.log(`   👤 От: ${firstName}`);
          console.log(`   🔢 Chat ID: ${chatId}`);
          console.log(`   💬 Текст: "${text}"`);
          console.log('');

          if (index === response.data.result.length - 1) {
            console.log('🎯 ИСПОЛЬЗУЙТЕ ЭТОТ CHAT ID:');
            console.log(`   ${chatId}`);
          }
        }
      });

    } else {
      console.log('❌ Сообщения не найдены.');
      console.log('');
      console.log('💡 ЧТО ДЕЛАТЬ:');
      console.log('1. Найдите бота в Telegram (поиск по username)');
      console.log('2. Нажмите /start');
      console.log('3. Отправьте сообщение: "Тест"');
      console.log('4. Запустите скрипт снова: node scripts/get-chat-id.js');
    }

  } catch (error) {
    console.error('❌ Ошибка:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.log('💡 Неверный токен бота!');
    }
  }
}

getChatId();