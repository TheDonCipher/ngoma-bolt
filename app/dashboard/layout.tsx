'use client';

import React, { useState } from 'react';
import { DashboardNav } from '@/components/layout/dashboard-nav';
import { DashboardMobileNav } from '../../components/layout/dashboard-mobile-nav';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Header - Always visible */}
      <header className="fixed top-0 right-0 left-0 h-16 border-b bg-white dark:bg-gray-800 flex items-center shadow-sm z-20 md:pl-64">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-4 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <DashboardTopbar userName="Artist Name" />
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64 fixed left-0 top-0 bottom-0 z-40
        border-r border-gray-200 dark:border-gray-800 
        bg-white dark:bg-gray-900 shadow-sm
        transition-transform duration-200 ease-in-out`}
      >
        {/* Logo area */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <Link
            href="/"
            className="font-bold text-xl text-amber-600 dark:text-amber-400"
          >
            Artist Dashboard
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nav content */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
          <DashboardNav />
        </div>
      </aside>

      {/* Main content area - Added padding top and left */}
      <main className="pt-16 md:pl-64 min-h-screen">
        <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-900">
          {children}
        </div>
      </main>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        /* Custom Scrollbar for Dashboard Navigation */
        .dashboard-nav::-webkit-scrollbar {
          width: 6px;
        }

        .dashboard-nav::-webkit-scrollbar-track {
          background-color: transparent;
        }

        .dashboard-nav::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 9999px;
        }

        .dashboard-nav::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.5);
        }

        /* For Firefox */
        .dashboard-nav {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
        }

        /* Dark mode adjustments */
        .dark .dashboard-nav::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.2);
        }

        .dark .dashboard-nav::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.4);
        }

        .dark .dashboard-nav {
          scrollbar-color: rgba(156, 163, 175, 0.2) transparent;
        }
      `}</style>
    </div>
  );
}
