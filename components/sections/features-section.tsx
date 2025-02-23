"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Music, Users, Award, ShoppingBag, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Music,
    title: "Music NFTs",
    description: "Own and trade unique digital music assets authenticated on the blockchain"
  },
  {
    icon: Users,
    title: "Artist Collaboration",
    description: "Connect with artists directly and participate in exclusive collaborations"
  },
  {
    icon: Award,
    title: "Badge System",
    description: "Earn badges and rewards for your engagement and support of artists"
  },
  {
    icon: ShoppingBag,
    title: "NFT Marketplace",
    description: "Buy, sell, and collect digital music assets in a secure environment"
  },
  {
    icon: Zap,
    title: "Instant Payments",
    description: "Direct and immediate payments to artists through smart contracts"
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Built with robust security measures to protect your digital assets"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400">
            Powerful Features
          </h2>
          <motion.p className="text-lg text-white/90 max-w-2xl mx-auto font-medium">
            Discover the innovative features that make our platform the perfect place for artists and music lovers
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="transform transition-all duration-300 hover:scale-105">
                <Card className="p-6 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-block p-3 rounded-lg bg-gradient-to-br from-amber-400/20 to-purple-400/20 group-hover:from-amber-400/30 group-hover:to-purple-400/30 transition-colors">
                      <Icon className="w-6 h-6 text-amber-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors">{feature.title}</h3>
                    <p className="text-white/80 group-hover:text-white/90 transition-colors">{feature.description}</p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}