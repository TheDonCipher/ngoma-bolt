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
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background/50 relative overflow-hidden group/section">
      <div className="container px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <div className="group">
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:from-amber-500 group-hover:to-purple-500 transition-all duration-300">Featured Artists</h2>
            <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Discover trending African artists and their exclusive NFTs</p>
          </div>
          <Button 
            variant="secondary" 
            className="relative overflow-hidden bg-secondary/80 hover:bg-secondary transition-all duration-300 hover:scale-105 hover:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-amber-500/20 before:via-purple-500/20 before:to-pink-500/20 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300"
          >
            <span className="relative z-10">View All Artists</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover/section:opacity-100 transition-all duration-500 pointer-events-none" />
    </section>
  );
}
