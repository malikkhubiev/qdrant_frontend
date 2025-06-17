'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testCallSchema, TestCallFormData } from '@/lib/validations';
import { useAppStore } from '@/lib/store';
import { apiClient } from '@/lib/api';
import { toast } from 'react-hot-toast';
import InputMask from 'react-input-mask';

export function TestCallModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestCallFormData>({
    resolver: zodResolver(testCallSchema),
  });

  const onSubmit = async (data: TestCallFormData) => {
    setIsLoading(true);
    try {
      await apiClient.testCall(data);
      toast.success('Тестовый звонок запрошен! Мы перезвоним вам в течение 5 минут.');
      setSidebarOpen(false);
      reset();
    } catch (error) {
      toast.error('Ошибка при отправке запроса. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Тестовый звонок
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Попробуйте нашего робота бесплатно
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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

              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">i</span>
                  </div>
                  <div className="text-sm text-primary-700 dark:text-primary-300">
                    <p className="font-medium mb-1">Что произойдет дальше?</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Наш робот перезвонит вам в течение 5 минут</li>
                      <li>• Продемонстрирует возможности AI-продажника</li>
                      <li>• Ответит на ваши вопросы о сервисе</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Отправляем запрос...</span>
                  </div>
                ) : (
                  <>
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    Позвонить мне
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 