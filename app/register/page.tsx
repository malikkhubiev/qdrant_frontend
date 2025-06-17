'use client';

import { RegisterForm } from '@/components/register-form';
import { Header } from '@/components/header';
import { apiClient } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setToken, setAuthenticated } = useAppStore();

  const handleDemoLogin = async () => {
    try {
      // Создаем демо-пользователя
      const response = await apiClient.register({
        phone: '+7 (999) 123-45-67',
        code: '1234',
        password: 'demo123456'
      });
      
      if (response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        setAuthenticated(true);
        toast.success('Добро пожаловать в демо-режим!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Ошибка входа в демо-режим');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Регистрация
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Создайте аккаунт и начните использовать робота-продажника
            </p>
          </div>
          
          <RegisterForm />
          
          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-500 dark:text-gray-400">
                  или
                </span>
              </div>
            </div>
            
            <button
              onClick={handleDemoLogin}
              className="mt-4 w-full btn-outline"
            >
              Попробовать демо-версию
            </button>
            
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Демо-режим позволяет ознакомиться с функционалом без регистрации
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 