'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp } from 'lucide-react';
import { mockFeaturedArtists } from '@/lib/mock-data';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  trending?: boolean;
}

export function TrendingArtists() {
  const artists: Artist[] = [
    {
      id: '1',
      name: 'Burna Boy',
      image:
        'https://images.unsplash.com/photo-1522196772883-393d879eb14d?auto=format&fit=crop&w=100&h=100&q=80',
      followers: 2500000,
      trending: true,
    },
    {
      id: '2',
      name: 'Tems',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      followers: 1800000,
      trending: true,
    },
    {
      id: '3',
      name: 'Wizkid',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80',
      followers: 3200000,
    },
    {
      id: '4',
      name: 'Amaarae',
      image:
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&h=100&q=80',
      followers: 950000,
      trending: true,
    },
    {
      id: '5',
      name: 'Black Sherif',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      followers: 780000,
    },
  ];

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md p-5">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Trending Artists</h2>

      <div className="space-y-4">
        {artists.map((artist, index) => (
          <motion.div
            key={artist.id}
            className="flex items-center gap-3 group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 3 }}
          >
            <Link href={`/artists/${artist.id}`} className="block relative">
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </div>
              {artist.trending && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  🔥
                </span>
              )}
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/artists/${artist.id}`} className="block">
                <h3 className="font-semibold text-gray-900 truncate group-hover:text-pink-600 transition-colors">
                  {artist.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatFollowers(artist.followers)} followers
                </p>
              </Link>
            </div>

            <button className="text-sm font-medium text-pink-600 hover:text-pink-800 transition-colors">
              Follow
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <Link href="/artists">
          <button className="text-sm font-medium bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors">
            View All Artists
          </button>
        </Link>
      </div>
    </div>
  );
}

function formatFollowers(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
