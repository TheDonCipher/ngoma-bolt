'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function NewsHero() {
  const featuredNews = {
    id: 'featured-1',
    title: 'Afrobeats Global Music Festival Announced',
    excerpt:
      'The biggest gathering of African musical talent is set to take place across three continents in a groundbreaking series of concerts.',
    date: '2023-10-15',
    category: 'festivals',
    imageUrl:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 py-12 mb-8">
      <div className="container px-6">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            African Music News
          </motion.h1>
          <motion.p
            className="text-xl text-gray-900 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Stay updated with the latest from your favorite African artists and
            the global music scene
          </motion.p>
        </div>

        <motion.div
          className="bg-white rounded-2xl overflow-hidden shadow-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative h-64 lg:h-auto">
              <Image
                src={featuredNews.imageUrl}
                alt={featuredNews.title}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Festival Announcement</span>
              </div>
            </div>

            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(featuredNews.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
                {featuredNews.title}
              </h2>
              <p className="text-gray-700 mb-6">{featuredNews.excerpt}</p>

              <Link href={`/news/${featuredNews.id}`}>
                <button className="flex items-center text-purple-700 font-semibold hover:text-purple-900 transition-colors">
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
