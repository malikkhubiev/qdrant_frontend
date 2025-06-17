import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const testCallSchema = z.object({
  phone: z.string().min(1, 'Введите номер телефона'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = testCallSchema.parse(body);

    // Здесь должна быть интеграция с сервисом звонков
    // Например, Twilio, Voximplant или другой провайдер
    
    // Имитация обработки запроса
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Логирование запроса
    console.log(`Test call requested for phone: ${phone}`);

    return NextResponse.json({
      success: true,
      message: 'Тестовый звонок запрошен успешно',
      data: {
        phone,
        estimatedTime: '5 минут',
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('Test call error:', error);
    
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