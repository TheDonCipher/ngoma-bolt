import { Track } from '@/lib/types/track';
// Fix import path to match actual location
import { Album } from '@/lib/types/album';

// Helper to ensure mock tracks have all required properties
export function createMockTrack(overrides: Partial<Track> = {}): Track {
  return {
    id: 'track-1',
    title: 'Test Track',
    duration: 180, // Now matches the updated type as a number
    trackNumber: 1, // Add if missing
    isAvailable: true, // Add if missing
    artist: {
      id: 'artist1',
      name: 'Test Artist',
      image: '/images/test-artist.jpg', // This is allowed by our updated type
    },
    price: '0.01',
    streamCount: 100,
    audioUrl: '/audio/test.mp3',
    previewUrl: '/audio/preview.mp3',
    ...overrides,
  };
}

// Helper to ensure mock albums have all required properties
export function createMockAlbum(overrides: Partial<Album> = {}): Album {
  return {
    id: 'album-1',
    title: 'Test Album',
    artist: {
      id: 'artist-1',
      name: 'Test Artist',
      profileImage: '/images/test-artist.jpg',
    },
    coverImage: '/images/album-cover.jpg',
    releaseDate: '2023-01-01',
    description: 'Test album description',
    trackCount: 2,
    price: '0.05',
    royaltyFee: 0.1,
    tracks: [
      createMockTrack({ id: 'track-1-1', title: 'Track 1', trackNumber: 1 }),
      createMockTrack({ id: 'track-1-2', title: 'Track 2', trackNumber: 2 }),
    ],
    ...overrides,
  };
}

// Mock album data with properly typed tracks
export const mockAlbumData = createMockAlbum();
