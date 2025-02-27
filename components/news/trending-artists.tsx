"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp } from "lucide-react";
import { mockFeaturedArtists } from "@/lib/mock-data";

export function TrendingArtists() {
  return (
    <Card className="p-4 sticky top-20 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:top-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h2 className="font-semibold text-foreground">Trending Artists</h2>
      </div>

      <div className="space-y-4">
        {mockFeaturedArtists.map((artist) => (
          <div key={artist.id} className="flex items-center gap-3">
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src={artist.image} alt={artist.name} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{artist.name}</p>
              <p className="text-sm text-muted-foreground truncate">{artist.genre}</p>
            </div>
            <Button variant="outline" size="sm" className="hidden md:inline-flex">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
