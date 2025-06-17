export interface User {
  id: string;
  phone: string;
  email?: string;
  balance: number;
  isActive: boolean;
  createdAt: string;
}

export interface KnowledgeItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

export interface Integration {
  id: string;
  type: 'crm' | 'api' | 'webhook';
  name: string;
  config: Record<string, any>;
  isActive: boolean;
}

export interface CallSettings {
  doNotDisturb: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  phoneNumbers: string[];
  maxConcurrentCalls: number;
}

export interface Tariff {
  id: string;
  name: string;
  minutes: number;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type ServiceType = 'incoming' | 'outgoing';

export interface TestCallRequest {
  phone: string;
}

export interface ProcessKnowledgeRequest {
  text: string;
}

export interface ActivateServiceRequest {
  type: ServiceType;
  tariffId: string;
}

export interface RegisterRequest {
  phone: string;
  code: string;
  password: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface SendSmsRequest {
  phone: string;
}

export interface VerifyCodeRequest {
  phone: string;
  code: string;
} 