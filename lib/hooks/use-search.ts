'use client';

import { useState, useEffect } from 'react';
import { SearchFilters, SearchResults } from '@/lib/types/search';
import { Track } from '@/lib/types/track';
import { Album } from '@/lib/types/album';
import { Artist } from '@/lib/types/artist';
import {
  mockTracks,
  mockAlbumData,
  mockFeaturedArtists,
} from '@/lib/mocks/mock-data';

type SearchResult = Track | Album | Artist;

export function useSearch(query: string, filters: Partial<SearchFilters>) {
  const [results, setResults] = useState<SearchResults<SearchResult>>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 20,
    hasMore: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchItems = async () => {
      if (!query) {
        setResults({
          items: [],
          total: 0,
          page: 1,
          pageSize: 20,
          hasMore: false,
        });
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // In production, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock search results based on filters
        let items: SearchResult[] = [];

        switch (filters.category) {
          case 'tracks': {
            items = mockTracks.filter((track) =>
              track.title.toLowerCase().includes(query.toLowerCase())
            ) as unknown as SearchResult[];
            break;
          }
          case 'albums': {
            items = [mockAlbumData].filter((album) =>
              album.title.toLowerCase().includes(query.toLowerCase())
            ) as unknown as SearchResult[];
            break;
          }
          case 'artists': {
            items = mockFeaturedArtists.filter((artist: Artist) =>
              artist.name.toLowerCase().includes(query.toLowerCase())
            ) as SearchResult[];
            break;
          }
          default: {
            // If no category specified, search all types
            const trackResults = mockTracks.filter((track) =>
              track.title.toLowerCase().includes(query.toLowerCase())
            ) as unknown as SearchResult[];

            const albumResults = [mockAlbumData].filter((album) =>
              album.title.toLowerCase().includes(query.toLowerCase())
            ) as unknown as SearchResult[];

            const artistResults = mockFeaturedArtists.filter((artist: Artist) =>
              artist.name.toLowerCase().includes(query.toLowerCase())
            ) as SearchResult[];

            items = [...trackResults, ...albumResults, ...artistResults];
          }
        }

        // Apply filters
        if (filters.genre?.length) {
          items = items.filter(
            (item) =>
              'genre' in item &&
              filters.genre?.includes((item.genre as string).toLowerCase())
          );
        }

        if (filters.priceRange) {
          items = items.filter(
            (item) =>
              'price' in item &&
              Number(item.price) >= filters.priceRange!.min &&
              Number(item.price) <= filters.priceRange!.max
          );
        }

        setResults({
          items,
          total: items.length,
          page: 1,
          pageSize: 20,
          hasMore: false,
        });
      } catch (error) {
        console.error('Error searching:', error);
        setError('Failed to fetch search results');
      } finally {
        setIsLoading(false);
      }
    };

    searchItems();
  }, [query, filters]);

  return {
    results,
    isLoading,
    error,
  };
}
