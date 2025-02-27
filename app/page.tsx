'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { ProblemStatement } from '@/components/sections/problem-statement';
import { ValueProposition } from '@/components/sections/value-proposition';
import { FeaturesSection } from '@/components/sections/features-section';
import { HowItWorks } from '@/components/sections/how-it-works';
import { CommunitySection } from '@/components/sections/community-section';
import { CTASection } from '@/components/sections/cta-section';
import { Footer } from '@/components/layout/footer';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <main className="min-h-screen overflow-hidden bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5 relative">
        {/* Animated background patterns */}
        <motion.div
          className="absolute inset-0 pattern-kente pattern-parallax pointer-events-none"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.2, 0.15, 0.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute inset-0 pattern-adinkra pattern-parallax pointer-events-none"
          animate={{
            scale: [1, 1.01, 1],
            opacity: [0.15, 0.1, 0.15],
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
          className="relative z-10 container mx-auto px-4 py-12 space-y-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <motion.div
            className="section-wrapper font-afro-decorative relative overflow-hidden rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <HeroSection />
          </motion.div>

          {/* Problem Statement Section */}
          <div
            id="problem"
            className="section-wrapper font-afro-decorative relative p-6 rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <ProblemStatement />
            </motion.div>
          </div>

          {/* Value Proposition Section */}
          <div className="section-wrapper font-afro-decorative relative p-6 rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <ValueProposition />
            </motion.div>
          </div>

          {/* Features Section */}
          <div
            id="features"
            className="section-wrapper font-afro-decorative relative p-6 rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <FeaturesSection />
            </motion.div>
          </div>

          {/* How It Works Section */}
          <div
            id="how-it-works"
            className="section-wrapper font-afro-decorative relative p-6 rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <HowItWorks />
            </motion.div>
          </div>

          {/* Community Section */}
          <div
            id="community"
            className="section-wrapper font-afro-decorative relative p-6 rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <CommunitySection />
            </motion.div>
          </div>

          {/* CTA Section */}
          <div
            id="join"
            className="section-wrapper font-afro-decorative relative p-6 rounded-[2rem] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <CTASection />
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
