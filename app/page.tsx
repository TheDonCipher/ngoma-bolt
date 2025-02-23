'use client';

import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedArtists } from "@/components/sections/featured-artists";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FeaturesSection } from "@/components/sections/features-section";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5 relative">
      <motion.div 
        className="absolute inset-0 bg-[url('/patterns/kente.svg')] bg-repeat opacity-100 mix-blend-overlay pointer-events-none"
        animate={{ 
          scale: [1, 1.02, 1],
          opacity: [1, 0.95, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('/patterns/circular-african.svg')] bg-no-repeat bg-center bg-cover opacity-100 mix-blend-overlay pointer-events-none"
        animate={{
          scale: [1, 1.01, 1],
          opacity: [1, 0.95, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
      />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background pointer-events-none" />
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-12 space-y-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="section-wrapper relative overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-[2px] border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <HeroSection />
        </motion.div>
        <div className="section-wrapper relative p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeaturesSection />
          </motion.div>
        </div>
        <div className="section-wrapper relative p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeaturedArtists />
          </motion.div>
        </div>
        <div className="section-wrapper relative p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border-0 before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-r before:from-amber-500/40 before:via-purple-500/40 before:to-pink-500/40 before:-z-[1] hover:before:from-amber-500/60 hover:before:via-purple-500/60 hover:before:to-pink-500/60 transition-all duration-1000 shadow-[0_0_35px_rgba(0,0,0,0.15)] hover:shadow-[0_0_50px_rgba(0,0,0,0.2)] after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:to-black/10 after:backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <HowItWorks />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
