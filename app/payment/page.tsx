import { PaymentForm } from '@/components/payment-form';
import { Header } from '@/components/header';

interface PaymentPageProps {
  searchParams: { type?: string };
}

export default function PaymentPage({ searchParams }: PaymentPageProps) {
  const serviceType = searchParams.type || 'incoming';
  
  const getTitle = () => {
    return serviceType === 'incoming' 
      ? 'Начать принимать звонки' 
      : 'Начать обзвон';
  };

  const getDescription = () => {
    return serviceType === 'incoming'
      ? 'Подключите робота для обработки входящих звонков'
      : 'Запустите автоматический обзвон клиентов';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="pt-[170px] pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {getTitle()}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {getDescription()}
            </p>
          </div>
          
          <PaymentForm serviceType={serviceType as 'incoming' | 'outgoing'} />
        </div>
      </main>
    </div>
  );
} 