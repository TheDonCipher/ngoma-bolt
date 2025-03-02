import React, { useState } from 'react';
import { Calendar, Music, Upload, X, Plus } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  duration: string;
  plays: number;
}

export interface Album {
  id: number;
  title: string;
  releaseDate: string;
  coverArt: string;
  tracks: Track[];
  totalPlays: number;
  status: string;
}

export interface AlbumEditFormProps {
  album: Album;
  onSubmit: (album: Album) => void;
  onCancel: () => void;
}

const AlbumEditForm: React.FC<AlbumEditFormProps> = ({
  album,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Album>({ ...album });
  const [trackTitle, setTrackTitle] = useState('');
  const [trackDuration, setTrackDuration] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addTrack = () => {
    if (trackTitle.trim() && trackDuration.trim()) {
      setFormData({
        ...formData,
        tracks: [
          ...formData.tracks,
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
    setFormData({
      ...formData,
      tracks: formData.tracks.filter((track) => track.id !== trackId),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/3">
          {formData.coverArt && (
            <div className="relative mb-4">
              <img
                src={formData.coverArt}
                alt="Album cover"
                className="w-full h-auto rounded"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cover Art URL
            </label>
            <div className="relative">
              <input
                type="text"
                name="coverArt"
                value={formData.coverArt}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-md"
                placeholder="Enter cover art URL"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Upload className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Album Title
            </label>
            <div className="relative">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-md"
                placeholder="Enter album title"
                required
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Music className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Release Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-md"
                required
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="released">Released</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-medium mb-3">
          Tracks{' '}
          <span className="text-sm font-normal text-gray-500">
            ({formData.tracks.length})
          </span>
        </h3>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={trackTitle}
            onChange={(e) => setTrackTitle(e.target.value)}
            placeholder="Track title"
            className="flex-1 p-2 border rounded-md"
          />
          <input
            type="text"
            value={trackDuration}
            onChange={(e) => setTrackDuration(e.target.value)}
            placeholder="Duration (e.g. 3:45)"
            className="w-24 p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={addTrack}
            className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {formData.tracks.map((track) => (
            <div
              key={track.id}
              className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded"
            >
              <div>
                <span className="font-medium">{track.title}</span>
                <span className="ml-2 text-sm text-gray-500">
                  {track.duration}
                </span>
                {formData.status === 'released' && (
                  <span className="ml-2 text-xs text-gray-400">
                    {track.plays.toLocaleString()} plays
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeTrack(track.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default AlbumEditForm;
