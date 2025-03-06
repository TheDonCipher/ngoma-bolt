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

      <div className="flex flex-nowrap gap-2 sm:gap-4 py-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onFilterChange(category.id)}
            className={`whitespace-nowrap px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base transition-all
              ${
                selected === category.id
                  ? 'bg-purple-600 text-white font-medium shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
