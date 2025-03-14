'use client';

import { useEffect, useState } from 'react';
import { Album } from '@/lib/types';
import { TrackList } from '@/components/albums/track-list';
import { AlbumHeader } from '@/components/albums/album-header';
import { AlbumActions } from '@/components/albums/album-actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { fetchWithErrorHandling } from '@/lib/api-client';
import { isDevelopment } from '@/lib/utils/env';
import { mockAlbumData as originalMockAlbumData } from '@/lib/mock-data';
import { adaptToAlbumType } from '@/lib/adapters/album-adapter';

export default function AlbumDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        let albumData: Album;
        if (isDevelopment()) {
          // Use adapted mock data to ensure type compatibility
          albumData = adaptToAlbumType(originalMockAlbumData);
        } else {
          // Fetch from API in staging/production
          const rawData = await fetchWithErrorHandling(`/albums/${params.id}`);
          albumData = adaptToAlbumType(rawData);
        }
        setAlbum(albumData);
      } catch (error: unknown) {
        toast({
          title: 'Error',
          description:
            error instanceof Error
              ? error.message
              : 'Failed to load album details',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbum();
  }, [params.id, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!album) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Album not found</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <AlbumHeader album={album} />
      <AlbumActions album={album} />
      <TrackList
        tracks={album.tracks.map((track) => ({
          ...track,
          artist: album.artist, // Use the album's artist
          price: '0.00', // Add default price
          streamCount: 0, // Add default stream count
        }))}
      />
    </div>
  );
}
