import { QueryClient } from '@tanstack/react-query';
import { ApiResponse, TestCallRequest, ProcessKnowledgeRequest, ActivateServiceRequest, RegisterRequest, LoginRequest, SendSmsRequest, VerifyCodeRequest, User, KnowledgeItem, Integration, CallSettings, Tariff, PaymentIntent } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Создаем axios инстанс
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки ошибок
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/register';
    }
    return Promise.reject(error);
  }
);

// Фейковые данные пользователей
const fakeUsers = new Map();
let fakeUserId = 1;

// Фейковые функции для демонстрации
export const apiClient = {
  // Отправка SMS (фейковая)
  sendSms: async ({ phone }: { phone: string }) => {
    // Имитируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // В реальном приложении здесь был бы вызов API
    console.log(`SMS отправлен на номер: ${phone}`);
    
    return { success: true, message: 'SMS отправлен' };
  },

  // Проверка кода (фейковая)
  verifyCode: async ({ phone, code }: { phone: string; code: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Принимаем любой 4-значный код для демонстрации
    if (code.length === 4 && /^\d+$/.test(code)) {
      return { success: true, message: 'Код подтвержден' };
    } else {
      throw new Error('Неверный код');
    }
  },

  // Регистрация (фейковая)
  register: async ({ phone, code, password }: { phone: string; code: string; password: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Создаем фейкового пользователя
    const user = {
      id: `user_${fakeUserId++}`,
      phone,
      email: `${phone.replace(/\D/g, '')}@example.com`,
      name: `Пользователь ${phone}`,
      company: 'Моя компания',
      balance: 0,
      minutesUsed: 0,
      minutesTotal: 2000,
      isActive: true,
      createdAt: new Date().toISOString(),
      settings: {
        notifications: true,
        autoRecharge: false,
        language: 'ru'
      }
    };
    
    const token = `fake_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Сохраняем в localStorage для демонстрации
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    fakeUsers.set(phone, { user, token });
    
    return {
      data: {
        user,
        token
      }
    };
  },

  // Авторизация (фейковая)
  login: async ({ phone, password }: { phone: string; password: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Проверяем, есть ли пользователь
    const existingUser = fakeUsers.get(phone);
    if (existingUser) {
      localStorage.setItem('token', existingUser.token);
      localStorage.setItem('user', JSON.stringify(existingUser.user));
      return { data: existingUser };
    }
    
    throw new Error('Пользователь не найден');
  },

  // Получение профиля пользователя
  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return { data: JSON.parse(userStr) };
    }
    
    throw new Error('Пользователь не авторизован');
  },

  // Обновление профиля
  updateProfile: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { data: updatedUser };
    }
    
    throw new Error('Пользователь не авторизован');
  },

  // Тестовый звонок
  testCall: async (data: { phone: string; script?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      data: {
        callId: `call_${Date.now()}`,
        status: 'completed',
        duration: Math.floor(Math.random() * 180) + 30, // 30-210 секунд
        result: 'success',
        transcript: 'Здравствуйте! Меня зовут Алексей, я менеджер по продажам. Чем могу помочь?'
      }
    };
  },

  // Обработка базы знаний
  processKnowledge: async (data: { content: string; type: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      data: {
        id: `kb_${Date.now()}`,
        content: data.content,
        type: data.type,
        processed: true,
        keywords: ['продажи', 'услуги', 'цены'],
        createdAt: new Date().toISOString()
      }
    };
  },

  // Получение статистики
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      data: {
        totalCalls: 1247,
        successfulCalls: 892,
        conversionRate: 71.5,
        averageCallDuration: 145,
        totalMinutes: 30120,
        monthlyGrowth: 23.4
      }
    };
  },

  // Получение истории звонков
  getCallHistory: async (params: { page?: number; limit?: number } = {}) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const calls = Array.from({ length: 20 }, (_, i) => ({
      id: `call_${Date.now()}_${i}`,
      phone: `+7 (999) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 90) + 10)}-${String(Math.floor(Math.random() * 90) + 10)}`,
      duration: Math.floor(Math.random() * 300) + 30,
      status: ['completed', 'missed', 'busy'][Math.floor(Math.random() * 3)],
      result: ['success', 'no_answer', 'busy'][Math.floor(Math.random() * 3)],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      cost: Math.floor(Math.random() * 50) + 10
    }));
    
    return {
      data: {
        calls,
        total: 1247,
        page: params.page || 1,
        limit: params.limit || 20
      }
    };
  }
};

export default axiosInstance;

// React Query конфигурация
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут (заменяет cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
}); 