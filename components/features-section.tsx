'use client';

import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  CircleStackIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';



const features = [
  {
    icon: PhoneIcon,
    title: 'Обрабатывает 1000+ звонков в день',
    description: 'Наш AI-робот может одновременно вести множество разговоров, обрабатывая до 1000+ звонков ежедневно без перерывов и выходных.',
    color: 'primary',
  },
  {
    icon: CircleStackIcon,
    title: 'Экономит до 300 000₽ на зарплатах менеджеров',
    description: 'Один робот заменяет команду из 5-10 менеджеров, экономя значительные средства на зарплатах, налогах и социальных выплатах.',
    color: 'success',
  },
  {
    icon: ChartBarIcon,
    title: 'Поднимает конверсию на 40%',
    description: 'Благодаря постоянной доступности и оптимизированным скриптам продаж, наш робот увеличивает конверсию в среднем на 40%.',
    color: 'warning',
  },
];

const colorClasses = {
  primary: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
  success: 'bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-400',
  warning: 'bg-warning-100 dark:bg-warning-900 text-warning-600 dark:text-warning-400',
};

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Почему выбирают наш робот-продажник?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Три ключевых преимущества, которые делают наш сервис незаменимым для вашего бизнеса
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className={`w-16 h-16 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      feature.color === 'primary' ? 'bg-primary-500' :
                      feature.color === 'success' ? 'bg-success-500' :
                      'bg-warning-500'
                    }`}></div>
                    <span>Доступно 24/7</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              10,000+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Обработанных звонков
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-success-600 dark:text-success-400 mb-2">
              95%
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Удовлетворенность клиентов
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-warning-600 dark:text-warning-400 mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Время работы
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              1₽
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              За минуту разговора
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 