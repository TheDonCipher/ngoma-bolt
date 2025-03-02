import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Info,
  Image as ImageIcon,
} from 'lucide-react';

interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}
interface EventEditFormProps {
  event: EventData;
  onSubmit: (event: EventData) => void;
  onCancel: () => void;
}

const EventEditForm = ({ event, onSubmit, onCancel }: EventEditFormProps) => {
  const [formData, setFormData] = useState<EventData>(event);

  useEffect(() => {
    if (event) {
      setFormData({ ...event });
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Event Title</label>
        <div className="relative">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md"
            placeholder="Enter event title"
            required
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Info className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Date</label>
          <div className="relative">
            <input
              type="date"
              name="date"
              value={formData.date}
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
          <label className="block text-sm font-medium mb-1">Event Time</label>
          <div className="relative">
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              required
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <div className="relative">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md"
            placeholder="Enter venue and city"
            required
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <MapPin className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border rounded-md"
          placeholder="Describe your event"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Event Image URL
        </label>
        <div className="relative">
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md"
            placeholder="Enter image URL"
            required
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <ImageIcon className="h-4 w-4" />
          </div>
        </div>
        {formData.image && (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Event preview"
              className="h-24 w-auto rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
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

export default EventEditForm;
