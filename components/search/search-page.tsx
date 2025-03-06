import React, { ReactNode } from 'react';
import { Container } from '@/components/ui/container'; // This import should now work

interface SearchPageProps {
  query: string;
  renderFilters: () => ReactNode;
  renderResults: () => ReactNode;
}

export function SearchPage({
  query,
  renderFilters,
  renderResults,
}: SearchPageProps) {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-4">
          {query ? `Search results for "${query}"` : 'Browse All'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">{renderFilters()}</div>
          </div>
          <div className="lg:col-span-3">{renderResults()}</div>
        </div>
      </div>
    </Container>
  );
}
