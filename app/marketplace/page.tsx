'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/layout/footer';
import {
  MarketplaceHeader,
  FilterBar,
  ProductGrid,
  FeaturedSection,
  EventsSection,
  CategoryTabs,
} from '@/components/marketplace';

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'albums', name: 'Album NFTs' },
    { id: 'tracks', name: 'Track NFTs' },
    { id: 'merch', name: 'Merchandise' },
    { id: 'tickets', name: 'Event Tickets' },
  ];

  return (
    <>
      <main className="min-h-screen overflow-hidden bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5 relative">
        {/* Animated background patterns */}
        <motion.div
          className="absolute inset-0 pattern-kente pattern-parallax pointer-events-none opacity-10"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.1, 0.08, 0.1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute inset-0 pattern-adinkra pattern-parallax pointer-events-none opacity-10"
          animate={{
            scale: [1, 1.01, 1],
            opacity: [0.1, 0.07, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 20, ease: 'easeInOut', repeat: Infinity },
            opacity: { duration: 20, ease: 'easeInOut', repeat: Infinity },
            rotate: { duration: 240, ease: 'linear', repeat: Infinity },
          }}
        />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />

        <motion.div
          className="relative z-10 container mx-auto px-4 py-12 space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Marketplace Header */}
          <motion.div className="section-wrapper font-afro-decorative relative overflow-hidden rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)]">
            <MarketplaceHeader />
          </motion.div>

          {/* Featured Items */}
          <div className="section-wrapper font-afro-decorative relative p-6 rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)]">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <FeaturedSection />
            </motion.div>
          </div>

          {/* Events Section */}
          <div className="section-wrapper font-afro-decorative relative p-6 rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)]">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <EventsSection />
            </motion.div>
          </div>

          {/* Marketplace Filter and Products */}
          <div className="section-wrapper font-afro-decorative relative p-6 rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)]">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-center mb-8">
                Marketplace
              </h2>

              {/* Category Tabs */}
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />

              {/* Filter Bar */}
              <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              {/* Product Grid */}
              <ProductGrid category={activeCategory} searchTerm={searchTerm} />
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
