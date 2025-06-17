'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { CascadingDashboard } from '@/components/cascading-dashboard';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('knowledge');

  return (
    <DashboardLayout>
      <CascadingDashboard 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </DashboardLayout>
  );
} 