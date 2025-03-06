'use client';

import { AdminGuard } from '@/components/admin/admin-guard';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';

export default function AdminDashboard() {
  const mockArtist = {
    id: 'admin-dashboard',
    name: 'Platform Admin',
    image: '/images/placeholder-admin.png',
    genre: 'Administration',
    totalTracks: 0,
    floorPrice: 0,
    previewTrack: '/tracks/admin-preview.mp3', // Changed from object to string
  };

  return (
    <AdminGuard>
      <div className="space-y-8">
        <DashboardHeader
          title="Admin Dashboard"
          subtitle="Manage your platform and monitor key metrics"
        />
        <DashboardStats artist={mockArtist} />
      </div>
    </AdminGuard>
  );
}
