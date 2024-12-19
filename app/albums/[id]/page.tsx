"use client";

import { useEffect, useState } from "react";
import { Album } from "@/lib/types";
import { TrackList } from "@/components/albums/track-list";
import { AlbumHeader } from "@/components/albums/album-header";
import { AlbumActions } from "@/components/albums/album-actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { mockAlbumData } from "@/lib/mock-data";

export default function AlbumDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulating API call with mock data
    const fetchAlbum = async () => {
      try {
        // In production, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAlbum(mockAlbumData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load album details",
          variant: "destructive",
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
      <TrackList tracks={album.tracks} />
    </div>
  );
}