'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCardIcon, 
  CheckIcon,
  StarIcon 
} from '@heroicons/react/24/outline';
import { formatCurrency, formatMinutes } from '@/lib/utils';

interface PaymentFormProps {
  serviceType: 'incoming' | 'outgoing';
}

const tariffs = [
  {
    id: 'start',
    name: 'Старт',
    minutes: 500,
    price: 490,
    features: [
      '500 минут разговоров',
      'Базовая база знаний',
      'Email поддержка',
      'Отчеты по звонкам'
    ],
    isPopular: false
  },
  {
    id: 'business',
    name: 'Бизнес',
    minutes: 2000,
    price: 1490,
    features: [
      '2000 минут разговоров',
      'Расширенная база знаний',
      'CRM интеграция',
      'Приоритетная поддержка',
      'Детальная аналитика'
    ],
    isPopular: true
  },
  {
    id: 'pro',
    name: 'Профи',
    minutes: 10000,
    price: 4990,
    features: [
      '10000 минут разговоров',
      'Неограниченная база знаний',
      'Все интеграции',
      'Персональный менеджер',
      'API доступ',
      'Кастомные скрипты'
    ],
    isPopular: false
  }
];

export function PaymentForm({ serviceType }: PaymentFormProps) {
  const [selectedTariff, setSelectedTariff] = useState('business');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Здесь будет интеграция со Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      // После успешной оплаты
      console.log('Payment successful');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedTariffData = tariffs.find(t => t.id === selectedTariff);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tariff Selection - Horizontal */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Выберите тариф
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Выберите подходящий план для вашего бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tariffs.map((tariff) => (
            <motion.div
              key={tariff.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${
                selectedTariff === tariff.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedTariff(tariff.id)}
            >
              {tariff.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                    <StarIcon className="w-3 h-3 mr-1" />
                    Популярный
                  </div>
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {tariff.name}
                </h3>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatCurrency(tariff.price)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  в месяц
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {formatMinutes(tariff.minutes)} разговоров
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {tariff.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <CheckIcon className="w-4 h-4 text-success-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {selectedTariff === tariff.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Form - Centered */}
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Оплата
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Безопасная оплата через Stripe
          </p>
        </div>

        {/* Order Summary */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Сводка заказа
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Тариф:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {selectedTariffData?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Минуты:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatMinutes(selectedTariffData?.minutes || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Тип сервиса:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {serviceType === 'incoming' ? 'Входящие звонки' : 'Исходящие звонки'}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Итого:
                </span>
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(selectedTariffData?.price || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Обработка платежа...</span>
              </div>
            ) : (
              <>
                <CreditCardIcon className="w-5 h-5 mr-2" />
                Оплатить {formatCurrency(selectedTariffData?.price || 0)}
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            Нажимая кнопку, вы соглашаетесь с условиями использования
          </p>
        </div>

        {/* Security Info */}
        <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-4 mt-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success-100 dark:bg-success-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckIcon className="w-3 h-3 text-success-600 dark:text-success-400" />
            </div>
            <div className="text-sm text-success-700 dark:text-success-300">
              <p className="font-medium mb-1">Безопасная оплата</p>
              <p className="text-xs">
                Ваши данные защищены SSL-шифрованием. Мы не храним данные карт.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 