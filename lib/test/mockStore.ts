import { PlayerStore } from '@/lib/store/player';

export const mockTrack = {
  id: '1',
  title: 'Test Track',
  artist: {
    id: '1',
    name: 'Test Artist',
    image: '/images/test-artist.jpg',
  },
  duration: 180,
  audioUrl: '/audio/test.mp3',
  previewUrl: '/audio/test-preview.mp3',
  trackNumber: 1,
  isAvailable: true,
  price: '0.01',
  streamCount: 1000,
};

export const mockStore: PlayerStore = {
  currentTrack: mockTrack,
  playlist: [mockTrack],
  isPlaying: false,
  volume: 0.8,
  progress: 0,
  isShuffled: false,
  repeatMode: 'off',
  setCurrentTrack: jest.fn(),
  setPlaylist: jest.fn(),
  setIsPlaying: jest.fn(),
  setVolume: jest.fn(),
  setProgress: jest.fn(),
  toggleShuffle: jest.fn(),
  toggleRepeat: jest.fn(),
  nextTrack: jest.fn(),
  previousTrack: jest.fn(),
  addToPlaylist: jest.fn(),
};
