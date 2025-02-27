"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "./news-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { mockNews } from "@/lib/mock-news";

interface NewsItem {
  id: string;
  type: "album_release" | "festival" | "award" | "collaboration" | "charity" | "innovation" | "achievement";
  title: string;
  description: string;
  image: string;
  artist: {
    name: string;
    image: string;
    id?: string;
  };
  collaborator?: {
    name: string;
    image: string;
    id?: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  releaseDate?: string;
  ticketUrl?: string;
  achievementType?: "fan" | "artist";
  badgeName?: string;
}

// News data is now imported from mock-news.ts

interface NewsFeedProps {
  filter: string;
}

export function NewsFeed({ filter }: NewsFeedProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const filteredNews = filter === "all" 
        ? mockNews 
        : mockNews.filter(item => item.type === filter);
      setNews(filteredNews);
      setIsLoading(false);
    }, 500);
  }, [filter]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4 sm:py-8">
        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-[95%] sm:max-w-[90%] md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4 md:px-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
      <div className="flex justify-center py-2 sm:py-4">
        <Button variant="outline" className="w-full sm:w-auto">
          Load More
        </Button>
      </div>
    </div>
  );
}
