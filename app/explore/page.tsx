"use client";

import { ExploreHeader } from "@/components/explore/explore-header";
import { SearchFilters } from "@/components/explore/search-filters";
import { FeaturedArtists } from "@/components/explore/featured-artists";
import { TrendingSongs } from "@/components/explore/trending-songs";
import { AudioPlayer } from "@/components/player/audio-player";
import { PlaylistDrawer } from "@/components/player/playlist-drawer";

export default function ExplorePage() {
  return (
    <main className="min-h-screen pb-24">
      <div className="container px-4 py-8">
        <ExploreHeader />
        <SearchFilters />
        <div className="mt-12">
          <FeaturedArtists />
        </div>
        <div className="mt-12">
          <TrendingSongs />
        </div>
      </div>
      <AudioPlayer />
      <PlaylistDrawer />
    </main>
  );
}