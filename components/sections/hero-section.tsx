"use client";

import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/web3/connect-wallet-button";
import { ArrowRight, Music2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export function HeroSection() {
  return (
    <motion.section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl" />
      <div className="absolute inset-0 bg-[url('/circular-pattern.webp')] bg-cover bg-center opacity-75 mix-blend-soft-light pointer-events-none rounded-3xl" />
      <div className="container relative z-10 px-4 py-32 text-center">
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Music2 className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-white/90">Web3 Music Revolution</span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TypeAnimation
            sequence={[
              'Discover and Collect Unique',
              1000,
              'Discover and Own Authentic',
              1000,
              'Discover and Support African',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
          <motion.span 
            className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-purple-400 block mt-2 font-extrabold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            African Music NFTs
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Join the future of music ownership. Connect with artists directly, collect
          exclusive NFTs, and earn rewards for supporting your favorite creators.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ConnectWalletButton />
          <Link href="/explore">
            <Button variant="outline" size="lg" className="group backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10">
              Explore Music
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
