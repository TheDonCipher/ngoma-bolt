'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Music, User, Settings, HelpCircle } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();


  // Quick access tiles to show on the dashboard home
  const quickAccess = [
    {
      title: 'Artist Dashboard',
      description: 'Upload music, manage events, and grow your audience',
      icon: <Music className="h-8 w-8 text-indigo-500" />,
      action: () => router.push('/dashboard/artist'),
      color:
        'bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30',
      textColor: 'text-indigo-700 dark:text-indigo-300',
    },
    {
      title: 'Fan Dashboard',
      description: 'Discover music, follow artists, and attend events',
      icon: <User className="h-8 w-8 text-amber-500" />,
      action: () => router.push('/dashboard/fan'),
      color:
        'bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30',
      textColor: 'text-amber-700 dark:text-amber-300',
    },
    {
      title: 'Account Settings',
      description: 'Update your profile and preferences',
      icon: <Settings className="h-8 w-8 text-emerald-500" />,
      action: () => router.push('/dashboard/settings'),
      color:
        'bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30',
      textColor: 'text-emerald-700 dark:text-emerald-300',
    },
    {
      title: 'Help & Support',
      description: 'Get assistance with any questions',
      icon: <HelpCircle className="h-8 w-8 text-purple-500" />,
      action: () => router.push('/dashboard/help'),
      color:
        'bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30',
      textColor: 'text-purple-700 dark:text-purple-300',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back to Ngoma. Here's a quick overview of your options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickAccess.map((item, index) => (
          <div
            key={index}
            onClick={item.action}
            className={`${item.color} p-6 rounded-xl shadow-sm cursor-pointer transition-colors duration-200`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">{item.icon}</div>
              <div>
                <h3 className={`text-lg font-semibold ${item.textColor}`}>
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Personalized recommendations will appear here based on your
            activity.
          </p>
        </div>
      </div>
    </div>
  );
}
