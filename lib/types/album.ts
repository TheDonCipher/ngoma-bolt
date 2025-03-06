import { Track } from './track';
import { ExtendedArtist } from './artist';

export type { ExtendedArtist as Artist } from './artist';

export interface Album {
  id: string;
  title: string;
  artist: ExtendedArtist;
  coverImage: string;
  releaseDate: string;
  description: string;
  trackCount: number;
  price: string;
  royaltyFee: number;
  tracks: Track[];
}
