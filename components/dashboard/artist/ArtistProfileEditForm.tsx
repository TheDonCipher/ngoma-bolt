import React, { useState } from 'react';
import {
  User,
  MapPin,
  Music,
  Globe,
  Camera,
  Instagram,
  Twitter,
  Facebook,
} from 'lucide-react';

interface ArtistProfile {
  name: string;
  genre: string;
  location: string;
  bio: string;
  website: string;
  instagram: string;
  twitter: string;
  facebook: string;
  profileImage: string;
  coverImage: string;
}

const ArtistProfileEditForm = () => {
  const [formData, setFormData] = useState<ArtistProfile>({
    name: 'Luna Rey',
    genre: 'Neo Soul / R&B',
    location: 'Atlanta, GA',
    bio: 'Luna Rey blends soulful vocals with modern electronic production, creating a sound that is both nostalgic and forward-thinking. Based in Atlanta, she is quickly becoming known for her emotional performances and relatable songwriting.',
    website: 'https://lunarey.com',
    instagram: '@luna_rey_music',
    twitter: '@lunareyofficial',
    facebook: 'lunareyofficial',
    profileImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    coverImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Profile data saved:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative h-32 sm:h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={formData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3">
          <label className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <Camera className="h-5 w-5" />
            <span className="sr-only">Change Cover Image</span>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
            <img
              src={formData.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0">
            <label className="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <Camera className="h-3.5 w-3.5" />
              <span className="sr-only">Change Profile Image</span>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium">Profile & Cover Images</h3>
          <p className="text-xs text-gray-500">
            Recommended: square image for profile, 1500x500px for cover
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Artist Name</label>
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md"
            placeholder="Your artist name"
            required
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Genre</label>
          <div className="relative">
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              placeholder="Your music genre(s)"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Music className="h-4 w-4" />
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
              placeholder="City, Country"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <MapPin className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border rounded-md"
          placeholder="Tell your story..."
        ></textarea>
      </div>

      <h3 className="text-lg font-medium pt-2">Social Media Links</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Website</label>
        <div className="relative">
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border rounded-md"
            placeholder="https://example.com"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Globe className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Instagram</label>
          <div className="relative">
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              placeholder="@username"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Instagram className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Twitter</label>
          <div className="relative">
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              placeholder="@username"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Twitter className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Facebook</label>
          <div className="relative">
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md"
              placeholder="username or page name"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Facebook className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default ArtistProfileEditForm;
