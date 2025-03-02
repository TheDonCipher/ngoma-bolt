import React, { useState } from 'react';
import {
  Plus,
  PlayCircle,
  Music,
  Calendar,
  Edit,
  Trash,
  UploadCloud,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import AlbumCreateForm from './AlbumCreateForm';
import AlbumEditForm, { AlbumEditFormProps } from './AlbumEditForm';

interface Track {
  id: number;
  title: string;
  duration: string;
  plays: number;
}

interface Album {
  id: number;
  title: string;
  releaseDate: string;
  coverArt: string;
  tracks: Track[];
  totalPlays: number;
  status: string;
}

// Mock data for albums with more details
const initialAlbums: Album[] = [
  {
    id: 1,
    title: 'Celestial',
    releaseDate: '2023-05-15',
    coverArt:
      'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    tracks: [
      { id: 1, title: 'Midnight Dreams', duration: '3:45', plays: 24500 },
      { id: 2, title: 'Stardust', duration: '4:12', plays: 18300 },
      { id: 3, title: 'Cosmic Love', duration: '3:58', plays: 21700 },
    ],
    totalPlays: 64500,
    status: 'released',
  },
  {
    id: 2,
    title: 'Ethereal',
    releaseDate: '2022-11-20',
    coverArt:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    tracks: [
      { id: 1, title: 'Morning Light', duration: '3:22', plays: 31200 },
      { id: 2, title: 'Silver Lining', duration: '4:05', plays: 27800 },
      { id: 3, title: 'Golden Hour', duration: '3:47', plays: 29400 },
      { id: 4, title: 'Daydream', duration: '3:35', plays: 26100 },
    ],
    totalPlays: 114500,
    status: 'released',
  },
  {
    id: 3,
    title: 'Moonrise',
    releaseDate: '2023-12-10',
    coverArt:
      'https://images.unsplash.com/photo-1504898770365-14faca6a7320?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    tracks: [
      { id: 1, title: 'Night Whispers', duration: '3:30', plays: 0 },
      { id: 2, title: 'Lunar Phase', duration: '4:15', plays: 0 },
      { id: 3, title: 'Eclipse', duration: '3:50', plays: 0 },
    ],
    totalPlays: 0,
    status: 'scheduled',
  },
];

const AlbumListComponent = () => {
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [expandedAlbum, setExpandedAlbum] = useState<number | null>(null);

  const handleCreate = (newAlbum: any) => {
    const createdAlbum: Album = {
      ...newAlbum,
      id: Math.max(...albums.map((a) => a.id), 0) + 1,
      totalPlays: 0,
    };
    setAlbums([...albums, createdAlbum]);
    setIsCreating(false);
  };

  const handleEdit = (updatedAlbum: Album) => {
    setAlbums(
      albums.map((album) =>
        album.id === updatedAlbum.id ? updatedAlbum : album
      )
    );
    setIsEditing(false);
    setCurrentAlbum(null);
  };

  const handleDelete = (albumId: number) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      setAlbums(albums.filter((album) => album.id !== albumId));
    }
  };

  const toggleExpand = (albumId: number) => {
    setExpandedAlbum(expandedAlbum === albumId ? null : albumId);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status display info
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'released':
        return {
          label: 'Released',
          color:
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        };
      case 'scheduled':
        return {
          label: 'Scheduled',
          color:
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        };
      case 'draft':
        return {
          label: 'Draft',
          color:
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };
      default:
        return {
          label: status,
          color:
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Music Catalog</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Album
        </button>
      </div>

      {isCreating && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Create New Album</h3>
          <AlbumCreateForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      )}

      {isEditing && currentAlbum && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Edit Album</h3>
          <AlbumEditForm
            album={currentAlbum}
            onSubmit={handleEdit}
            onCancel={() => {
              setIsEditing(false);
              setCurrentAlbum(null);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {albums.map((album) => {
          const statusInfo = getStatusInfo(album.status);

          return (
            <div
              key={album.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left column for cover image */}
                <div className="md:w-1/4 lg:w-1/5">
                  <div className="relative h-40 md:h-full">
                    <img
                      src={album.coverArt}
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                    {album.status === 'scheduled' && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Upcoming
                      </div>
                    )}
                  </div>
                </div>

                {/* Right column for album details */}
                <div className="p-4 flex-1">
                  {/* Header with title and release info */}
                  <div className="flex flex-wrap justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{album.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(album.releaseDate)}

                        <span
                          className={`ml-3 px-2 py-0.5 rounded-full text-xs ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                    {album.status === 'released' && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-indigo-600">
                          {album.totalPlays.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Total Plays
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Quick actions: Edit, Delete, Toggle Tracks */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setCurrentAlbum(album);
                          setIsEditing(true);
                        }}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(album.id)}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-red-600"
                      >
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </button>
                    </div>
                    <button
                      onClick={() => toggleExpand(album.id)}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600"
                    >
                      {expandedAlbum === album.id ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" /> Hide Tracks
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" /> View Tracks (
                          {album.tracks.length})
                        </>
                      )}
                    </button>
                  </div>

                  {expandedAlbum === album.id && (
                    <div className="mt-4 border-t pt-4">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Track
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Duration
                            </th>
                            {album.status === 'released' && (
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Plays
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {album.tracks.map((track) => (
                            <tr key={track.id}>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <PlayCircle className="h-4 w-4 mr-2 text-gray-400" />{' '}
                                  {track.title}
                                </div>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                {track.duration}
                              </td>
                              {album.status === 'released' && (
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {track.plays.toLocaleString()}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-4 flex justify-end">
                        <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                          <UploadCloud className="h-4 w-4 mr-1" /> Upload New
                          Track
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumListComponent;
