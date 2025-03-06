'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchResults as SearchResultsType } from '@/lib/types/search';
import { Track } from '@/lib/types/track';
import { Album, Artist } from '@/lib/types/album';
import { TrackCard } from '@/components/ui/track-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

// Define components for rendering different item types
function AlbumCard({ album }: { album: Album }) {
  // Simple album card implementation
  return (
    <Card className="p-4">
      <h3 className="font-semibold">{album.title}</h3>
      <p className="text-sm">{album.artist.name}</p>
    </Card>
  );
}

function ArtistCard({ artist }: { artist: Artist }) {
  // Simple artist card implementation
  return (
    <Card className="p-4">
      <h3 className="font-semibold">{artist.name}</h3>
    </Card>
  );
}

interface SearchResultsProps {
  results: SearchResultsType<Track | Album | Artist>;
}

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export function SearchResults({ results }: SearchResultsProps) {
  const [sortBy, setSortBy] = useState('relevance');

  const renderItem = (item: Track | Album | Artist) => {
    if ('duration' in item) {
      return <TrackCard key={item.id} track={item as Track} />;
    } else if ('trackCount' in item) {
      return <AlbumCard key={item.id} album={item as Album} />;
    } else {
      return <ArtistCard key={item.id} artist={item as Artist} />;
    }
  };

  if (results.items.length === 0) {
    return (
      <Card className="p-8 mt-8 text-center">
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </Card>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">{results.total} results found</p>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.items.map(renderItem)}
      </div>

      {results.hasMore && (
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  );
}
