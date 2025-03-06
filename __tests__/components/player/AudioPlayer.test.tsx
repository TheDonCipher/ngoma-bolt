import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AudioPlayer } from '@/components/player/audio-player';
import { usePlayerStore } from '@/lib/store/player';

// Direct type assertion to help TypeScript recognize Jest matchers
type JestMatchers = {
  toBeInTheDocument(): void;
  toHaveBeenCalledWith(...args: any[]): void;
};

// Custom expect function with proper typing to use in tests
const typedExpect = <T extends any>(actual: T) => {
  return {
    ...expect(actual),
    toBeInTheDocument: () => (expect(actual) as any).toBeInTheDocument(),
    toHaveBeenCalledWith: (...args: any[]) =>
      (expect(actual) as any).toHaveBeenCalledWith(...args),
  };
};

// Ensure proper mock casting for usePlayerStore
jest.mock('@/lib/store/player');
const mockUsePlayerStore = usePlayerStore as unknown as jest.Mock;

describe('AudioPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders audio player with track info', () => {
    // Setup mock return value
    mockUsePlayerStore.mockReturnValue({
      currentTrack: {
        id: '1',
        title: 'Test Track',
        artist: {
          id: '1',
          name: 'Test Artist',
          image: '/test-image.jpg',
        },
        duration: 180,
        audioUrl: '/test-audio.mp3',
        trackNumber: 1,
        isAvailable: true,
        previewUrl: '/test-preview.mp3',
        price: '0.01',
        streamCount: 100,
      },
      isPlaying: false,
      volume: 0.8,
      progress: 0,
      setIsPlaying: jest.fn(),
    });

    render(<AudioPlayer />);

    // Use our custom typed expect for better TypeScript support
    typedExpect(screen.getByText('Test Track')).toBeInTheDocument();
    typedExpect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('toggles play state when play button is clicked', () => {
    const setIsPlaying = jest.fn();
    mockUsePlayerStore.mockReturnValue({
      currentTrack: {
        id: '1',
        title: 'Test Track',
        artist: {
          id: '1',
          name: 'Test Artist',
          image: '/test-image.jpg',
        },
        duration: 180,
        audioUrl: '/test-audio.mp3',
        trackNumber: 1,
        isAvailable: true,
        previewUrl: '/test-preview.mp3',
        price: '0.01',
        streamCount: 100,
      },
      isPlaying: false,
      volume: 0.8,
      progress: 0,
      setIsPlaying,
    });

    render(<AudioPlayer />);
    fireEvent.click(screen.getByLabelText(/play/i));

    // Use our custom typed expect for better TypeScript support
    typedExpect(setIsPlaying).toHaveBeenCalledWith(true);
  });
});
