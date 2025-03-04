'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

const problems = [
  {
    traditional: 'Limited ownership for artists over their creative work',
    solution: 'Full ownership through NFTs and blockchain technology',
  },
  {
    traditional: 'Complex royalty systems with multiple intermediaries',
    solution: 'Direct, transparent payments through smart contracts',
  },
  {
    traditional:
      'Geographical limitations for African artists reaching global audiences',
    solution:
      'Borderless digital platform connecting artists to worldwide fans',
  },
  {
    traditional: 'Fans have limited ways to directly support favorite artists',
    solution:
      'Direct investment in artists through NFT purchases and collections',
  },
];

export function ProblemStatement() {
  return (
    <>
      <motion.div
        className="text-center mb-10 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400">
          Reimagining African Music in the Digital Age
        </h2>
        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-medium px-2">
          The music industry has evolved, but African artists still face unique
          challenges
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-5xl mx-auto px-4">
        {problems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Card className="h-full border-white/10 hover:bg-white/15 transition-all duration-300 overflow-hidden p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                <div className="p-4 sm:p-6 bg-white/5 sm:border-r border-b sm:border-b-0 border-white/10 relative">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 absolute top-4 sm:top-6 right-4 sm:right-6" />
                  <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-white/80">
                    Traditional Model
                  </h3>
                  <p className="text-sm sm:text-base text-white/70">
                    {item.traditional}
                  </p>
                </div>
                <div className="p-4 sm:p-6 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10 relative">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 absolute top-4 sm:top-6 right-4 sm:right-6" />
                  <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-amber-400">
                    Ngoma Solution
                  </h3>
                  <p className="text-sm sm:text-base text-white/80">
                    {item.solution}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
