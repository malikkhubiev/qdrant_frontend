# Инструкция по установке и настройке

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Создание файла переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Stripe Configuration (для платежей)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# SMS Service Configuration
SMS_API_KEY=your_sms_api_key_here
SMS_API_URL=https://api.sms.ru

# AI Service Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📦 Установленные зависимости

### Основные
- **Next.js 14+** - React фреймворк с App Router
- **React 18** - Библиотека для создания пользовательских интерфейсов
- **TypeScript** - Типизированный JavaScript

### Стилизация
- **Tailwind CSS** - Utility-first CSS фреймворк
- **Framer Motion** - Библиотека анимаций
- **Headless UI** - Нестилизованные компоненты

### Управление состоянием и данными
- **Zustand** - Легковесное управление состоянием
- **React Query** - Кэширование и управление серверным состоянием
- **React Hook Form** - Управление формами

### Валидация и типизация
- **Zod** - Схемы валидации TypeScript-first
- **@hookform/resolvers** - Интеграция Zod с React Hook Form

### UI компоненты
- **@heroicons/react** - SVG иконки
- **react-hot-toast** - Toast уведомления
- **react-input-mask** - Маски для полей ввода

### Платежи
- **Stripe** - Платежная система
- **@stripe/stripe-js** - Stripe JavaScript SDK
- **@stripe/react-stripe-js** - React компоненты для Stripe

### Утилиты
- **clsx** - Условные классы
- **tailwind-merge** - Объединение Tailwind классов
- **date-fns** - Работа с датами
- **papaparse** - Парсинг CSV

## 🔧 Настройка API ключей

### Stripe (для платежей)

1. Зарегистрируйтесь на [stripe.com](https://stripe.com)
2. Получите тестовые ключи в Dashboard
3. Добавьте в `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### SMS сервис (SMS.ru)

1. Зарегистрируйтесь на [sms.ru](https://sms.ru)
2. Получите API ключ
3. Добавьте в `.env.local`:

```env
SMS_API_KEY=your_api_key_here
SMS_API_URL=https://api.sms.ru
```

### OpenAI (для AI обработки)

1. Зарегистрируйтесь на [openai.com](https://openai.com)
2. Получите API ключ
3. Добавьте в `.env.local`:

```env
OPENAI_API_KEY=sk-...
```

## 🎨 Настройка дизайна

### Цветовая схема

Проект использует кастомную цветовую схему в `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ...
  },
  success: { /* зеленый */ },
  warning: { /* желтый */ },
  error: { /* красный */ }
}
```

### Шрифты

По умолчанию используется Inter:

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

## 📱 Адаптивность

Проект полностью адаптивен и использует следующие брейкпоинты:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🌙 Темная тема

Поддерживается автоматическое переключение темной/светлой темы:

- Автоопределение системной темы
- Ручное переключение
- Сохранение выбора в localStorage

## ⚡ Оптимизация производительности

### Кэширование
- React Query кэширует запросы на 5 минут
- Prefetch данных при hover
- Оптимизированные селекторы Zustand

### Code Splitting
- Dynamic imports для тяжелых компонентов
- Автоматическое разделение по чанкам
- Lazy loading изображений

### Bundle Optimization
- Tree shaking
- Минификация в production
- Оптимизация изображений

## 🔒 Безопасность

### Валидация
- Все формы валидируются через Zod
- Серверная валидация API роутов
- Санитизация пользовательского ввода

### Аутентификация
- JWT токены
- Безопасное хранение в localStorage
- Автоматическое обновление токенов

## 🚀 Развертывание

### Vercel (рекомендуется)

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Разверните проект:
```bash
vercel
```

### Docker

Создайте `Dockerfile`:

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

### Другие платформы

Проект совместим с:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🐛 Отладка

### Логирование

Включите отладку в `.env.local`:

```env
NEXT_PUBLIC_DEBUG=true
```

### React Query DevTools

В режиме разработки доступны React Query DevTools для отладки кэширования.

### TypeScript проверка

```bash
npm run type-check
```

## 📝 Скрипты

```json
{
  "dev": "next dev",           // Запуск в режиме разработки
  "build": "next build",       // Сборка для продакшена
  "start": "next start",       // Запуск продакшен сервера
  "lint": "next lint",         // Проверка кода
  "type-check": "tsc --noEmit" // Проверка типов TypeScript
}
```

## 🤝 Поддержка

При возникновении проблем:

1. Проверьте версии Node.js (требуется 18+)
2. Убедитесь, что все зависимости установлены
3. Проверьте настройки в `.env.local`
4. Очистите кэш: `rm -rf .next node_modules && npm install`

## 📚 Дополнительные ресурсы

- [Next.js документация](https://nextjs.org/docs)
- [Tailwind CSS документация](https://tailwindcss.com/docs)
- [React Query документация](https://tanstack.com/query/latest)
- [Zod документация](https://zod.dev)
- [Framer Motion документация](https://www.framer.com/motion/) 