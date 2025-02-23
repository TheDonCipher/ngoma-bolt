"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArtistCard } from "@/components/ui/artist-card";
import { mockFeaturedArtists } from "@/lib/mock-data";

export function FeaturedArtists() {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="container px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <div className="group">
            <h2 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400">Featured Artists</h2>
            <p className="text-lg text-white/80 group-hover:text-white/90 transition-colors duration-300 font-medium">Discover trending African artists and their exclusive NFTs</p>
          </div>
          <Button 
            variant="outline" 
            size="lg"
            className="group backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 text-white/90 group-hover:text-white font-medium">View All Artists</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
          {mockFeaturedArtists.map((artist) => (
            <div key={artist.id} className="group/card transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl">
              <ArtistCard
                artist={artist}
                isPlaying={playingTrack === artist.previewTrack}
                onPlay={() => setPlayingTrack(artist.previewTrack)}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
