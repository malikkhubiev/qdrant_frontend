'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon, 
  DocumentTextIcon,
  CheckIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { processKnowledgeSchema, ProcessKnowledgeFormData } from '@/lib/validations';
import { apiClient } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useAppStore } from '@/lib/store';

export function KnowledgeBaseTab() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { knowledgeBase, setKnowledgeBase } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProcessKnowledgeFormData>({
    resolver: zodResolver(processKnowledgeSchema),
  });

  const onSubmit = async (data: ProcessKnowledgeFormData) => {
    setIsProcessing(true);
    try {
      const response = await apiClient.processKnowledge(data);
      if (response.data) {
        setKnowledgeBase(response.data);
        toast.success('База знаний обработана успешно!');
        reset();
      }
    } catch (error) {
      toast.error('Ошибка при обработке базы знаний');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUploadToSystem = async () => {
    try {
      await apiClient.updateKnowledgeBase(knowledgeBase);
      toast.success('База знаний загружена в систему!');
    } catch (error) {
      toast.error('Ошибка при загрузке в систему');
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
          <BookOpenIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            База знаний
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Загрузите информацию о вашем продукте
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Текст для обработки
          </label>
          <textarea
            {...register('text')}
            rows={6}
            className="input-field resize-none"
            placeholder="Вставьте текст с информацией о вашем продукте, услугах, ценах и т.д. AI автоматически создаст базу знаний для робота."
          />
          {errors.text && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">
              {errors.text.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Обрабатываем...</span>
            </div>
          ) : (
            <>
              <DocumentTextIcon className="w-4 h-4 mr-2" />
              Преобразовать
            </>
          )}
        </button>
      </form>

      {knowledgeBase.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Результаты обработки ({knowledgeBase.length})
            </h4>
            <button
              onClick={handleUploadToSystem}
              className="btn-outline text-sm px-3 py-1"
            >
              Загрузить в систему
            </button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {knowledgeBase.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon className="w-3 h-3 text-success-600 dark:text-success-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {item.question}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 