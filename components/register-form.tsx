'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/lib/validations';
import { apiClient } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import InputMask from 'react-input-mask';
import { 
  PhoneIcon, 
  KeyIcon, 
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';

type Step = 1 | 2 | 3;

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();
  const { setUser, setToken, setAuthenticated } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchedPhone = watch('phone');
  const watchedCode = watch('code');

  const handlePhoneSubmit = async (data: { phone: string }) => {
    setIsLoading(true);
    try {
      await apiClient.sendSms({ phone: data.phone });
      setPhone(data.phone);
      setCurrentStep(2);
      toast.success('SMS с кодом подтверждения отправлен!');
    } catch (error) {
      toast.error('Ошибка при отправке SMS. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (data: { code: string }) => {
    setIsLoading(true);
    try {
      await apiClient.verifyCode({ phone, code: data.code });
      setCode(data.code);
      setCurrentStep(3);
      toast.success('Код подтвержден!');
    } catch (error) {
      toast.error('Неверный код. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await apiClient.register({
        phone,
        code,
        password: data.password,
      });
      
      if (response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        setAuthenticated(true);
        toast.success('Регистрация успешна! Перенаправляем в личный кабинет...');
        
        // Небольшая задержка для показа сообщения
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (error) {
      toast.error('Ошибка при регистрации. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'Телефон', icon: PhoneIcon },
    { id: 2, title: 'Код', icon: KeyIcon },
    { id: 3, title: 'Пароль', icon: CheckIcon },
  ];

  return (
    <div className="card p-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.id
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
            }`}>
              {currentStep > step.id ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${
                currentStep > step.id ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
              }`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Введите номер телефона
            </h2>
            <form onSubmit={handleSubmit(handlePhoneSubmit)} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Номер телефона
                </label>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  {...register('phone')}
                  className="input-field"
                  placeholder="+7 (___) ___-__-__"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !watchedPhone}
                className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Отправляем SMS...</span>
                  </div>
                ) : (
                  <>
                    <span>Отправить SMS</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Введите код из SMS
            </h2>
            <form onSubmit={handleSubmit(handleCodeSubmit)} className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Код подтверждения
                </label>
                <input
                  type="text"
                  {...register('code')}
                  className="input-field text-center text-2xl tracking-widest"
                  placeholder="0000"
                  maxLength={4}
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {errors.code.message}
                  </p>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 btn-secondary flex items-center justify-center"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Назад
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !watchedCode || watchedCode.length !== 4}
                  className="flex-1 btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Проверяем...</span>
                    </div>
                  ) : (
                    <>
                      <span>Подтвердить</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Создайте пароль
            </h2>
            <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  {...register('password')}
                  className="input-field"
                  placeholder="Минимум 8 символов"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 btn-secondary flex items-center justify-center"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Назад
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Создаем аккаунт...</span>
                    </div>
                  ) : (
                    <>
                      <span>Завершить регистрацию</span>
                      <CheckIcon className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 