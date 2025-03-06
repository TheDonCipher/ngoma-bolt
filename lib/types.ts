export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  totalTracks: number;
  floorPrice: number;
  previewTrack: string;
  // Add these properties to match what's used in DashboardStats
  totalListeners?: number;
  revenue?: number;
  totalStreams?: number;
}

export interface Album {
  id: string;
  title: string;
  artist: {
    id: string;
    name: string;
    profileImage: string;
  };
  coverImage: string;
  releaseDate: string | Date; // Allow both string and Date
  description: string;
  trackCount: number;
  price: string | bigint; // Allow both string and bigint
  royaltyFee: number;
  tracks: {
    id: string;
    title: string;
    duration: string;
    audioUrl?: string;
    trackNumber: number;
    isAvailable: boolean;
    previewUrl?: string;
  }[];
}

export interface Track {
  id: string;
  title: string;
  duration: string;  // Changed from number to string to match your other Track interfaces
  audioUrl?: string;
  trackNumber: number;
  isAvailable: boolean;
  previewUrl?: string;
}
