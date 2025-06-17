# Робот-продажник 24/7 - Фронтенд

Высокооптимизированный фронтенд для сервиса автоматизированных звонков на React/Next.js.

## 🚀 Технологии

- **Next.js 14+** (App Router)
- **React 18** с TypeScript
- **Tailwind CSS** для стилизации
- **React Query** для кэширования и управления данными
- **Zod** для валидации форм
- **Framer Motion** для анимаций
- **Zustand** для управления состоянием
- **React Hook Form** для работы с формами
- **Stripe** для платежей
- **Headless UI** для компонентов

## ✨ Особенности

- 🎨 Современный адаптивный дизайн
- 🌙 Поддержка темной/светлой темы
- ⚡ Оптимизированная производительность
- 🔄 Lazy loading компонентов
- 💾 Кэширование API-запросов
- 📱 Полностью адаптивный интерфейс
- 🔒 Валидация форм с Zod
- 🎭 Плавные анимации с Framer Motion

## 📋 Структура проекта

```
qdrant-adminka/
├── app/                    # Next.js App Router
│   ├── api/               # API роуты
│   ├── dashboard/         # Личный кабинет
│   ├── payment/           # Страница оплаты
│   ├── register/          # Регистрация
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Корневой layout
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── ui/               # UI компоненты
│   ├── forms/            # Формы
│   └── layout/           # Layout компоненты
├── lib/                  # Утилиты и конфигурация
│   ├── api.ts           # API клиент
│   ├── store.ts         # Zustand store
│   ├── utils.ts         # Утилиты
│   └── validations.ts   # Zod схемы
├── types/               # TypeScript типы
└── public/              # Статические файлы
```

## 🛠 Установка и запуск

### Предварительные требования

- Node.js 18+ 
- npm или yarn

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd qdrant-adminka
```

### 2. Установка зависимостей

```bash
npm install
# или
yarn install
```

### 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Stripe (для платежей)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret

# SMS сервис (опционально)
SMS_API_KEY=your_sms_api_key
SMS_API_URL=https://api.sms.ru

# AI сервис (опционально)
OPENAI_API_KEY=your_openai_key
```

### 4. Запуск в режиме разработки

```bash
npm run dev
# или
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### 5. Сборка для продакшена

```bash
npm run build
npm start
```

## 📱 Функциональность

### Главная страница (/)
- 🎯 Герой-секция с основным предложением
- ✨ 3 ключевых преимущества
- 🎥 Видео-демо (lazy-loaded)
- 📞 Модалка для тестового звонка
- 🔗 Кнопка регистрации

### Регистрация (/register)
- 📱 3-шаговый процесс регистрации
- 🔐 SMS-подтверждение
- 🔒 Создание пароля
- ✅ Валидация форм

### Личный кабинет (/dashboard)
- 📊 База знаний с AI-обработкой
- 🔗 Интеграции (CRM, API)
- ⚙️ Настройки звонков
- 💰 Управление балансом
- 📱 Адаптивный sidebar

### Оплата (/payment)
- 💳 Выбор тарифов
- 🔄 Stripe интеграция
- 📊 Динамические цены
- ✅ Безопасные платежи

## 🔧 API Endpoints

### Аутентификация
- `POST /api/auth/send-sms` - Отправка SMS
- `POST /api/auth/verify-code` - Подтверждение кода
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход

### Основные функции
- `POST /api/test-call` - Тестовый звонок
- `POST /api/process-knowledge` - Обработка базы знаний
- `POST /api/activate-service` - Активация сервиса

### Управление данными
- `GET /api/knowledge-base` - Получение базы знаний
- `PUT /api/knowledge-base` - Обновление базы знаний
- `GET /api/integrations` - Получение интеграций
- `PUT /api/integrations/:id` - Обновление интеграции

## 🎨 Дизайн система

### Цвета
- **Primary**: Синий (#3B82F6)
- **Success**: Зеленый (#22C55E)
- **Warning**: Желтый (#F59E0B)
- **Error**: Красный (#EF4444)

### Компоненты
- Кнопки: `btn-primary`, `btn-secondary`, `btn-outline`
- Поля ввода: `input-field`
- Карточки: `card`
- Градиенты: `gradient-bg`, `text-gradient`

## 📊 Производительность

### Оптимизации
- ⚡ Dynamic imports для тяжелых компонентов
- 💾 Кэширование запросов на 5 минут
- 🔄 Prefetch данных при hover
- 🖼️ Оптимизированные изображения (next/image)
- 📦 Code splitting по чанкам

### Метрики
- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🔒 Безопасность

- ✅ Валидация всех форм с Zod
- 🔐 JWT токены для аутентификации
- 🛡️ CSRF защита
- 🔒 Безопасные HTTP заголовки
- 📝 Логирование действий

## 🚀 Развертывание

### Vercel (рекомендуется)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Скрипты

```json
{
  "dev": "next dev",
  "build": "next build", 
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License.

## 📞 Поддержка

- 📧 Email: support@robot-sales.ru
- 💬 Telegram: @robot_sales_support
- 🌐 Сайт: https://robot-sales.ru

---

**Робот-продажник 24/7** - Автоматизируйте ваши продажи с помощью AI! 🤖📞 