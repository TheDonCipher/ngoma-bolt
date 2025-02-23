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
      <div className="absolute inset-0 bg-[url('/patterns/kente.svg')] opacity-25 mix-blend-mode-multiply pointer-events-none z-0" />
      <div className="relative">
        <div className="container px-6 py-12 space-y-8">
          <ExploreHeader />
          <SearchFilters />
          <div className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">Platform Features</h2>
                <p className="text-muted-foreground">Discover what makes Ngoma unique</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Music NFTs</h3>
                  <p className="text-muted-foreground">Mint and collect unique music NFTs directly from your favorite artists</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" /></svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Artist Discovery</h3>
                  <p className="text-muted-foreground">Explore and connect with talented African artists from across the continent</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Badge Collection</h3>
                  <p className="text-muted-foreground">Earn and collect unique badges as you engage with the platform</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Real-time Streaming</h3>
                  <p className="text-muted-foreground">Stream high-quality music directly from the blockchain</p>
                </div>
              </div>
            </div>
          </div>
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
