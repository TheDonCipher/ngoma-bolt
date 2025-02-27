"use client";

import Image from "next/image";
import { PlayCircle, PauseCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Artist } from "@/lib/types";

interface ArtistCardProps {
  artist: Artist;
  isPlaying?: boolean;
  onPlay?: () => void;
}

export function ArtistCard({ artist, isPlaying, onPlay }: ArtistCardProps) {
  return (
    <Card className="overflow-hidden group/card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-background border-0">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover transform transition-transform duration-500 group-hover/card:scale-110"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/card:translate-y-0 hover:scale-110 bg-white/90 hover:bg-white text-black"
          onClick={onPlay}
        >
          {isPlaying ? (
            <PauseCircle className="w-6 h-6" />
          ) : (
            <PlayCircle className="w-6 h-6" />
          )}
        </Button>
      </div>
      <div className="p-4 bg-background/95 transform transition-all duration-300 group-hover/card:translate-y-[-4px]">
        <h3 className="font-semibold text-lg mb-1 text-foreground transition-colors duration-300 group-hover/card:text-primary">{artist.name}</h3>
        <p className="text-foreground/80 text-sm mb-3 transition-colors duration-300">{artist.genre}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground/90 transition-colors duration-300">
            {artist.totalTracks} tracks
          </span>
          <span className="text-sm font-medium text-primary transition-all duration-300 group-hover/card:scale-110">
            Floor: {artist.floorPrice} ETH
          </span>
        </div>
      </div>
    </Card>
  );
}
