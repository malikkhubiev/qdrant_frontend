import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const processKnowledgeSchema = z.object({
  text: z.string().min(10, 'Текст должен содержать минимум 10 символов'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = processKnowledgeSchema.parse(body);

    // Здесь должна быть интеграция с AI для обработки текста
    // Например, OpenAI GPT, Claude или другой LLM
    
    // Имитация обработки текста
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Парсинг текста на вопросы и ответы
    const knowledgeItems = parseTextToKnowledge(text);

    return NextResponse.json({
      success: true,
      message: 'База знаний обработана успешно',
      data: knowledgeItems
    });

  } catch (error) {
    console.error('Process knowledge error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Неверные данные',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    }, { status: 500 });
  }
}

function parseTextToKnowledge(text: string) {
  // Простой парсер для демонстрации
  // В реальном проекте здесь должна быть интеграция с AI
  
  const lines = text.split('\n').filter(line => line.trim());
  const knowledgeItems = [];
  
  for (let i = 0; i < lines.length; i += 2) {
    if (i + 1 < lines.length) {
      knowledgeItems.push({
        id: `item_${i}`,
        question: lines[i].trim(),
        answer: lines[i + 1].trim(),
        category: 'general',
        isActive: true
      });
    }
  }
  
  // Если не удалось парсить, создаем один элемент
  if (knowledgeItems.length === 0) {
    knowledgeItems.push({
      id: 'item_1',
      question: 'Общий вопрос',
      answer: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
      category: 'general',
      isActive: true
    });
  }
  
  return knowledgeItems;
} 