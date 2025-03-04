import { MainNav } from '@/components/layout/main-nav';
'use client';

import { DashboardNav } from '@/components/layout/dashboard-nav';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <div> {/* New root div to contain MainNav */}
      <MainNav /> {/* Moved MainNav here */}
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full"> {/* Dashboard flex container */}
        {/* Left sidebar - fixed styles through className instead of inline style */}
        <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 relative z-10 block">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <DashboardNav />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
