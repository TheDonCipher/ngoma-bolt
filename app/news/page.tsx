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
import { useMediaQuery } from '@/hooks/use-media-query';

export default function NewsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const isMobile = useMediaQuery('(max-width: 640px)');

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
            // Reduce animation complexity on mobile
            ...(isMobile && { duration: 45 }),
          }}
        />

        <div className="relative z-10">
          {/* Hero Section with Featured News */}
          <NewsHero />

          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-12">
            {/* Category Filter - Enhanced mobile styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-3 sm:p-6 shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
                <div className="min-w-max">
                  <NewsFilter
                    selected={selectedFilter}
                    onFilterChange={setSelectedFilter}
                  />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Main News Feed */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <NewsFeed filter={selectedFilter} />
              </motion.div>

              {/* Sidebar Content - Enhanced mobile styling */}
              <motion.div
                className="space-y-6 sm:space-y-8 md:sticky md:top-24 md:self-start"
                initial={{
                  opacity: 0,
                  x: isMobile ? 0 : 20,
                  y: isMobile ? 20 : 0,
                }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-1 sm:gap-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-md">
                    <TrendingArtists />
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-md">
                    <UpcomingEvents />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-50 rounded-xl border border-gray-200 p-4 sm:p-6 shadow-md">
                  <NewsletterSignup />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
