'use client';

import { AdminGuard } from '@/components/admin/admin-guard';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="space-y-8">
        <DashboardHeader
          title="Admin Dashboard"
          subtitle="Manage your platform and monitor key metrics"
        />
        <DashboardStats />
      </div>
    </AdminGuard>
  );
}