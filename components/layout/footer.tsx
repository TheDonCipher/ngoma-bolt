'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  ArrowRight,
  Music2,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      heading: 'Platform',
      links: [
        { title: 'About Us', href: '/about' },
        { title: 'Features', href: '/#features' },
        { title: 'How It Works', href: '/#how-it-works' },
        { title: 'Community', href: '/#community' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { title: 'Artist Guide', href: '/resources/artist-guide' },
        { title: 'Collector Guide', href: '/resources/collector-guide' },
        { title: 'FAQs', href: '/faq' },
        { title: 'Support', href: '/support' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Use', href: '/terms' },
        { title: 'Copyright', href: '/copyright' },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 border-t border-white/10 pt-12 pb-6">
      {/* Background patterns */}
      <motion.div
        className="absolute inset-0 pattern-kente pattern-parallax opacity-5 pointer-events-none"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-purple-500 flex items-center justify-center">
                <Music2 className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-500">
                Ngoma
              </h2>
            </div>

            <p className="text-muted-foreground mb-6 max-w-sm">
              Revolutionizing African music through Web3 technology, connecting
              artists and fans across the globe.
            </p>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={16} className="text-white/70" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={16} className="text-white/70" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram size={16} className="text-white/70" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube size={16} className="text-white/70" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerLinks.map((column) => (
            <div key={column.heading}>
              <h3 className="font-semibold text-white mb-4">
                {column.heading}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-white hover:underline underline-offset-4 text-sm transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-3">
              Subscribe to our newsletter for the latest updates
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="border-white/10 bg-white/5 focus-visible:ring-purple-500"
              />
              <Button
                size="icon"
                className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 shrink-0"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} Ngoma. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-muted-foreground hover:text-white text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-white text-xs transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-white text-xs transition-colors"
            >
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Gradient effect at the top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-transparent pointer-events-none" />
    </footer>
  );
}
