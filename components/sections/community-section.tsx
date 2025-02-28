'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Koka Koka Koka Cholo',
    role: 'Artist',
    avatar:
      'https://api.dicebear.com/9.x/avataaars/svg?seed=Wyatt&style=default,circle',
    quote:
      'Ngoma has transformed how I share my music with the world. The direct connection with fans through NFTs is revolutionary.',
  },
  {
    name: 'Thuso Mokoena',
    role: 'Collector',
    avatar:
      'https://api.dicebear.com/9.x/avataaars/svg?seed=Maria&style=default,circle',
    quote:
      'Being able to directly support African artists while owning unique digital assets is an incredible experience.',
  },
  {
    name: 'Unathi Mzamo',
    role: 'Producer',
    avatar:
      'https://api.dicebear.com/9.x/avataaars/svg?seed=Jack&style=default,circle',
    quote:
      "The platform's focus on fair compensation and transparent royalties is exactly what the industry needs.",
  },
];

export function CommunitySection() {
  return (
    <>
      <motion.div
        className="text-center mb-10 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-amber-400">
          Join Our Growing Community
        </h2>
        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-medium px-2">
          Connect with artists and collectors who are shaping the future of
          African music
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-2">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 border-white/20 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Quote className="w-8 h-8 text-pink-400 mb-4 opacity-50" />
                <p className="text-white/80 group-hover:text-white/90 transition-colors mb-6 italic">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-white/90">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
