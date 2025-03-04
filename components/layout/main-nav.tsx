'use client';

import React, { useState, useEffect } from 'react'; // Explicitly import React
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectWalletButton } from '@/components/web3/connect-wallet-button';
import { Button } from '@/components/ui/button';
import { Music, Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAddress } from '@thirdweb-dev/react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const routes = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/explore',
    label: 'Explore',
  },
  {
    href: '/news',
    label: 'News',
  },
];

const dashboardRoutes = [
  {
    href: '/dashboard/artist',
    label: 'Artist Dashboard',
    role: 'ARTIST',
  },
  {
    href: '/dashboard/fan',
    label: 'Fan Dashboard',
    role: 'FAN',
  },
  {
    href: '/dashboard/admin',
    label: 'Admin Dashboard',
    role: 'ADMIN',
  },
];

export function MainNav() {
  const pathname = usePathname();
  const address = useAddress();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Don't render the main nav on dashboard pages
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  // Handle scroll effect for transparent to solid background transition
  useEffect(() => {
    console.log('MainNav component mounted');
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    // Close mobile menu when window is resized to larger than mobile
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 sm:h-20 items-center px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 sm:gap-3 mr-4 sm:mr-8 transition-all duration-300 hover:scale-105"
        >
          <Music className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-bold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-purple-500 font-display group-hover:from-amber-400 group-hover:to-pink-400 transition-all duration-300">
            Ngoma
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'relative text-base font-medium transition-all duration-300 hover:text-primary hover:scale-105 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-amber-400 after:to-purple-400 after:transition-all after:duration-300 hover:after:w-full',
                pathname === route.href
                  ? 'text-primary after:w-full'
                  : 'text-muted-foreground'
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Show dashboard routes */}
          {dashboardRoutes.slice(0, 1).map((route) => (
            <Button
              key={route.href}
              variant="outline"
              size="sm"
              className="relative overflow-hidden hover:bg-primary/10 hover:text-primary transition-all duration-300"
              asChild
            >
              <Link href={route.href}>
                <span className="relative z-10">{route.label}</span>
              </Link>
            </Button>
          ))}

          <Link href="/marketplace">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="sm"
                className="relative overflow-hidden group"
              >
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Marketplace</span>
              </Button>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full flex items-center justify-center animate-pulse">
                <span className="sr-only">New feature</span>
              </div>
            </motion.div>
          </Link>

          <ConnectWalletButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex ml-auto">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[350px] border-white/10 bg-gradient-to-b from-background via-background to-background p-0 flex flex-col"
            >
              {/* Mobile menu content remains unchanged */}
              <div className="flex flex-col h-full max-h-screen">
                {/* Fixed header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center">
                      <Music className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-400">
                      Ngoma
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto py-6 px-6">
                  <nav className="flex flex-col space-y-4 mb-8">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center justify-between py-2 px-3 rounded-lg transition-colors',
                          pathname === route.href
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        )}
                      >
                        <span>{route.label}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </nav>

                  <div className="flex flex-col space-y-4 mb-8">
                    <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider px-1">
                      Dashboards
                    </p>
                    {dashboardRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50 hover:bg-muted text-foreground transition-colors"
                      >
                        <span>{route.label}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>

                  {/* Fixed footer with wallet connection */}
                  <div className="mt-6 border-t border-white/10 pt-6">
                    <ConnectWalletButton className="w-full" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
