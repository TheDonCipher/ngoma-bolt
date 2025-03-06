'use client';

import { Track } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
import { formatEther } from 'ethers/lib/utils';
import { useState } from 'react';

interface TrackListProps {
  tracks: Track[];
  albumArtistName?: string; // Add albumArtistName prop
}

export function TrackList({
  tracks,
  albumArtistName = 'Various Artists',
}: TrackListProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const handlePlay = (trackId: string) => {
    setPlayingTrackId(playingTrackId === trackId ? null : trackId);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Tracks</h2>
      <div className="space-y-2">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center gap-4 p-4 bg-card rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="w-8 text-muted-foreground text-center">
              {index + 1}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handlePlay(track.id)}
            >
              {playingTrackId === track.id ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <div className="flex-1">
              <p className="font-medium">{track.title}</p>
              <p className="text-sm text-muted-foreground">{albumArtistName}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDuration(
                typeof track.duration === 'string'
                  ? parseInt(track.duration, 10)
                  : track.duration
              )}
            </div>
            <div className="text-sm font-medium">
              {(track as any).price ? formatEther((track as any).price) : '0'}{' '}
              ETH
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
