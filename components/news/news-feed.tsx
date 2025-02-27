'use client';

import { useState, useEffect } from 'react';
import { NewsCard } from './news-card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { mockNews } from '@/lib/mock-news';
import { motion } from 'framer-motion';

export function NewsFeed({ filter }: { filter: string }) {
  const [news, setNews] = useState(mockNews);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      let filteredNews = mockNews;

      if (filter !== 'all') {
        filteredNews = mockNews.filter((item) => {
          if (filter === 'albums' && item.type === 'album_release') return true;
          if (filter === 'festivals' && item.type === 'festival') return true;
          if (filter === 'awards' && item.type === 'award') return true;
          if (filter === 'collaborations' && item.type === 'collaboration')
            return true;
          if (filter === 'charity' && item.type === 'charity') return true;
          if (filter === 'innovation' && item.type === 'innovation')
            return true;
          return false;
        });
      }

      setNews(filteredNews);
      setIsLoading(false);
    }, 500);
  }, [filter]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 bg-clip-text">
        Latest Updates
      </h2>

      {news.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-700">
            No news found in this category. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NewsCard news={item} />
            </motion.div>
          ))}
        </div>
      )}

      {news.length > 0 && (
        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:text-white border-0 shadow-md hover:shadow-lg transition-all" // Updated button style to match design language
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
