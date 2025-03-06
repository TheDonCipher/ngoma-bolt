'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/search/search-bar';
import { SearchResults } from '@/components/search/search-results';
import { LoadingState } from '@/components/shared/loading-state';
import { ApiError } from '@/components/shared/api-error';
import { useSearch } from '@/lib/hooks/use-search';
import { SearchCategory } from '@/lib/types/search'; // Add this import

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'tracks';

  // Ensure category is a valid SearchCategory
  const category = categoryParam as SearchCategory;

  const { results, isLoading, error } = useSearch(query, {
    category,
    genre: searchParams.getAll('genre'),
    priceRange: {
      min: Number(searchParams.get('priceRange_min')) || 0,
      max: Number(searchParams.get('priceRange_max')) || 10,
    },
    verified: searchParams.get('verified') === 'true',
  });

  if (error) {
    return <ApiError message={error} />;
  }

  return (
    <div className="container px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <SearchBar />

        {isLoading ? <LoadingState /> : <SearchResults results={results} />}
      </div>
    </div>
  );
}
