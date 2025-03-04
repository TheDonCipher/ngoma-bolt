import React, { useState } from 'react';
import { Calendar, Music, Upload, X } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  duration: string;
  plays: number;
}

interface AlbumData {
  title: string;
  releaseDate: string;
  coverArt: string;
  tracks: Track[];
  status: string;
}

interface AlbumCreateFormProps {
  onSubmit: (albumData: AlbumData) => void;
  onCancel: () => void;
}

const AlbumCreateForm: React.FC<AlbumCreateFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [albumData, setAlbumData] = useState<AlbumData>({
    title: '',
    releaseDate: '',
    coverArt: '',
    tracks: [],
    status: 'draft',
  });

  const [trackTitle, setTrackTitle] = useState('');
  const [trackDuration, setTrackDuration] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAlbumData({
      ...albumData,
      [name]: value,
    });
  };

  const addTrack = () => {
    if (trackTitle.trim() && trackDuration.trim()) {
      setAlbumData({
        ...albumData,
        tracks: [
          ...albumData.tracks,
          {
            id: Date.now(),
            title: trackTitle,
            duration: trackDuration,
            plays: 0,
          },
        ],
      });
      setTrackTitle('');
      setTrackDuration('');
    }
  };

  const removeTrack = (trackId: number) => {
    setAlbumData({
      ...albumData,
      tracks: albumData.tracks.filter((track) => track.id !== trackId),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(albumData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Album Title</label>
        <div className="relative">
          <input
            type="text"
            name="title"
            value={albumData.title}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter album title"
            required
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Music className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Release Date</label>
        <div className="relative">
          <input
            type="date"
            name="releaseDate"
            value={albumData.releaseDate}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Calendar className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cover Art URL</label>
        <div className="relative">
          <input
            type="text"
            name="coverArt"
            value={albumData.coverArt}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter cover art URL"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Upload className="h-4 w-4" />
          </div>
        </div>
        {albumData.coverArt && (
          <div className="mt-2 relative w-20 h-20">
            <img
              src={albumData.coverArt}
              alt="Album cover preview"
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={albumData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="released">Released</option>
        </select>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium mb-3">Add Tracks</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={trackTitle}
            onChange={(e) => setTrackTitle(e.target.value)}
            placeholder="Track title"
            className="flex-1 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            value={trackDuration}
            onChange={(e) => setTrackDuration(e.target.value)}
            placeholder="Duration (e.g. 3:45)"
            className="w-24 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={addTrack}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>

        {albumData.tracks.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Track List:</h4>
            <ul className="space-y-2">
              {albumData.tracks.map((track) => (
                <li
                  key={track.id}
                  className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <div>
                    <span className="font-medium">{track.title}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {track.duration}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTrack(track.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Create Album
        </button>
      </div>
    </form>
  );
};

export default AlbumCreateForm;
