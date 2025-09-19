# 🚀 Инструкция по деплою AI Crew Connect

## Быстрый старт для деплоя на Vercel

### 1. Подготовка к деплою ✅

Проект готов к деплою! Все файлы подготовлены:
- ✅ Next.js 15.5.3 настроен
- ✅ PostgreSQL база данных подключена
- ✅ Telegram уведомления настроены
- ✅ Все компоненты работают
- ✅ Git репозиторий создан

### 2. Загрузка на GitHub

1. **Создайте репозиторий:**
   - Зайдите на [github.com](https://github.com)
   - Нажмите "New repository"
   - Название: `ai-crew-connect`
   - Сделайте публичным или приватным

2. **Загрузите код:**
   ```bash
   git remote add origin https://github.com/ВАШ_USERNAME/ai-crew-connect.git
   git push -u origin master
   ```

### 3. Деплой на Vercel

1. **Перейдите на Vercel:**
   - Откройте [vercel.com](https://vercel.com)
   - Войдите через GitHub

2. **Создайте проект:**
   - Нажмите "New Project"
   - Выберите ваш репозиторий `ai-crew-connect`
   - Нажмите "Deploy"

### 4. ⚙️ Настройка переменных окружения

В настройках проекта Vercel добавьте:

```
DATABASE_URL=postgresql://aicrew_owner:wUepBgKK9HNy@ep-frosty-wood-a5sgg9vz.us-east-2.aws.neon.tech/aicrew?sslmode=require
TELEGRAM_TOKEN=8479942990:AAFw-fqhBWDXKffUSZ25G000VX7rpPL4d_I
TELEGRAM_CHAT_ID=-8479942990
```

### 5. ✅ Готово!

После деплоя вы получите ссылку вида:
`https://ai-crew-connect.vercel.app`

## 🔧 Локальный сервер работает на:
`http://localhost:3008`

## 📱 Что уже работает:

- **Главная страница** - с регистрацией
- **AI Creator** - страница курса с формой
- **AI Kids** - страница курса с формой
- **Вайб Кодинг** - страница курса
- **Админ панель** - `/admin/students`
- **API регистрации** - `/api/register`
- **WhatsApp кнопка** - прямая связь
- **Telegram уведомления** - при регистрации

## 🎯 После деплоя проверьте:

1. Откройте сайт
2. Нажмите "Начать Обучение"
3. Заполните форму
4. Проверьте Telegram уведомление
5. Зайдите в админку `/admin/students`

---

🤖 Проект готов к продакшену!