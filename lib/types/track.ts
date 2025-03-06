export interface Track {
  id: string;
  title: string;
  artist: {
    id: string;
    name: string;
    image?: string; // Add image property that's being used in components
  };
  duration: number; // Change from string to number to match actual usage
  audioUrl?: string;
  previewUrl?: string;
  trackNumber: number;
  isAvailable: boolean;
  price: string;
  streamCount: number;
}
