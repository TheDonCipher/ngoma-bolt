'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Music, Users, Award, ShoppingBag, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Music,
    title: 'Digital Music Ownership',
    description:
      'Own authentic African music as unique digital assets, directly supporting artists',
  },
  {
    icon: Users,
    title: 'Community Connection',
    description:
      'Join a vibrant ecosystem of African artists, fans, and music enthusiasts',
  },
  {
    icon: Award,
    title: 'Rewards & Recognition',
    description:
      'Earn exclusive badges and rewards as you support and collect African music',
  },
  {
    icon: ShoppingBag,
    title: 'African Music Marketplace',
    description:
      'Discover and collect unique African music NFTs in our curated marketplace',
  },
  {
    icon: Zap,
    title: 'Fair Artist Revenue',
    description:
      'Smart contracts ensure transparent and immediate payments to African artists',
  },
  {
    icon: Shield,
    title: 'Secure Ownership',
    description:
      'Blockchain technology guarantees authentic and protected music ownership',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute inset-0 pattern-adinkra pattern-parallax pointer-events-none" />
      <div className="absolute inset-0 pattern-bogolan pattern-parallax pointer-events-none rounded-[2rem]" />
      <div className="container px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400">
            Revolutionizing African Music
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-medium">
            Experience the future of music ownership and distribution through
            our innovative Web3 platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="transform transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 border-white/20 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-block p-3 rounded-lg bg-gradient-to-br from-amber-400/20 to-purple-400/20 group-hover:from-amber-400/30 group-hover:to-purple-400/30 transition-colors">
                      <Icon className="w-6 h-6 text-amber-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 group-hover:text-white/90 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
