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
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  audioUrl?: string;
  trackNumber: number;
  isAvailable: boolean;
  previewUrl?: string;
}
