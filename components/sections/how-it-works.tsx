'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Wallet, Music, Award, Zap } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description:
      'Link your digital wallet to start collecting and trading music NFTs',
  },
  {
    icon: Music,
    title: 'Discover Artists',
    description:
      'Explore authentic African music and connect with talented artists',
  },
  {
    icon: Award,
    title: 'Collect NFTs',
    description:
      'Own exclusive music NFTs and support your favorite artists directly',
  },
  {
    icon: Zap,
    title: 'Earn Rewards',
    description:
      'Get badges and rewards for supporting the African music ecosystem',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Enhanced background with circular pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5" />
      <motion.div
        className="absolute inset-0 pattern-yoruba pattern-parallax"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 240,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent" />

      <div className="container px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400">
            Your Journey with Ngoma
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            Experience African music in the Web3 space through these simple
            steps
          </p>
        </motion.div>

        {/* Journey path line */}
        <div className="relative max-w-4xl mx-auto mb-12 hidden md:block">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 transform -translate-y-1/2" />
          <motion.div
            className="absolute top-1/2 left-0 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-purple-400 transform -translate-y-1/2 shadow-[0_0_15px_rgba(217,70,219,0.5)]"
            animate={{
              x: ['0%', '100%'],
              scale: [1, 1.1, 1],
            }}
            transition={{
              x: {
                duration: 8,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
              },
              scale: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div
                className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(217,70,219,0.5)] z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {index + 1}
              </motion.div>

              <Card className="p-6 border-white/20 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-amber-400/20 to-purple-400/20 group-hover:from-amber-400/30 group-hover:to-purple-400/30 transition-colors">
                    <step.icon className="w-6 h-6 text-amber-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/80 group-hover:text-white/90 transition-colors">
                    {step.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
