'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show the main nav in dashboard routes
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  const routes = [
    {
      href: '/',
      label: 'Home',
      active: pathname === '/',
    },
    {
      href: '/marketplace',
      label: 'Marketplace',
      active: pathname === '/marketplace',
    },
    {
      href: '/artists',
      label: 'Artists',
      active: pathname === '/artists',
    },
    {
      href: '/about',
      label: 'About',
      active: pathname === '/about',
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              Ngoma
            </span>
          </Link>

          <nav className="ml-10 space-x-4 hidden md:block">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  route.active
                    ? 'text-black dark:text-white'
                    : 'text-muted-foreground'
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Full Dashboard menu - desktop only */}
          <div className="hidden md:block">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Artist Dashboard only - mobile only */}
          <Link href="/dashboard/artist" className="md:hidden">
            <Button variant="outline" size="sm">
              Artist Dashboard
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col space-y-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'px-2 py-1 text-sm font-medium transition-colors hover:text-primary',
                  route.active
                    ? 'bg-gray-100 dark:bg-gray-800 rounded text-black dark:text-white'
                    : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}

            {/* No additional dashboard links in mobile menu */}
          </nav>
        </div>
      )}
    </header>
  );
}
