'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Disc3,
  Calendar,
  Trophy,
  Users,
  Heart,
  Lightbulb,
  Newspaper,
  Ticket,
  Mic,
  BadgeDollarSign,
  Megaphone,
  Check,
} from 'lucide-react';

interface NewsFilterProps {
  selected: string;
  onFilterChange: (filter: string) => void;
}

interface FilterCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  activeBg: string;
}

export function NewsFilter({ selected, onFilterChange }: NewsFilterProps) {
  const categories: FilterCategory[] = [
    {
      id: 'all',
      name: 'All News',
      icon: <Newspaper className="w-5 h-5" />,
      color: 'from-gray-600 to-gray-700',
      activeBg: 'bg-slate-800',
    },
    {
      id: 'albums',
      name: 'Album Releases',
      icon: <Disc3 className="w-5 h-5" />,
      color: 'from-amber-600 to-orange-700',
      activeBg: 'bg-amber-800',
    },
    {
      id: 'festivals',
      name: 'Festivals',
      icon: <Ticket className="w-5 h-5" />,
      color: 'from-purple-600 to-indigo-700',
      activeBg: 'bg-purple-800',
    },
    {
      id: 'awards',
      name: 'Awards',
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-yellow-600 to-amber-700',
      activeBg: 'bg-yellow-800',
    },
    {
      id: 'collaborations',
      name: 'Collaborations',
      icon: <Users className="w-5 h-5" />,
      color: 'from-blue-600 to-cyan-700',
      activeBg: 'bg-blue-800',
    },
    {
      id: 'charity',
      name: 'Charity',
      icon: <Heart className="w-5 h-5" />,
      color: 'from-pink-600 to-rose-700',
      activeBg: 'bg-pink-800',
    },
    {
      id: 'innovation',
      name: 'Innovation',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'from-green-600 to-emerald-700',
      activeBg: 'bg-green-800',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Browse Categories
      </h2>

      <div className="flex flex-wrap gap-3 bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-inner">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onFilterChange(category.id)}
            className={`
              relative px-5 py-3 rounded-xl text-sm md:text-base font-medium 
              transition-all duration-500 
              ${
                selected === category.id
                  ? 'scale-105 transform-gpu'
                  : 'bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
            style={{
              transformOrigin: 'center',
            }}
          >
            {/* Active state background with dynamic gradient */}
            {selected === category.id && (
              <motion.span
                layoutId="activeFilterBg"
                className={`absolute inset-0 ${category.activeBg} rounded-xl`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}

            {/* Pulsing glow effect for selected filter */}
            {selected === category.id && (
              <motion.span
                className="absolute -inset-1 rounded-xl opacity-20 blur-md z-0"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: 'easeInOut',
                }}
                style={{
                  background: `linear-gradient(45deg, var(--${category.id}-from, #8b5cf6), var(--${category.id}-to, #db2777))`,
                }}
              />
            )}

            {/* Content container with icon and text */}
            <span className="relative z-10 flex items-center gap-2">
              <span
                className={`
                  ${selected === category.id ? 'text-white' : 'text-gray-700'} 
                  relative z-10 inline-flex items-center
                `}
              >
                {category.icon}
              </span>
              <span
                className={`
                  ${selected === category.id ? 'text-white font-bold' : 'text-gray-800'} 
                  relative z-10
                  ${selected === category.id && 'drop-shadow-sm'}
                `}
              >
                {category.name}
              </span>

              {/* Checkmark indicator for selected filter */}
              {selected === category.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-1 bg-white bg-opacity-25 rounded-full p-0.5"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
