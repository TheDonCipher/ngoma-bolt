import React from 'react';
import { ArtistProfile } from '@/lib/mock-data';
import {
  Globe,
  Instagram,
  Twitter,
  Facebook,
  ExternalLink,
} from 'lucide-react';
import AfricanPatternBackground from './AfricanPatternBackground';

interface ArtistPublicProfilePreviewProps {
  artistProfile: ArtistProfile;
}

const ArtistPublicProfilePreview: React.FC<ArtistPublicProfilePreviewProps> = ({
  artistProfile,
}) => {
  const defaultCoverImage =
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80';
  const defaultProfileImage =
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80';

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Cover Image */}
      <div className="h-40 relative overflow-hidden">
        <AfricanPatternBackground pattern="kente" opacity={0.1} />
        <img
          src={artistProfile.coverImage || defaultCoverImage}
          alt={`${artistProfile.name} cover`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Content */}
      <div className="relative px-5 pb-5">
        {/* Profile Image */}
        <div className="absolute -top-12 left-5 w-24 h-24 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
          <img
            src={artistProfile.profileImage || defaultProfileImage}
            alt={artistProfile.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Artist Info */}
        <div className="pt-16 flex flex-col sm:flex-row sm:items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{artistProfile.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {artistProfile.genre} • {artistProfile.location}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center">
            <button className="text-xs uppercase tracking-wider font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 rounded mr-2">
              Follow
            </button>
            <button className="text-xs uppercase tracking-wider font-medium border border-gray-300 dark:border-gray-600 px-3 py-1 rounded">
              Share
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
            Biography
          </h3>
          <p className="text-gray-800 dark:text-gray-200">
            {artistProfile.bio || "This artist hasn't added a biography yet."}
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-6">
          <h3 className="text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-2">
            Connect
          </h3>
          <div className="flex flex-wrap gap-3">
            {artistProfile.website && (
              <a
                href={artistProfile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm"
              >
                <Globe className="h-4 w-4 mr-1" /> Website
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
            {artistProfile.instagram && (
              <a
                href={`https://instagram.com/${artistProfile.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm"
              >
                <Instagram className="h-4 w-4 mr-1" /> {artistProfile.instagram}
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
            {artistProfile.twitter && (
              <a
                href={`https://twitter.com/${artistProfile.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm"
              >
                <Twitter className="h-4 w-4 mr-1" /> {artistProfile.twitter}
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
            {artistProfile.facebook && (
              <a
                href={`https://facebook.com/${artistProfile.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 text-sm"
              >
                <Facebook className="h-4 w-4 mr-1" /> {artistProfile.facebook}
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPublicProfilePreview;
