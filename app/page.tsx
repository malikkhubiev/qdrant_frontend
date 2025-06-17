import { Suspense } from 'react';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
// import { VideoDemo } from '@/components/video-demo';
import { TestCallModal } from '@/components/test-call-modal';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Посмотрите, как работает наш робот
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Демонстрация возможностей AI-продажника в реальном времени
              </p>
            </div>
            
            <Suspense fallback={
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            }>
              {/* <VideoDemo /> */}
            </Suspense>
          </div>
        </section>
      </main>
      
      <Footer />
      <TestCallModal />
    </div>
  );
} 