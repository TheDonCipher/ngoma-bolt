export const mockFeaturedArtists = [
  {
    id: '1',
    name: 'Burna Boy',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000',
    genre: 'Afro-fusion',
    totalTracks: 24,
    floorPrice: 0.5,
    previewTrack: 'https://example.com/preview1.mp3',
  },
  {
    id: '2',
    name: 'Wizkid',
    image:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000',
    genre: 'Afrobeats',
    totalTracks: 18,
    floorPrice: 0.8,
    previewTrack: 'https://example.com/preview2.mp3',
  },
  {
    id: '3',
    name: 'Tems',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000',
    genre: 'Alternative R&B',
    totalTracks: 12,
    floorPrice: 0.3,
    previewTrack: 'https://example.com/preview3.mp3',
  },
];

export const mockRecentlyAdded = [
  {
    id: '1',
    title: 'Joro',
    artist: 'WizKid',
    releaseDate: new Date('2024-01-15'),
    coverImage:
      'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000',
    genre: 'Afrobeats',
    duration: 210,
    previewUrl: 'https://example.com/preview-joro.mp3',
  },
  {
    id: '2',
    title: 'Kulosa',
    artist: 'Oxlade',
    releaseDate: new Date('2024-01-12'),
    coverImage:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000',
    genre: 'Afro-fusion',
    duration: 195,
    previewUrl: 'https://example.com/preview-kulosa.mp3',
  },
  {
    id: '3',
    title: 'Rush',
    artist: 'Ayra Starr',
    releaseDate: new Date('2024-01-10'),
    coverImage:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000',
    genre: 'Afropop',
    duration: 180,
    previewUrl: 'https://example.com/preview-rush.mp3',
  },
];

export const mockGenres = [
  {
    id: '1',
    name: 'Afrobeats',
    description:
      'Modern African pop music with elements of hip-hop and dancehall',
    image:
      'https://images.unsplash.com/photo-1517230878791-4d28214057c2?q=80&w=1000',
    popularArtists: ['Wizkid', 'Davido', 'Burna Boy'],
    totalTracks: 150,
  },
  {
    id: '2',
    name: 'Soukous',
    description: 'Congolese dance music derived from Congolese rumba',
    image:
      'https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1000',
    popularArtists: ['Fally Ipupa', 'Koffi Olomide', 'Awilo Longomba'],
    totalTracks: 85,
  },
  {
    id: '3',
    name: 'Amapiano',
    description:
      'South African house music style with deep bass and piano melodies',
    image:
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000',
    popularArtists: ['Kabza De Small', 'DJ Maphorisa', 'DBN Gogo'],
    totalTracks: 120,
  },
  {
    id: '4',
    name: 'Highlife',
    description:
      'Traditional Ghanaian fusion of native rhythms with Western instruments',
    image:
      'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000',
    popularArtists: ['Ebo Taylor', 'Pat Thomas', 'K. Frimpong'],
    totalTracks: 95,
  },
];

export const mockLiveEvents = [
  {
    id: '1',
    title: 'African Unity Virtual Concert',
    date: new Date('2024-02-15T19:00:00'),
    description:
      'A virtual concert featuring top African artists celebrating unity through music',
    image:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000',
    artists: ['Burna Boy', 'Wizkid', 'Tems'],
    ticketPrice: 0.1, // ETH
    duration: '3 hours',
    platform: 'Ngoma Virtual Stage',
  },
  {
    id: '2',
    title: 'Afrobeats Explosion',
    date: new Date('2024-02-28T20:00:00'),
    description:
      'Experience the best of Afrobeats in this immersive virtual concert',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000',
    artists: ['Davido', 'Rema', 'Ayra Starr'],
    ticketPrice: 0.08, // ETH
    duration: '2.5 hours',
    platform: 'Ngoma Virtual Stage',
  },
  {
    id: '3',
    title: 'Amapiano Night',
    date: new Date('2024-03-10T21:00:00'),
    description: 'A night dedicated to the soul-moving sounds of Amapiano',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000',
    artists: ['Kabza De Small', 'DBN Gogo', 'DJ Maphorisa'],
    ticketPrice: 0.05, // ETH
    duration: '4 hours',
    platform: 'Ngoma Virtual Stage',
  },
];

export const mockAlbumData = {
  id: '1',
  title: 'African Rhythms',
  artist: {
    id: '1',
    name: 'Makeba Soul',
    profileImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
  coverImage:
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  releaseDate: '2023-04-15',
  description:
    'A journey through the soundscape of Africa, blending traditional rhythms with modern production.',
  trackCount: 12,
  price: '50000000000000000', // 0.05 ETH in wei
  royaltyFee: 10, // 10%
  tracks: [
    {
      id: '101',
      title: 'Sunrise in Lagos',
      artist: {
        id: '1',
        name: 'Makeba Soul',
      },
      duration: 245, // in seconds (4:05)
      price: '5000000000000000', // 0.005 ETH in wei
      streamCount: 12450,
    },
    {
      id: '102',
      title: 'Desert Dance',
      artist: {
        id: '1',
        name: 'Makeba Soul',
      },
      duration: 198, // (3:18)
      price: '5000000000000000',
      streamCount: 9823,
    },
    {
      id: '103',
      title: 'Drums of Timbuktu',
      artist: {
        id: '1',
        name: 'Makeba Soul',
      },
      duration: 312, // (5:12)
      price: '7000000000000000', // 0.007 ETH
      streamCount: 11238,
    },
  ],
};

export interface ArtistProfile {
  name: string;
  genre: string;
  location: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  website: string;
  instagram: string;
  twitter: string;
  facebook: string;
}

export const defaultArtistProfile: ArtistProfile = {
  name: 'Makeba Soul',
  genre: 'Afrobeat / Soul',
  location: 'Lagos, Nigeria',
  bio: 'Award-winning Afrobeat artist bringing the sounds of West Africa to the global stage. With 5 years in the industry, I blend traditional rhythms with contemporary production to create a unique sound that resonates across cultures.',
  profileImage:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
  coverImage:
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80',
  website: 'https://makeba-music.com',
  instagram: '@makeba_soul',
  twitter: '@makeba_soul',
  facebook: 'makebaofficialpage',
};

export const musicData = {
  totalListeners: 24500,
  totalPlays: 157300,
  topTracks: [
    {
      title: 'Midnight Dreams',
      plays: 24500,
      album: 'Celestial',
      duration: '3:45',
    },
    {
      title: 'Stardust',
      plays: 18300,
      album: 'Celestial',
      duration: '4:12',
    },
    {
      title: 'Morning Light',
      plays: 31200,
      album: 'Ethereal',
      duration: '3:22',
    },
  ],
};
