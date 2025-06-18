'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/lib/validations';
import { apiClient } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import InputMask from 'react-input-mask';
import { 
  PhoneIcon, 
  KeyIcon, 
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';

type Step = 1 | 2 | 3 | 4;

export function RegisterForm() {
  const [step, setStep] = useState<Step>(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // 1. Отправка SMS
  const handleSendSms = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!/^7\d{10}$/.test(phone)) {
      setError("Введите номер в формате 7XXXXXXXXXX");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/register/request_code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) throw new Error("Ошибка отправки SMS");
      setSuccess(true);
      setStep(2);
    } catch (err) {
      setError("Ошибка отправки SMS");
    }
    setLoading(false);
  };

  // 2. Проверка кода
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!/^\d{4}$/.test(code)) {
      setError("Введите 4-значный код");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/register/verify_code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      if (!res.ok) throw new Error("Ошибка подтверждения кода");
      setSuccess(true);
      setStep(3);
    } catch (err) {
      setError("Неверный код или ошибка сервера");
    }
    setLoading(false);
  };

  // 3. Регистрация с паролем
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code, password }),
      });
      if (!res.ok) throw new Error("Ошибка регистрации");
      setSuccess(true);
      setStep(4);
    } catch (err) {
      setError("Ошибка регистрации");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
      {step === 1 && (
        <form onSubmit={handleSendSms} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Телефон</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="7XXXXXXXXXX"
              className="input-field w-full"
              autoComplete="tel"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? "Отправка..." : "Отправить SMS"}
          </button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Код из SMS</label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="0000"
              className="input-field w-full text-center text-xl tracking-widest"
              maxLength={4}
              autoFocus
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? "Проверка..." : "Подтвердить код"}
          </button>
          <button type="button" className="w-full btn-secondary mt-2" onClick={() => setStep(1)}>
            Назад
          </button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Минимум 6 символов"
              className="input-field w-full"
              autoFocus
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? "Создание..." : "Завершить регистрацию"}
          </button>
          <button type="button" className="w-full btn-secondary mt-2" onClick={() => setStep(2)}>
            Назад
          </button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </form>
      )}
      {step === 4 && (
        <div className="text-center py-8">
          <div className="text-green-600 text-xl font-semibold mb-4">Регистрация завершена!</div>
          <div className="text-gray-600">Теперь вы можете войти в свой аккаунт.</div>
        </div>
      )}
    </div>
  );
} 