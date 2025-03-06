'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/lib/hooks/use-search';
import { SearchFilters } from '@/components/search/search-filters';
import { Track } from '@/lib/types/track';
import { Album, Artist } from '@/lib/types/album';
import { useState } from 'react';

// Import the components we created
import { SearchPage } from '@/components/search/search-page';
import { SearchResults } from '@/components/search/search-results';
import { LoadingState } from '@/components/ui/loading-state';
import { SearchEmptyState } from '@/components/search/search-empty-state';

// Helper type for SearchResult to match the track, album, artist types used in SearchResults
type SearchResult = Track | Album | Artist;

// Create a client component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filters, setFilters] = useState({});

  const { results, isLoading } = useSearch(query, filters);

  return (
    <SearchPage
      query={query}
      renderFilters={() => <SearchFilters />}
      renderResults={() =>
        isLoading ? (
          <LoadingState />
        ) : results.items.length > 0 ? (
          <SearchResults results={results as any} />
        ) : (
          <SearchEmptyState query={query} />
        )
      }
    />
  );
}

// Create a wrapper component with Suspense
export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading search results...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
