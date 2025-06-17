'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CogIcon, 
  LinkIcon,
  ClockIcon,
  PhoneIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { integrationSchema, IntegrationFormData } from '@/lib/validations';
import { apiClient } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import { parseCSV } from '@/lib/utils';

interface IntegrationsTabProps {
  onComplete?: () => void;
}

export function IntegrationsTab({ onComplete }: IntegrationsTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const { callSettings, setCallSettings, integrations, setIntegrations } = useAppStore();
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IntegrationFormData>({
    resolver: zodResolver(integrationSchema),
  });

  const availableIntegrations = [
    {
      id: 'crm',
      name: 'CRM система',
      description: 'Подключение к CRM для синхронизации данных',
      icon: '📊',
      status: 'available'
    },
    {
      id: 'telegram',
      name: 'Telegram Bot',
      description: 'Уведомления о звонках в Telegram',
      icon: '📱',
      status: 'available'
    },
    {
      id: 'email',
      name: 'Email интеграция',
      description: 'Отправка отчетов на email',
      icon: '📧',
      status: 'available'
    },
    {
      id: 'webhook',
      name: 'Webhook',
      description: 'Отправка данных на внешний сервер',
      icon: '🔗',
      status: 'available'
    }
  ];

  const onSubmit = async (data: IntegrationFormData) => {
    setIsLoading(true);
    try {
      // Обновляем CRM интеграцию
      await apiClient.updateIntegration('crm', data);
      toast.success('CRM интеграция обновлена!');
      reset();
    } catch (error) {
      toast.error('Ошибка при обновлении интеграции');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneNumbersChange = (value: string) => {
    setPhoneNumbers(value);
    const parsedNumbers = parseCSV(value);
    setCallSettings({
      ...callSettings,
      phoneNumbers: parsedNumbers,
    });
  };

  const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
    setCallSettings({
      ...callSettings,
      doNotDisturb: {
        ...callSettings.doNotDisturb,
        [field]: value,
      },
    });
  };

  const handleConnect = async (integrationId: string) => {
    setIsConnecting(integrationId);
    try {
      // Имитация подключения
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const integration = availableIntegrations.find(i => i.id === integrationId);
      if (integration) {
        const newIntegration = {
          id: integrationId,
          name: integration.name,
          type: integrationId,
          status: 'connected',
          connectedAt: new Date().toISOString()
        };
        
        setIntegrations([...integrations, newIntegration]);
        onComplete?.();
      }
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(integrations.filter(i => i.id !== integrationId));
  };

  const getIntegrationStatus = (integrationId: string) => {
    const connected = integrations.find(i => i.id === integrationId);
    return connected ? 'connected' : 'available';
  };

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
          <CogIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Интеграции
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Настройте подключения к внешним сервисам
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* CRM Integration */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <LinkIcon className="w-4 h-4 mr-2" />
            CRM Интеграция
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                API Ключ
              </label>
              <input
                {...register('apiKey')}
                type="password"
                className="input-field"
                placeholder="Введите API ключ CRM"
              />
              {errors.apiKey && (
                <p className="mt-1 text-xs text-error-600 dark:text-error-400">
                  {errors.apiKey.message}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL API
              </label>
              <input
                {...register('url')}
                type="url"
                className="input-field"
                placeholder="https://api.crm.com"
              />
              {errors.url && (
                <p className="mt-1 text-xs text-error-600 dark:text-error-400">
                  {errors.url.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Сохранение...' : 'Сохранить CRM'}
            </button>
          </form>
        </div>

        {/* Time Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <ClockIcon className="w-4 h-4 mr-2" />
            Время "Не беспокоить"
          </h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="doNotDisturb"
                checked={callSettings.doNotDisturb.enabled}
                onChange={(e) => setCallSettings({
                  ...callSettings,
                  doNotDisturb: {
                    ...callSettings.doNotDisturb,
                    enabled: e.target.checked,
                  },
                })}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="doNotDisturb" className="text-sm text-gray-700 dark:text-gray-300">
                Включить режим "Не беспокоить"
              </label>
            </div>
            
            {callSettings.doNotDisturb.enabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Начало
                  </label>
                  <input
                    type="time"
                    value={callSettings.doNotDisturb.startTime}
                    onChange={(e) => handleTimeChange('startTime', e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Конец
                  </label>
                  <input
                    type="time"
                    value={callSettings.doNotDisturb.endTime}
                    onChange={(e) => handleTimeChange('endTime', e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Phone Numbers */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <PhoneIcon className="w-4 h-4 mr-2" />
            Номера телефонов
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Загрузка номеров
              </label>
              <textarea
                value={phoneNumbers}
                onChange={(e) => handlePhoneNumbersChange(e.target.value)}
                rows={4}
                className="input-field resize-none text-sm"
                placeholder="Введите номера телефонов (по одному на строку или через запятую):&#10;+7 (999) 123-45-67&#10;+7 (999) 234-56-78"
              />
            </div>
            
            {callSettings.phoneNumbers.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Загружено номеров: {callSettings.phoneNumbers.length}
                </p>
                <div className="max-h-20 overflow-y-auto">
                  {callSettings.phoneNumbers.slice(0, 5).map((phone, index) => (
                    <div key={index} className="text-xs text-gray-700 dark:text-gray-300">
                      {phone}
                    </div>
                  ))}
                  {callSettings.phoneNumbers.length > 5 && (
                    <div className="text-xs text-gray-500">
                      ... и еще {callSettings.phoneNumbers.length - 5} номеров
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableIntegrations.map((integration) => {
            const status = getIntegrationStatus(integration.id);
            const isConnected = status === 'connected';
            const connectedIntegration = integrations.find(i => i.id === integration.id);
            
            return (
              <motion.div
                key={integration.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isConnected
                    ? 'border-success-500 bg-success-50 dark:bg-success-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {integration.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {integration.description}
                    </p>
                    
                    {isConnected ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-success-600 dark:text-success-400">
                          <CheckIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">Подключено</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Подключено: {connectedIntegration?.connectedAt ? new Date(connectedIntegration.connectedAt).toLocaleDateString() : 'Недавно'}
                        </p>
                        <button
                          onClick={() => handleDisconnect(integration.id)}
                          className="btn-outline text-sm px-3 py-1 whitespace-nowrap"
                        >
                          Отключить
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConnect(integration.id)}
                        disabled={isConnecting === integration.id}
                        className="btn-primary text-sm px-3 py-1 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isConnecting === integration.id ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Подключение...</span>
                          </div>
                        ) : (
                          <>
                            <PlusIcon className="w-3 h-3 mr-1" />
                            Подключить
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 