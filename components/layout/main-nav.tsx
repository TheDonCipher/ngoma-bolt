'use client';

import React, { useState, useEffect } from 'react'; // Explicitly import React
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectWalletButton } from '@/components/web3/connect-wallet-button';
import { Button } from '@/components/ui/button';
import { Music, Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAddress } from '@thirdweb-dev/react';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    setIsMounted(true);

    // Close mobile menu when window is resized to larger than mobile
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-amber-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-black/5">
      <div className="container flex h-16 sm:h-20 items-center px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 sm:gap-3 mr-4 sm:mr-8 transition-all duration-300 hover:scale-105"
        >
          <Music className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-bold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 font-display group-hover:from-amber-200 group-hover:to-pink-200 transition-all duration-300">
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
                'relative text-base font-medium transition-all duration-300 hover:text-white hover:scale-105 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-amber-200 after:to-pink-200 after:transition-all after:duration-300 hover:after:w-full',
                pathname === route.href
                  ? 'text-white after:w-full'
                  : 'text-white/70'
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Only show first dashboard route on medium screens */}
          {dashboardRoutes.slice(0, 1).map((route) => (
            <Button
              key={route.href}
              variant="outline"
              className="relative overflow-hidden bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105 hover:border-white/40 before:absolute before:inset-0 before:bg-gradient-to-r before:from-amber-500/20 before:via-purple-500/20 before:to-pink-500/20 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300"
              asChild
            >
              <Link href={route.href}>
                <span className="relative z-10">{route.label}</span>
              </Link>
            </Button>
          ))}

          {/* Show all dashboard routes on large screens */}
          <div className="hidden lg:block">
            {dashboardRoutes.slice(1).map((route) => (
              <Button
                key={route.href}
                variant="outline"
                className="relative overflow-hidden bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-105 hover:border-white/40 before:absolute before:inset-0 before:bg-gradient-to-r before:from-amber-500/20 before:via-purple-500/20 before:to-pink-500/20 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300 ml-2"
                asChild
              >
                <Link href={route.href}>
                  <span className="relative z-10">{route.label}</span>
                </Link>
              </Button>
            ))}
          </div>

          <Link href="/marketplace" className="hidden sm:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                variant="ghost"
                className="relative overflow-hidden group rounded-full bg-white/20 hover:bg-white/30 border border-white/50 px-3 sm:px-5 py-1.5 sm:py-2 text-white"
              >
                <motion.span
                  className="absolute -z-10 inset-0 bg-gradient-to-r from-amber-500 to-pink-600 opacity-0 group-hover:opacity-30 transition-opacity"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <Sparkles className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                <span className="font-semibold text-sm sm:text-base text-white">
                  Marketplace
                </span>
              </Button>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-300 rounded-full flex items-center justify-center animate-pulse">
                <span className="sr-only">New feature</span>
              </div>
            </motion.div>
          </Link>

          <div className="hidden sm:block">
            <ConnectWalletButton />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex ml-auto">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[350px] border-white/10 bg-gradient-to-b from-black via-background to-background p-0 flex flex-col"
            >
              {/* Mobile menu with fixed header, scrollable content, and fixed footer */}
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
                    <X className="h-5 w-5 text-white" />
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
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        )}
                      >
                        <span>{route.label}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </nav>

                  <div className="flex flex-col space-y-4 mb-8">
                    <p className="text-xs uppercase text-white/50 font-semibold tracking-wider px-1">
                      Dashboards
                    </p>
                    {dashboardRoutes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <span>{route.label}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/marketplace"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500/20 to-pink-500/20 text-white mb-8 hover:from-amber-500/30 hover:to-pink-500/30 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span>Marketplace</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-bold uppercase bg-amber-200 text-amber-900 rounded-full px-1.5 py-0.5 mr-2">
                        New
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                  
                  {/* Additional content for demonstration of scrolling */}
                  <div className="space-y-4 mb-8">
                    <h3 className="font-medium text-white">Resources</h3>
                    {['Documentation', 'Tutorials', 'Support', 'FAQ', 'Community'].map((item, i) => (
                      <Link
                        key={i}
                        href="#"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 px-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <span>{item}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Fixed footer with wallet connection */}
                <div className="p-6 border-t border-white/10">
                  <ConnectWalletButton className="w-full" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
