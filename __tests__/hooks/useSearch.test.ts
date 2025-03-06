import { renderHook, waitFor } from '@testing-library/react';
import { useSearch } from '@/lib/hooks/use-search';
import { typedExpect } from '@/lib/test/test-utils';

// Mock the fetch implementation
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ items: [{ id: '1', title: 'Test Result' }], total: 1 }),
  })
);

describe('useSearch', () => {
  it('returns search results when query is provided', async () => {
    const { result } = renderHook(() => useSearch('test', {}));

    // Wait for the async operation to complete
    await waitFor(() => {
      typedExpect(result.current.isLoading).toBe(false);
    });

    typedExpect(result.current.results.items).toHaveLength(1);
  });

  it('returns empty results for empty query', () => {
    const { result } = renderHook(() => useSearch('', {}));

    typedExpect(result.current.results.items).toHaveLength(0);
  });

  it('handles empty results from API', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [], total: 0 }),
      })
    );

    const { result } = renderHook(() => useSearch('nonexistent', {}));

    await waitFor(() => {
      typedExpect(result.current.results.items).toBeDefined();
    });
  });
});
