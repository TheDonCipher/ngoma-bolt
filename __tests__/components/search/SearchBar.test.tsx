import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '@/components/search/search-bar';
import { useRouter } from 'next/navigation';
import { typedExpect, expectHelpers } from '@/lib/test/test-utils';

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('SearchBar', () => {
  it('navigates to search page with query on submit', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.submit(input);

    // Use typedExpect everywhere instead of native expect
    typedExpect(mockPush).toHaveBeenCalledWith(
      expectHelpers.stringContaining('/search?q=test+query')
    );

    typedExpect(mockPush).toHaveBeenCalled();
    const callArg = mockPush.mock.calls[0][0];
    typedExpect(callArg.includes('test+query')).toBe(true);
  });

  it('shows autocomplete suggestions', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'afro' } });
    fireEvent.focus(input);

    typedExpect(screen.getByRole('listbox')).toBeInTheDocument();
  });
});
