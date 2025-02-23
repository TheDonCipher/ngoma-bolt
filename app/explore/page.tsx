"use client";

import { ExploreHeader } from "@/components/explore/explore-header";
import { SearchFilters } from "@/components/explore/search-filters";
import dynamic from "next/dynamic";
import { TrendingSongs } from "@/components/explore/trending-songs";
import { AudioPlayer } from "@/components/player/audio-player";
import { PlaylistDrawer } from "@/components/player/playlist-drawer";
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
      <div className="absolute inset-0 bg-[url('/patterns/afro-pattern.svg')] opacity-5 pointer-events-none" />
      <div className="relative">
        <div className="container px-6 py-12 space-y-8">
          <ExploreHeader />
          <SearchFilters />
          <div className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <FeaturedArtists featuredArtists={featuredArtists} />
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
