'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiClient } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Header } from '@/components/header';
import { 
  PhoneIcon, 
  KeyIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const loginSchema = z.object({
  phone: z.string().min(1, 'Введите номер телефона'),
  password: z.string().min(1, 'Введите пароль'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken, setAuthenticated } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await apiClient.login({
        phone: data.phone,
        password: data.password,
      });
      
      if (response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        setAuthenticated(true);
        toast.success('Вход выполнен успешно!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Неверный номер телефона или пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Вход в систему
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Войдите в свой аккаунт для продолжения работы
            </p>
          </div>
          
          <div className="card p-8">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Номер телефона
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    {...register('phone')}
                    className="input-field pl-10"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    {...register('password')}
                    className="input-field pl-10"
                    placeholder="Введите пароль"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Входим...</span>
                  </div>
                ) : (
                  <>
                    <span>Войти</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Нет аккаунта?{' '}
                <a href="/register" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Зарегистрироваться
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 