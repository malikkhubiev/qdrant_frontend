'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CheckIcon,
  ClockIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { callSettingsSchema, CallSettingsFormData } from '@/lib/validations';
import { useAppStore } from '@/lib/store';
import { toast } from 'react-hot-toast';

interface SettingsTabProps {
  onComplete?: () => void;
}

export function SettingsTab({ onComplete }: SettingsTabProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { callSettings, setCallSettings } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CallSettingsFormData>({
    resolver: zodResolver(callSettingsSchema),
    defaultValues: callSettings
  });

  const onSubmit = async (data: CallSettingsFormData) => {
    setIsSaving(true);
    try {
      setCallSettings(data);
      toast.success('Настройки сохранены!');
      reset(data);
      onComplete?.();
    } catch (error) {
      toast.error('Ошибка при сохранении настроек');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
          <ChartBarIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Настройки
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Настройте параметры робота
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="maxCallsPerDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Максимум звонков в день
            </label>
            <input
              {...register('maxCallsPerDay', { valueAsNumber: true })}
              type="number"
              min="1"
              max="1000"
              className="input-field"
              placeholder="100"
            />
            {errors.maxCallsPerDay && (
              <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                {errors.maxCallsPerDay.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="callDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Длительность звонка (сек)
            </label>
            <input
              {...register('callDuration', { valueAsNumber: true })}
              type="number"
              min="30"
              max="600"
              className="input-field"
              placeholder="120"
            />
            {errors.callDuration && (
              <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                {errors.callDuration.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="retryAttempts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Попытки перезвона
            </label>
            <input
              {...register('retryAttempts', { valueAsNumber: true })}
              type="number"
              min="0"
              max="5"
              className="input-field"
              placeholder="2"
            />
            {errors.retryAttempts && (
              <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                {errors.retryAttempts.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="retryDelay" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Задержка между попытками (мин)
            </label>
            <input
              {...register('retryDelay', { valueAsNumber: true })}
              type="number"
              min="5"
              max="1440"
              className="input-field"
              placeholder="30"
            />
            {errors.retryDelay && (
              <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                {errors.retryDelay.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Рабочие часы
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Начало
              </label>
              <input
                {...register('workingHoursStart')}
                type="time"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Конец
              </label>
              <input
                {...register('workingHoursEnd')}
                type="time"
                className="input-field"
              />
            </div>
          </div>
          {errors.workingHoursStart && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">
              {errors.workingHoursStart.message}
            </p>
          )}
          {errors.workingHoursEnd && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">
              {errors.workingHoursEnd.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Дополнительные настройки
          </h4>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('enableVoicemail')}
                type="checkbox"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Оставлять голосовые сообщения
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('enableSms')}
                type="checkbox"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Отправлять SMS после звонка
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('enableRecording')}
                type="checkbox"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Записывать звонки
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full btn-primary flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Сохранение...</span>
            </div>
          ) : (
            <>
              <CheckIcon className="w-4 h-4 mr-2" />
              Сохранить настройки
            </>
          )}
        </button>
      </form>
    </div>
  );
} 