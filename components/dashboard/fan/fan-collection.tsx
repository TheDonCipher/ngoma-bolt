'use client';

import { useState } from 'react';
import { Track } from '@/lib/types/track'; // Import from correct path
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { CollectionGrid } from './collection-grid';
import { mockAlbumData } from '@/lib/mock-data';

export function FanCollection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks] = useState<Track[]>(
    mockAlbumData.tracks.map((track, index) => ({
      ...track,
      isAvailable: true,
      trackNumber: index + 1, // Set track number based on index instead of accessing non-existent property
    }))
  );

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search your collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <CollectionGrid tracks={filteredTracks} />
    </div>
  );
}
