"use client";

import { useState } from "react";
import { NewsFeed } from "@/components/news/news-feed";
import { TrendingArtists } from "@/components/news/trending-artists";
import { UpcomingEvents } from "@/components/news/upcoming-events";
import { NewsFilter } from "@/components/news/news-filter";

export default function NewsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  return (
    <main className="min-h-screen pb-24 bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5">
      <div className="absolute inset-0 bg-[url('/patterns/mud-cloth.svg')] opacity-25 mix-blend-mode-multiply pointer-events-none z-0" />
      <div className="relative">
        <div className="container px-6 py-12 space-y-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Latest News</h1>
            <p className="text-xl text-muted-foreground/90">Stay updated with the latest from your favorite African artists</p>
          </div>
          <NewsFilter selected={selectedFilter} onFilterChange={setSelectedFilter} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <NewsFeed filter={selectedFilter} />
            </div>
            <div className="space-y-8 lg:sticky lg:top-8 lg:self-start">
              <TrendingArtists />
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
