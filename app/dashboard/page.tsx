import { DashboardLayout } from '@/components/dashboard-layout';
import { KnowledgeBaseTab } from '@/components/knowledge-base-tab';
import { IntegrationsTab } from '@/components/integrations-tab';
import { SettingsTab } from '@/components/settings-tab';
import { BalanceTab } from '@/components/balance-tab';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Личный кабинет
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Управляйте настройками робота-продажника
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <KnowledgeBaseTab />
          <IntegrationsTab />
          <SettingsTab />
          <BalanceTab />
        </div>
      </div>
    </DashboardLayout>
  );
} 