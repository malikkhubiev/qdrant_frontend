'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCardIcon, 
  CircleStackIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useAppStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

interface BalanceTabProps {
  onComplete?: () => void;
}

export function BalanceTab({ onComplete }: BalanceTabProps) {
  const { user } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Моковые данные для демонстрации
  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 1490,
      description: 'Тариф "Бизнес" - 2000 минут',
      date: '2024-01-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: -150,
      description: 'Исходящие звонки (150 минут)',
      date: '2024-01-14T15:45:00Z',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 490,
      description: 'Тариф "Старт" - 500 минут',
      date: '2024-01-10T09:15:00Z',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success-600 dark:text-success-400';
      case 'pending':
        return 'text-warning-600 dark:text-warning-400';
      case 'failed':
        return 'text-error-600 dark:text-error-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Завершено';
      case 'pending':
        return 'В обработке';
      case 'failed':
        return 'Ошибка';
      default:
        return 'Неизвестно';
    }
  };

  const handleTopUp = async (amount: number) => {
    setIsProcessing(true);
    try {
      // Имитация пополнения баланса
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete?.();
    } catch (error) {
      console.error('Top up failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
          <CreditCardIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Баланс
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Управляйте финансами и тарифами
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Current Balance */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {/* <CurrencyRubleIcon className="w-6 h-6" /> */}
              <span className="text-lg font-medium">Текущий баланс</span>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">
            {formatCurrency(user?.balance || 0)}
          </div>
          <p className="text-primary-100 text-sm">
            Доступно для звонков
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/payment?type=incoming" className="btn-primary text-center">
            <ArrowUpIcon className="w-4 h-4 mr-2 inline" />
            Пополнить
          </Link>
          <button className="btn-outline text-center">
            <ArrowDownIcon className="w-4 h-4 mr-2 inline" />
            Вывести
          </button>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              1,850
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Минут использовано
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              150
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Звонков сегодня
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              85%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Конверсия
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Последние операции
            </h4>
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              Все операции
            </button>
          </div>
          
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' 
                      ? 'bg-success-100 dark:bg-success-900' 
                      : 'bg-error-100 dark:bg-error-900'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowUpIcon className="w-4 h-4 text-success-600 dark:text-success-400" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 text-error-600 dark:text-error-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon className="w-3 h-3" />
                      <span>{new Date(transaction.date).toLocaleDateString('ru-RU')}</span>
                      <span className={getStatusColor(transaction.status)}>
                        {getStatusText(transaction.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  transaction.type === 'credit' 
                    ? 'text-success-600 dark:text-success-400' 
                    : 'text-error-600 dark:text-error-400'
                }`}>
                  {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Текущий тариф
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Бизнес
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                2000 минут • 1490₽/месяц
              </p>
            </div>
            <Link href="/payment" className="btn-outline text-sm px-3 py-1">
              Изменить
            </Link>
          </div>
        </div>

        {/* Quick Top Up */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Быстрое пополнение
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[100, 500, 1000, 2000].map((amount) => (
              <motion.button
                key={amount}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTopUp(amount)}
                disabled={isProcessing}
                className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(amount)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Пополнить
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Способы оплаты
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">V</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Visa/Mastercard</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Банковские карты</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">S</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">СБП</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Система быстрых платежей</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">Y</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">ЮMoney</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Электронный кошелек</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 