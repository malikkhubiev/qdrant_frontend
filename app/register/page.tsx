'use client';

import { RegisterForm } from '@/components/register-form';
import { Header } from '@/components/header';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setToken, setAuthenticated } = useAppStore();

  const handleDemoLogin = async () => {
    // Фейковый пользователь для демо-режима
    const user = {
      id: 'demo',
      phone: '+7 (999) 123-45-67',
      name: 'Демо пользователь',
      company: 'Demo',
      balance: 0,
      minutesUsed: 0,
      minutesTotal: 2000,
      isActive: true,
      createdAt: new Date().toISOString(),
      settings: {
        notifications: true,
        autoRecharge: false,
        language: 'ru',
      },
    };
    const token = 'demo_token';
    setUser(user);
    setToken(token);
    setAuthenticated(true);
    toast.success('Добро пожаловать в демо-режим!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="pt-[170px] pb-16 px-4">
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