'use client';

import { usePathname } from 'next/navigation';
import { MainNav } from '@/components/layout/main-nav';

export function MainNavWrapper() {
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith('/dashboard');

  // Don't render MainNav on dashboard pages
  if (isDashboardPage) return null;

  return <MainNav />;
}
