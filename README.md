# AI Crew Connect

Платформа для обучения искусственному интеллекту для детей от 8 до 17 лет.

## 🚀 Как развернуть на Vercel

### Способ 1: Через Vercel Dashboard (Рекомендуется)

1. **Создайте аккаунт на Vercel:**
   - Перейдите на [vercel.com](https://vercel.com)
   - Зарегистрируйтесь через GitHub

2. **Загрузите проект на GitHub:**
   - Создайте новый репозиторий на GitHub
   - Загрузите туда папку проекта

3. **Подключите к Vercel:**
   - В Vercel Dashboard нажмите "New Project"
   - Выберите ваш GitHub репозиторий
   - Нажмите "Deploy"

### Способ 2: Через Vercel CLI

```bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в аккаунт
vercel login

# Разверните проект
vercel --prod
```

## ⚙️ Настройка переменных окружения

В настройках проекта Vercel добавьте следующие переменные:

```env
DATABASE_URL=postgresql://aicrew_owner:wUepBgKK9HNy@ep-frosty-wood-a5sgg9vz.us-east-2.aws.neon.tech/aicrew?sslmode=require
TELEGRAM_TOKEN=8479942990:AAFw-fqhBWDXKffUSZ25G000VX7rpPL4d_I
TELEGRAM_CHAT_ID=-8479942990
```

## 📋 Функции сайта

- ✅ **Регистрация студентов** - формы на всех страницах
- ✅ **PostgreSQL база данных** - хранение данных студентов
- ✅ **Telegram уведомления** - автоматические уведомления о новых регистрациях
- ✅ **Админ панель** - просмотр зарегистрированных студентов
- ✅ **Responsive дизайн** - адаптация под все устройства
- ✅ **WhatsApp интеграция** - прямая связь с потенциальными клиентами

## 🔧 Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Открыть http://localhost:3000
```

## 📁 Структура проекта

```
src/
├── app/
│   ├── page.tsx              # Главная страница
│   ├── ai-creator/           # AI Creator курс
│   ├── ai-kids/              # AI Kids курс
│   ├── vibe-coding/          # Вайб Кодинг курс
│   ├── admin/students/       # Админ панель
│   └── api/register/         # API регистрации
├── components/
│   └── RegistrationModal.tsx # Модальное окно регистрации
lib/
├── db.ts                     # Подключение к PostgreSQL
├── telegram.ts               # Telegram уведомления
└── init-db.ts                # Инициализация БД
```

## 🎯 Курсы

1. **AI Creator** - Творческие проекты с ИИ
2. **AI Kids** - Интерактивное знакомство с ИИ (8-12 лет)
3. **Вайб Кодинг** - Программирование с элементами ИИ

## 📞 Контакты

- **WhatsApp:** +7 708 809 8009
- **Email:** info@aicrew.connect
- **Telegram:** @ai_corgi
- **Instagram:** @code_on_vibe
- **YouTube:** @noaicancode

---

🤖 **Generated with Claude Code**
