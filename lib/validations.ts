import { z } from 'zod';

export const phoneSchema = z
  .string()
  .min(1, 'Введите номер телефона')
  .refine((value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 11 && cleaned.startsWith('7');
  }, 'Введите корректный номер телефона');

export const smsCodeSchema = z
  .string()
  .min(4, 'Код должен содержать 4 цифры')
  .max(4, 'Код должен содержать 4 цифры')
  .regex(/^\d{4}$/, 'Код должен содержать только цифры');

export const passwordSchema = z
  .string()
  .min(8, 'Пароль должен содержать минимум 8 символов')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Пароль должен содержать буквы и цифры');

export const registerSchema = z.object({
  phone: phoneSchema,
  code: smsCodeSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(1, 'Введите пароль'),
});

export const testCallSchema = z.object({
  phone: phoneSchema,
});

export const processKnowledgeSchema = z.object({
  text: z.string().min(10, 'Текст должен содержать минимум 10 символов'),
});

export const integrationSchema = z.object({
  apiKey: z.string().min(1, 'Введите API ключ'),
  url: z.string().url('Введите корректный URL'),
});

export const callSettingsSchema = z.object({
  doNotDisturb: z.object({
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string(),
  }),
  phoneNumbers: z.array(z.string()),
  maxConcurrentCalls: z.number().min(1).max(50),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type TestCallFormData = z.infer<typeof testCallSchema>;
export type ProcessKnowledgeFormData = z.infer<typeof processKnowledgeSchema>;
export type IntegrationFormData = z.infer<typeof integrationSchema>;
export type CallSettingsFormData = z.infer<typeof callSettingsSchema>; 