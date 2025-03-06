'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Music2,
  Calendar,
  ShoppingBag,
  Users,
  Settings,
  LineChart,
  MessageSquare,
  HelpCircle,
  LogOut,
  BarChart3,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
  children?: NavItem[];
}

export function DashboardNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: 'Overview',
      href: '/dashboard/artist',
      icon: <LayoutDashboard className="mr-3 h-5 w-5" />,
      isActive: pathname === '/dashboard/artist',
    },
    {
      title: 'Music',
      href: '/dashboard/artist/music',
      icon: <Music2 className="mr-3 h-5 w-5" />,
      isActive: pathname.startsWith('/dashboard/artist/music'),
    },
    {
      title: 'Events',
      href: '/dashboard/artist/events',
      icon: <Calendar className="mr-3 h-5 w-5" />,
      isActive: pathname.startsWith('/dashboard/artist/events'),
    },
    {
      title: 'Merchandise',
      href: '/dashboard/artist/merchandise',
      icon: <ShoppingBag className="mr-3 h-5 w-5" />,
      isActive: pathname.startsWith('/dashboard/artist/merchandise'),
    },
    {
      title: 'Analytics',
      href: '/dashboard/artist/analytics/overview',
      icon: <LineChart className="mr-3 h-5 w-5" />,
      isActive: pathname.startsWith('/dashboard/artist/analytics'),
      children: [
        {
          title: 'Overview',
          href: '/dashboard/artist/analytics/overview',
          isActive: pathname === '/dashboard/artist/analytics/overview',
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          title: 'Audience',
          href: '/dashboard/artist/analytics/audience',
          isActive: pathname === '/dashboard/artist/analytics/audience',
          icon: <Users className="w-5 h-5" />,
        },
        {
          title: 'Revenue',
          href: '/dashboard/artist/analytics/revenue',
          isActive: pathname === '/dashboard/artist/analytics/revenue',
          icon: <DollarSign className="w-5 h-5" />,
        },
      ],
    },
    {
      title: 'Fans',
      href: '/dashboard/artist/fans',
      icon: <Users className="mr-3 h-5 w-5" />,
      isActive: pathname.startsWith('/dashboard/artist/fans'),
    },
    {
      title: 'Messages',
      href: '/dashboard/artist/messages',
      icon: <MessageSquare className="mr-3 h-5 w-5" />,
      isActive: pathname.startsWith('/dashboard/artist/messages'),
    },
    {
      title: 'Settings',
      href: '/dashboard/artist/settings',
      icon: <Settings className="mr-3 h-5 w-5" />,
      isActive: pathname.startsWith('/dashboard/artist/settings'),
    },
    {
      title: 'Help & Support',
      href: '/dashboard/artist/help',
      icon: <HelpCircle className="mr-3 h-5 w-5" />,
      isActive: pathname.startsWith('/dashboard/artist/help'),
    },
  ];

  return (
    <div className="dashboard-nav scrollbar-custom h-full py-4">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <nav className="px-2">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      item.isActive
                        ? 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-100'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>

                  {/* Sub navigation items */}
                  {item.children && item.isActive && (
                    <ul className="mt-1 pl-8 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link
                            href={child.href}
                            className={cn(
                              'flex items-center rounded-md py-1.5 px-3 text-sm transition-colors',
                              child.isActive
                                ? 'bg-amber-50/50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-200'
                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                            )}
                          >
                            {child.icon}
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="px-4 mt-6 border-t pt-4 dark:border-gray-700">
          <Link
            href="/auth/signout"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}
