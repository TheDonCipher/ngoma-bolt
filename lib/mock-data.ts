export const mockFeaturedArtists = [
  {
    id: "1",
    name: "Burna Boy",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    genre: "Afro-fusion",
    totalTracks: 24,
    floorPrice: 0.5,
    previewTrack: "https://example.com/preview1.mp3"
  },
  {
    id: "2",
    name: "Wizkid",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
    genre: "Afrobeats",
    totalTracks: 18,
    floorPrice: 0.8,
    previewTrack: "https://example.com/preview2.mp3"
  },
  {
    id: "3",
    name: "Tems",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
    genre: "Alternative R&B",
    totalTracks: 12,
    floorPrice: 0.3,
    previewTrack: "https://example.com/preview3.mp3"
  }
];

export const mockRecentlyAdded = [
  {
    id: "1",
    title: "Joro",
    artist: "WizKid",
    releaseDate: new Date("2024-01-15"),
    coverImage: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000",
    genre: "Afrobeats",
    duration: 210,
    previewUrl: "https://example.com/preview-joro.mp3"
  },
  {
    id: "2",
    title: "Kulosa",
    artist: "Oxlade",
    releaseDate: new Date("2024-01-12"),
    coverImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000",
    genre: "Afro-fusion",
    duration: 195,
    previewUrl: "https://example.com/preview-kulosa.mp3"
  },
  {
    id: "3",
    title: "Rush",
    artist: "Ayra Starr",
    releaseDate: new Date("2024-01-10"),
    coverImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000",
    genre: "Afropop",
    duration: 180,
    previewUrl: "https://example.com/preview-rush.mp3"
  }
];

export const mockGenres = [
  {
    id: "1",
    name: "Afrobeats",
    description: "Modern African pop music with elements of hip-hop and dancehall",
    image: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?q=80&w=1000",
    popularArtists: ["Wizkid", "Davido", "Burna Boy"],
    totalTracks: 150
  },
  {
    id: "2",
    name: "Soukous",
    description: "Congolese dance music derived from Congolese rumba",
    image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1000",
    popularArtists: ["Fally Ipupa", "Koffi Olomide", "Awilo Longomba"],
    totalTracks: 85
  },
  {
    id: "3",
    name: "Amapiano",
    description: "South African house music style with deep bass and piano melodies",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000",
    popularArtists: ["Kabza De Small", "DJ Maphorisa", "DBN Gogo"],
    totalTracks: 120
  },
  {
    id: "4",
    name: "Highlife",
    description: "Traditional Ghanaian fusion of native rhythms with Western instruments",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000",
    popularArtists: ["Ebo Taylor", "Pat Thomas", "K. Frimpong"],
    totalTracks: 95
  }
];

export const mockLiveEvents = [
  {
    id: "1",
    title: "African Unity Virtual Concert",
    date: new Date("2024-02-15T19:00:00"),
    description: "A virtual concert featuring top African artists celebrating unity through music",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
    artists: ["Burna Boy", "Wizkid", "Tems"],
    ticketPrice: 0.1, // ETH
    duration: "3 hours",
    platform: "Ngoma Virtual Stage"
  },
  {
    id: "2",
    title: "Afrobeats Explosion",
    date: new Date("2024-02-28T20:00:00"),
    description: "Experience the best of Afrobeats in this immersive virtual concert",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    artists: ["Davido", "Rema", "Ayra Starr"],
    ticketPrice: 0.08, // ETH
    duration: "2.5 hours",
    platform: "Ngoma Virtual Stage"
  },
  {
    id: "3",
    title: "Amapiano Night",
    date: new Date("2024-03-10T21:00:00"),
    description: "A night dedicated to the soul-moving sounds of Amapiano",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
    artists: ["Kabza De Small", "DBN Gogo", "DJ Maphorisa"],
    ticketPrice: 0.05, // ETH
    duration: "4 hours",
    platform: "Ngoma Virtual Stage"
  }
];

export const mockAlbumData = {
  id: "1",
  title: "African Giant",
  description: "A masterful blend of Afrobeats, dancehall, and hip-hop that showcases the evolution of African music.",
  coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
  price: BigInt("500000000000000000"), // 0.5 ETH
  royaltyFee: 10,
  trackCount: 19,
  releaseDate: new Date("2023-12-01"),
  artist: mockFeaturedArtists[0],
  tracks: [
    {
      id: "1",
      title: "African Giant",
      artist: mockFeaturedArtists[0],
      duration: 234,
      previewUrl: "https://example.com/preview1.mp3",
      price: BigInt("50000000000000000"), // 0.05 ETH
    },
    {
      id: "2",
      title: "Anybody",
      artist: mockFeaturedArtists[0],
      duration: 189,
      previewUrl: "https://example.com/preview2.mp3",
      price: BigInt("50000000000000000"), // 0.05 ETH
    },
    {
      id: "3",
      title: "Killin Dem",
      artist: mockFeaturedArtists[0],
      duration: 216,
      previewUrl: "https://example.com/preview3.mp3",
      price: BigInt("50000000000000000"), // 0.05 ETH
    }
  ]
};
