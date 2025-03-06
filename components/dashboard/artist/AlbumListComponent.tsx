import React, { useState } from 'react';
import {
  Plus,
  Play,
  Pause,
  MoreVertical,
  Upload,
  Edit,
  Trash,
  ExternalLink,
} from 'lucide-react';
import { formatDate, formatDuration } from '@/lib/utils';
import { mockAlbumData } from '@/lib/mock-data';

const AlbumListComponent = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isAddingTrack, setIsAddingTrack] = useState(false);
  const [isAddingAlbum, setIsAddingAlbum] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(mockAlbumData);

  // Toggle play state for a track
  const togglePlay = (trackId: string) => {
    if (isPlaying === trackId) {
      setIsPlaying(null);
    } else {
      setIsPlaying(trackId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Your Music</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your albums and tracks
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsAddingTrack(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm transition-colors"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Track
          </button>
          <button
            onClick={() => setIsAddingAlbum(true)}
            className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Album
          </button>
        </div>
      </div>

      {/* Album section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="md:flex">
          {/* Album cover and info */}
          <div className="md:w-1/3 p-6 flex flex-col">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <img
                src={currentAlbum.coverImage}
                alt={currentAlbum.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">{currentAlbum.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Released on{' '}
                {formatDate(
                  typeof currentAlbum.releaseDate === 'string'
                    ? new Date(currentAlbum.releaseDate)
                    : currentAlbum.releaseDate
                )}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                {currentAlbum.trackCount} tracks •{' '}
                {currentAlbum.tracks.reduce(
                  (total, track) => total + track.duration,
                  0
                ) / 60}{' '}
                minutes
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {currentAlbum.description}
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Price:</span>
                  <span className="ml-2">
                    {Number(currentAlbum.price) / 1e18} ETH
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Royalty Fee:</span>
                  <span className="ml-2">{currentAlbum.royaltyFee}%</span>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Album
                </button>
                <button className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 inline-flex items-center">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Listing
                </button>
              </div>
            </div>
          </div>

          {/* Track list */}
          <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Tracks</h3>
                <button
                  onClick={() => setIsAddingTrack(true)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Track
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAlbum.tracks.map((track, index) => (
                      <tr
                        key={track.id}
                        className="group border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 min-w-[200px]">
                          <div className="flex items-center">
                            <button
                              onClick={() => togglePlay(track.id)}
                              className="mr-3 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/20 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                            >
                              {isPlaying === track.id ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </button>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {track.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {track.artist.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {Number(track.price) / 1e18} ETH
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {formatDuration(track.duration)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 text-gray-500 hover:text-indigo-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-red-600">
                              <Trash className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-gray-900">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumListComponent;
