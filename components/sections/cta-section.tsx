'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ConnectWalletButton } from '@/components/web3/connect-wallet-button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern-kente pattern-parallax pointer-events-none rounded-[2rem]" />
      <div className="container px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-8"
          >
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-amber-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(217,70,219,0.6)] animate-pulse-slow">
              <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center">
                <span className="text-5xl">🎵</span>
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Join the Revolution in African Music
          </motion.h2>

          <motion.p
            className="text-xl text-white/90 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Whether you're an artist looking to take control of your creations
            or a fan eager to support authentic African music, Ngoma provides a
            revolutionary platform where creativity meets ownership in the Web3
            space.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <ConnectWalletButton className="w-full sm:w-auto text-base px-8 py-6 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300" />
            <Link href="/marketplace">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-8 py-6 group border-white/10 hover:bg-white/10 rounded-full"
              >
                Explore Marketplace
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
