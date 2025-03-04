// If your main-nav is in another layout file like this, adjust the path accordingly

import type { Metadata } from 'next';
import { MainNav } from '@/components/layout/main-nav';
import { usePathname } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Ngoma Bolt',
  description: 'Music Platform for African Artists',
};

// Client component to conditionally render
function MainNavConditional() {
  'use client';

  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith('/dashboard');

  // Don't render the nav on dashboard pages
  if (isDashboardPage) return null;

  return <MainNav />;
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNavConditional />
      <main>{children}</main>
    </>
  );
}
