'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CogIcon,
  BellIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';
import { useAppStore } from '@/lib/store';
import { toast } from 'react-hot-toast';

export function SettingsTab() {
  const { callSettings, setCallSettings } = useAppStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleMaxCallsChange = (value: number) => {
    setCallSettings({
      ...callSettings,
      maxConcurrentCalls: value,
    });
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Здесь будет API вызов для сохранения настроек
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Настройки сохранены!');
    } catch (error) {
      toast.error('Ошибка при сохранении настроек');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
          <ChartBarIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Настройки
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Управляйте параметрами работы робота
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Call Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <CogIcon className="w-4 h-4 mr-2" />
            Настройки звонков
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Максимум одновременных звонков
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={callSettings.maxConcurrentCalls}
                  onChange={(e) => handleMaxCallsChange(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[3rem]">
                  {callSettings.maxConcurrentCalls}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Рекомендуется: 5-10 звонков для стабильной работы
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <BellIcon className="w-4 h-4 mr-2" />
            Уведомления
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Email уведомления</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Получать отчеты на email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">SMS уведомления</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Критические события по SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <ShieldCheckIcon className="w-4 h-4 mr-2" />
            Безопасность
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Двухфакторная аутентификация</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Дополнительная защита аккаунта</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Логирование действий</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Записывать все действия в системе</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Сохранение...</span>
            </div>
          ) : (
            'Сохранить настройки'
          )}
        </button>
      </div>
    </div>
  );
} 