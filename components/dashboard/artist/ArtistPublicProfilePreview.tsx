import React from 'react';
import {
  Music,
  Calendar,
  ShoppingBag,
  Instagram,
  Twitter,
  Globe,
} from 'lucide-react';

const ArtistPublicProfilePreview = () => {
  // Mock artist data
  const artist = {
    name: 'Luna Rey',
    genre: 'Neo Soul / R&B',
    bio: "Luna Rey blends soulful vocals with modern electronic production, creating a sound that's both nostalgic and forward-thinking. Based in Atlanta, she's quickly becoming known for her emotional performances and relatable songwriting.",
    profileImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    coverImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    location: 'Atlanta, GA',
    socialLinks: {
      website: 'https://lunarey.com',
      instagram: '@luna_rey_music',
      twitter: '@lunareyofficial',
    },
    stats: {
      followers: '24.5K',
      monthlyListeners: '78.3K',
    },
    featuredSong: {
      title: 'Midnight Dreams',
      album: 'Celestial',
      coverArt:
        'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border dark:border-gray-700">
      {/* Cover image */}
      <div className="h-32 sm:h-48 overflow-hidden relative">
        <img
          src={artist.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile section */}
      <div className="px-6 -mt-12 relative z-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-end">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
            <img
              src={artist.profileImage}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:ml-4 mt-3 sm:mt-0 text-center sm:text-left">
            <h1 className="text-2xl font-bold">{artist.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{artist.genre}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {artist.location}
            </p>
          </div>
          <div className="sm:ml-auto mt-4 sm:mt-0 flex space-x-1">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-full text-sm font-medium">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 py-4 mt-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm">{artist.bio}</p>
      </div>

      {/* Stats */}
      <div className="px-6 py-2 border-t border-b border-gray-100 dark:border-gray-700 flex justify-around">
        <div className="text-center px-2">
          <p className="text-xl font-bold">{artist.stats.followers}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
        </div>
        <div className="text-center px-2">
          <p className="text-xl font-bold">{artist.stats.monthlyListeners}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Monthly Listeners
          </p>
        </div>
      </div>

      {/* Social links */}
      <div className="px-6 py-3 flex space-x-3">
        <a href="#" className="text-gray-500 hover:text-indigo-600">
          <Globe size={18} />
        </a>
        <a href="#" className="text-gray-500 hover:text-indigo-600">
          <Instagram size={18} />
        </a>
        <a href="#" className="text-gray-500 hover:text-indigo-600">
          <Twitter size={18} />
        </a>
      </div>

      {/* Featured content */}
      <div className="px-6 py-4">
        <h2 className="text-sm font-medium mb-3">Featured Song</h2>
        <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-md p-3">
          <img
            src={artist.featuredSong.coverArt}
            alt={artist.featuredSong.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="ml-3">
            <p className="font-medium text-sm">{artist.featuredSong.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {artist.featuredSong.album}
            </p>
          </div>
          <button className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="px-6 pt-1 pb-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex space-x-4 overflow-x-auto">
          <button className="flex items-center px-3 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
            <Music className="h-4 w-4 mr-1" /> Music
          </button>
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            <Calendar className="h-4 w-4 mr-1" /> Events
          </button>
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
            <ShoppingBag className="h-4 w-4 mr-1" /> Merch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistPublicProfilePreview;
