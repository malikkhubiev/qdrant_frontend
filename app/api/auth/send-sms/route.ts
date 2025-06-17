import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const sendSmsSchema = z.object({
  phone: z.string().min(1, 'Введите номер телефона'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = sendSmsSchema.parse(body);

    // Здесь должна быть интеграция с SMS-сервисом
    // Например, Twilio, SMS.ru или другой провайдер
    
    // Генерация кода подтверждения
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Имитация отправки SMS
    await new Promise(resolve => setTimeout(resolve, 1000));

    // В реальном проекте код должен сохраняться в базе данных
    // с временем жизни и привязкой к номеру телефона
    console.log(`SMS code for ${phone}: ${code}`);

    return NextResponse.json({
      success: true,
      message: 'SMS отправлен успешно',
      data: {
        phone,
        expiresIn: '5 минут'
      }
    });

  } catch (error) {
    console.error('Send SMS error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Неверные данные',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Ошибка отправки SMS'
    }, { status: 500 });
  }
} 