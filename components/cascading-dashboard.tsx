'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KnowledgeBaseTab } from '@/components/knowledge-base-tab';
import { IntegrationsTab } from '@/components/integrations-tab';
import { SettingsTab } from '@/components/settings-tab';
import { BalanceTab } from '@/components/balance-tab';
import { 
  BookOpenIcon,
  CogIcon,
  ChartBarIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface CascadingDashboardProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const steps = [
  {
    id: 'knowledge',
    name: 'База знаний',
    description: 'Настройте базу знаний для робота',
    icon: BookOpenIcon,
    component: KnowledgeBaseTab,
    required: true
  },
  {
    id: 'integrations',
    name: 'Интеграции',
    description: 'Подключите внешние сервисы',
    icon: CogIcon,
    component: IntegrationsTab,
    required: true
  },
  {
    id: 'settings',
    name: 'Настройки',
    description: 'Настройте параметры робота',
    icon: ChartBarIcon,
    component: SettingsTab,
    required: true
  },
  {
    id: 'balance',
    name: 'Баланс',
    description: 'Управляйте балансом и платежами',
    icon: CreditCardIcon,
    component: BalanceTab,
    required: false
  }
];

export function CascadingDashboard({ activeTab, onTabChange }: CascadingDashboardProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const canAccessStep = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    if (stepIndex === 0) return true;
    
    // Проверяем, что все предыдущие обязательные шаги завершены
    for (let i = 0; i < stepIndex; i++) {
      const step = steps[i];
      if (step.required && !completedSteps.includes(step.id)) {
        return false;
      }
    }
    return true;
  };

  const getStepStatus = (stepId: string) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (activeTab === stepId) return 'active';
    if (canAccessStep(stepId)) return 'available';
    return 'locked';
  };

  const ActiveComponent = steps.find(s => s.id === activeTab)?.component;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Личный кабинет
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Настройте робота-продажника пошагово
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Прогресс настройки
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {completedSteps.length} из {steps.filter(s => s.required).length} обязательных шагов
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isClickable = status === 'available' || status === 'active' || status === 'completed';
            
            return (
              <motion.div
                key={step.id}
                whileHover={isClickable ? { scale: 1.02 } : {}}
                whileTap={isClickable ? { scale: 0.98 } : {}}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  status === 'completed'
                    ? 'border-success-500 bg-success-50 dark:bg-success-900/20'
                    : status === 'active'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : status === 'available'
                    ? 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => isClickable && onTabChange(step.id)}
              >
                {/* Step Number */}
                <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  status === 'completed'
                    ? 'bg-success-500 text-white'
                    : status === 'active'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}>
                  {status === 'completed' ? (
                    <CheckCircleIcon className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <step.icon className={`w-8 h-8 mx-auto mb-2 ${
                    status === 'completed'
                      ? 'text-success-600 dark:text-success-400'
                      : status === 'active'
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  <h3 className={`font-medium text-sm mb-1 ${
                    status === 'completed'
                      ? 'text-success-700 dark:text-success-300'
                      : status === 'active'
                      ? 'text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {step.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>

                {/* Lock Icon for locked steps */}
                {status === 'locked' && (
                  <div className="absolute top-2 right-2">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        >
          {ActiveComponent && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const Icon = steps.find(s => s.id === activeTab)?.icon;
                    return Icon ? <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" /> : null;
                  })()}
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {steps.find(s => s.id === activeTab)?.name}
                  </h2>
                </div>
                {completedSteps.includes(activeTab) && (
                  <div className="flex items-center space-x-2 text-success-600 dark:text-success-400">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Завершено</span>
                  </div>
                )}
              </div>
              
              <ActiveComponent onComplete={() => handleStepComplete(activeTab)} />
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    const currentIndex = steps.findIndex(s => s.id === activeTab);
                    if (currentIndex > 0) {
                      onTabChange(steps[currentIndex - 1].id);
                    }
                  }}
                  disabled={steps.findIndex(s => s.id === activeTab) === 0}
                  className="btn-outline flex items-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRightIcon className="w-4 h-4 mr-2 rotate-180" />
                  Назад
                </button>
                
                <button
                  onClick={() => {
                    const currentIndex = steps.findIndex(s => s.id === activeTab);
                    if (currentIndex < steps.length - 1) {
                      onTabChange(steps[currentIndex + 1].id);
                    }
                  }}
                  disabled={!canAccessStep(steps[steps.findIndex(s => s.id === activeTab) + 1]?.id)}
                  className="btn-primary flex items-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Далее
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 