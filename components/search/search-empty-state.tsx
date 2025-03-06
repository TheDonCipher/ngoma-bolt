import { SearchX } from 'lucide-react';

interface SearchEmptyStateProps {
  query: string;
}

export function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX className="h-16 w-16 text-muted-foreground mb-6" />
      <h2 className="text-2xl font-semibold mb-2">No results found</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        We couldn't find any matches for "{query}". Try adjusting your search or
        filters.
      </p>
    </div>
  );
}
