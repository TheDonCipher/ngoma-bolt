"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArtistCard } from "@/components/ui/artist-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Artist } from "@/lib/types";

interface FeaturedArtistsProps {
  featuredArtists: Artist[];
}

const FeaturedArtists = ({ featuredArtists }: FeaturedArtistsProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(featuredArtists.length / itemsPerPage);

  const currentArtists = featuredArtists.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    setCurrentPage(newPage);
    setIsLoading(false);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Featured Artists</h2>
          <p className="text-muted-foreground">
            Top artists making waves in the African music scene
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0 || isLoading}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1 || isLoading}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArtists.map((artist) => (
          <ArtistCard 
            key={artist.id} 
            artist={artist} 
            isPlaying={false} 
            onPlay={() => {}} 
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedArtists;
