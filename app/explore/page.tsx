"use client";

import { ExploreHeader } from "@/components/explore/explore-header";
import { SearchFilters } from "@/components/explore/search-filters";
import dynamic from "next/dynamic";
import { TrendingSongs } from "@/components/explore/trending-songs";
import { AudioPlayer } from "@/components/player/audio-player";
import { PlaylistDrawer } from "@/components/player/playlist-drawer";
import { RecentlyAdded } from "@/components/explore/recently-added";
import { GenresShowcase } from "@/components/explore/genres-showcase";
import { LiveEvents } from "@/components/explore/live-events";
import { useEffect, useState } from "react";
import { fetchWithErrorHandling } from "@/lib/api-client";
import { Artist } from "@/lib/types";
import { isDevelopment } from "@/lib/utils/env";
import { mockFeaturedArtists } from "@/lib/mock-data";

const FeaturedArtists = dynamic(() => import("@/components/explore/featured-artists"), { ssr: false });

export default function ExplorePage() {
  const [featuredArtists, setFeaturedArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        let artists: Artist[];
        if (isDevelopment()) {
          // Use mock data in development
          artists = mockFeaturedArtists;
        } else {
          // Fetch from API in staging/production
          artists = await fetchWithErrorHandling<Artist[]>("/artists/featured");
        }
        setFeaturedArtists(artists);
      } catch (error) {
        console.error("Error fetching featured artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <main className="min-h-screen pb-24 bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5">
      <div className="absolute inset-0 bg-[url('/patterns/kente.svg')] opacity-25 mix-blend-mode-multiply pointer-events-none z-0" />
      <div className="relative">
        <div className="container px-6 py-12 space-y-8">
          <ExploreHeader />
          <SearchFilters />
          <div className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <FeaturedArtists featuredArtists={featuredArtists} />
          </div>
          <div className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Recently Added</h2>
              <p className="text-muted-foreground">Fresh beats from across Africa</p>
            </div>
            <RecentlyAdded />
          </div>
          <div className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Genres Showcase</h2>
              <p className="text-muted-foreground">Explore the rich diversity of African music</p>
            </div>
            <GenresShowcase />
          </div>
          <div className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Live Events</h2>
              <p className="text-muted-foreground">Upcoming virtual concerts and music events</p>
            </div>
            <LiveEvents />
          </div>
          <div className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <TrendingSongs />
          </div>
        </div>
      </div>
      <AudioPlayer />
      <PlaylistDrawer />
    </main>
  );
}
