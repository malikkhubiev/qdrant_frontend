'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  PlayIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';
import { useAppStore } from '@/lib/store';

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { setSidebarOpen } = useAppStore();

  const handleTestCall = () => {
    setSidebarOpen(true);
  };

  return (
    <section className="relative pt-24 pb-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              Робот-продажник{' '}
              <span className="text-gradient">24/7</span>
              <br />
              за{' '}
              <span className="text-gradient">1₽/минуту</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0"
            >
              Автоматизируйте ваши продажи с помощью AI-робота, который работает круглосуточно и никогда не устает
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTestCall}
                className="btn-primary flex items-center justify-center"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Бесплатно позвонить нашему роботу
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 flex items-center justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span>Работает 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span>Без выходных</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Робот-продажник активен
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">AI</span>
                    </div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Здравствуйте! Меня зовут Алексей, я менеджер по продажам. Чем могу помочь?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="flex-1 bg-primary-100 dark:bg-primary-900 rounded-lg p-3 text-right">
                      <p className="text-sm text-primary-700 dark:text-primary-300">
                        Интересует ваше предложение
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-300 font-bold text-sm">👤</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">AI</span>
                    </div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Отлично! Расскажу подробнее о наших условиях...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 