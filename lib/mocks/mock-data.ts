import { Track } from '@/lib/types/track';
import { Album } from '@/lib/types/album';
import { Artist } from '@/lib/types/artist';

// Mock artists data
export const mockFeaturedArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Afro Harmony',
    image: '/images/artists/artist1.jpg',
  },
  {
    id: 'artist-2',
    name: 'Rhythm Collective',
    image: '/images/artists/artist2.jpg',
  },
  {
    id: 'artist-3',
    name: 'Savannah Sound',
    image: '/images/artists/artist3.jpg',
  },
];

export const mockTracks: Track[] = [
  {
    id: 'track1',
    title: 'Sunset Dreams',
    artist: {
      id: 'artist1',
      name: 'Luna Ray',
      image: '/images/artists/artist1.jpg',
    },
    duration: 215,
    price: '0.05',
    streamCount: 1205,
    trackNumber: 1,
    isAvailable: true,
    audioUrl: '/audio/track1.mp3',
    previewUrl: '/audio/preview1.mp3',
  },
  {
    id: '2',
    title: 'Lagos Nights',
    artist: {
      id: 'artist-1',
      name: 'Afro Harmony',
      image: '/images/artists/artist1.jpg',
    },
    duration: 198,
    price: '0.04',
    streamCount: 980,
    trackNumber: 2,
    isAvailable: true,
    audioUrl: '/audio/track2.mp3',
    previewUrl: '/audio/preview2.mp3',
  },
];

export const mockAlbumData: Album = {
  id: 'album-1',
  title: 'African Rhythms',
  artist: {
    id: 'artist-1',
    name: 'Afro Harmony',
    profileImage: '/images/artists/artist1.jpg',
  },
  coverImage: '/images/albums/album1.jpg',
  releaseDate: '2023-05-15',
  description:
    'A collection of rhythmic afrobeats exploring traditional and modern African sounds.',
  trackCount: mockTracks.length,
  price: '0.25',
  royaltyFee: 0.1,
  tracks: mockTracks,
};
