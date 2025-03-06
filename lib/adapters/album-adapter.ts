import { Album, Track } from '@/lib/types';

/**
 * Adapts raw album data to match the Album type
 */
export function adaptToAlbumType(rawData: any): Album {
  // Convert the main album data
  const adaptedAlbum: Album = {
    ...rawData,
    // Ensure any specific conversions here if needed

    // Properly adapt tracks to include all required properties
    tracks: rawData.tracks.map(
      (track: any, index: number): Track => ({
        ...track,
        trackNumber: track.trackNumber || index + 1, // Use existing or generate from index
        isAvailable: track.isAvailable !== undefined ? track.isAvailable : true, // Default to true if not specified
        // Ensure price is the correct type if needed
        price:
          typeof track.price === 'string' ? track.price : String(track.price),
      })
    ),
  };

  return adaptedAlbum;
}
