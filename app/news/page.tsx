'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { NewsFeed } from '@/components/news/news-feed';
import { TrendingArtists } from '@/components/news/trending-artists';
import { UpcomingEvents } from '@/components/news/upcoming-events';
import { NewsFilter } from '@/components/news/news-filter';
import { NewsletterSignup } from '@/components/news/newsletter-signup';
import { NewsHero } from '@/components/news/news-hero';
import { Footer } from '@/components/layout/footer';

export default function NewsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  return (
    <>
      <main className="min-h-screen pb-12 bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5 relative">
        {/* Background patterns - reduced opacity for better content visibility */}
        <motion.div
          className="absolute inset-0 pattern-kente pattern-parallax pointer-events-none opacity-5"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.05, 0.03, 0.05],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <div className="relative z-10">
          {/* Hero Section with Featured News */}
          <NewsHero />

          <div className="container px-6 py-12 space-y-12">
            {/* Category Filter - Updated container styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg"
            >
              <NewsFilter
                selected={selectedFilter}
                onFilterChange={setSelectedFilter}
              />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main News Feed */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <NewsFeed filter={selectedFilter} />
              </motion.div>

              {/* Sidebar Content */}
              <motion.div
                className="space-y-8 lg:sticky lg:top-24 lg:self-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <TrendingArtists />
                <UpcomingEvents />
                <NewsletterSignup />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
