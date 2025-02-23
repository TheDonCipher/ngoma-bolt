"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Wallet, Music, Award, Zap } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Link your digital wallet to start collecting and trading music NFTs"
  },
  {
    icon: Music,
    title: "Discover Artists",
    description: "Explore authentic African music and connect with talented artists"
  },
  {
    icon: Award,
    title: "Collect NFTs",
    description: "Own exclusive music NFTs and support your favorite artists directly"
  },
  {
    icon: Zap,
    title: "Earn Rewards",
    description: "Get badges and rewards for supporting the African music ecosystem"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="container px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400">How It Works</h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto font-medium">
            Join the Web3 music revolution in four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="transform transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-amber-400/20 to-purple-400/20 group-hover:from-amber-400/30 group-hover:to-purple-400/30 transition-colors">
                    <step.icon className="w-6 h-6 text-amber-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors">{step.title}</h3>
                  <p className="text-white/80 group-hover:text-white/90 transition-colors">{step.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
