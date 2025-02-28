'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  'Direct artist-to-fan connection',
  'Transparent royalty distribution',
  'Authentic African music promotion',
  'NFT-powered ownership system',
  'Borderless revenue opportunities',
  'Community-driven growth',
];

export function ValueProposition() {
  return (
    <section id="solutions" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400">
              Empowering African Artists in the Digital Age
            </h2>

            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">
              Ngoma bridges the gap between African music creators and global
              audiences, using blockchain technology to ensure artists maintain
              control and receive fair compensation for their work.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-white/90">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white w-full sm:w-auto text-base py-2.5"
              size="lg"
            >
              Learn More
              <Play className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative mt-6 sm:mt-0"
          >
            <div className="aspect-video overflow-hidden rounded-xl border-2 border-white/20 shadow-2xl shadow-purple-900/20 relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10" />
              <div className="relative w-full h-full bg-gradient-to-br from-amber-500/20 to-purple-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Button
                      className="rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
                      size="icon"
                      variant="ghost"
                    >
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                    </Button>
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <h3 className="text-sm sm:text-base text-white font-medium">
                    See How Ngoma Works
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70">
                    3:45 | The Future of African Music
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
