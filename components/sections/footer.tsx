'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Github,
  Music,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden z-10">
      {/* African patterns in the background */}
      <div className="absolute inset-0 pattern-kente opacity-[0.07] pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-40 h-40 pattern-yoruba opacity-10 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 pattern-adinkra opacity-10 rounded-full"></div>

      {/* Top pattern border */}
      <div className="w-full h-2 bg-gradient-to-r from-amber-500/50 via-transparent to-purple-500/50"></div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center">
                <Music className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-400">
                Ngoma
              </span>
            </div>
            <p className="text-white/60 max-w-xs">
              Revolutionizing African music distribution through blockchain
              technology, ensuring fair compensation for artists and authentic
              experiences for fans.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-amber-400 hover:border-amber-400/50 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 relative inline-block">
              Quick Links
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
            </h4>
            <ul className="space-y-2">
              {[
                'About Us',
                'Our Mission',
                'How It Works',
                'Artist Portal',
                'Fan Community',
                'Blog',
                'Contact Us',
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-amber-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 relative inline-block">
              Legal
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
            </h4>
            <ul className="space-y-2">
              {[
                'Terms of Service',
                'Privacy Policy',
                'Copyright Info',
                'Artist Agreement',
                'Royalty Distribution',
                'NFT Licensing',
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 relative inline-block">
              Stay Updated
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-purple-400"></div>
            </h4>
            <p className="text-white/60 mb-4">
              Subscribe to our newsletter for the latest updates on African
              music and NFT drops.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50"
                />
                <div className="absolute right-2 top-2 w-6 h-6 rounded-full pattern-adinkra opacity-30"></div>
              </div>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            © {currentYear} Ngoma. All rights reserved. Powered by blockchain
            technology.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex space-x-6">
              {['English', 'Français', 'Español', 'Swahili', 'العربية'].map(
                (lang, i) => (
                  <button
                    key={i}
                    className="text-sm text-white/40 hover:text-amber-400 transition-colors"
                  >
                    {lang}
                  </button>
                )
              )}
            </div>
            <motion.a
              href="https://github.com/ngoma-bolt"
              className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Github size={16} /> GitHub
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom pattern border */}
      <div className="w-full h-2 bg-gradient-to-r from-purple-500/50 via-transparent to-amber-500/50"></div>
    </footer>
  );
}
