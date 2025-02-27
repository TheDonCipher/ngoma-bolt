'use client';

import { Button } from '@/components/ui/button';
import { ConnectWalletButton } from '@/components/web3/connect-wallet-button';
import { ArrowRight, Music2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Poppins, Inter } from 'next/font/google';

const headingFont = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-space-grotesk',
});

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-satoshi',
});

export function HeroSection() {
  return (
    <motion.section
      className={`relative flex items-center justify-center overflow-hidden ${headingFont.variable} ${bodyFont.variable}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container relative z-10 px-4 py-16 sm:py-24 lg:py-32 text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <Music2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-medium text-white/90">
              Discover African Music in Web3
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight font-space-grotesk tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Where African Music Meets
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-purple-400 block mt-1 sm:mt-2 font-extrabold">
            <TypeAnimation
              sequence={[
                'Digital Innovation',
                2000,
                'Creative Freedom',
                2000,
                'Global Recognition',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto mb-8 text-lg text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Experience the future of African music in the digital age. Ngoma
          revolutionizes how artists create, own, and share their music,
          bringing authentic African sounds to the global stage through
          innovative blockchain technology.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ConnectWalletButton className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-primary-foreground" />
          <Link href="#features">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto group hover:bg-white/10"
            >
              Explore Features
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
