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
        <div className="container px-6 py-12 space-y-8">
          <NewsFilter selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsFeed filter={selectedFilter} />
            </div>
            <div className="space-y-8">
              <TrendingArtists />
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
