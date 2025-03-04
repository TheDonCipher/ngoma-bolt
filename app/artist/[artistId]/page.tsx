'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ArtistPublicProfilePreview from '@/components/dashboard/artist/ArtistPublicProfilePreview';
import ArtistProfileEditForm from '@/components/dashboard/artist/ArtistProfileEditForm';
import { ArtistProfile } from '@/lib/mock-data'; // Assuming this is where the ArtistProfile type is defined
import Link from 'next/link';

interface ArtistPageProps {
  params: { artistId: string };
}

const ArtistPage: React.FC<ArtistPageProps> = () => {
  const { artistId } = useParams();
  const [artistProfile, setArtistProfile] = useState<ArtistProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch artist data based on artistId
    // Replace this with your actual data fetching logic
    const fetchArtistData = async () => {
      // Example using a mock API call:
      // const data = await fetch(`/api/artists/${artistId}`);
      // const artist = await data.json();
      // setArtistProfile(artist);

      // For now, using mock data:
      const mockArtistProfile: ArtistProfile = {
        name: 'Example Artist',
        genre: 'Afrobeats',
        location: 'Lagos, Nigeria',
        bio: 'Example artist bio',
        website: 'https://example.com',
        instagram: '@exampleartist',
        twitter: '@exampleartist',
        facebook: 'exampleartist',
        profileImage: 'https://example.com/profile.jpg',
        coverImage: 'https://example.com/cover.jpg',
      };
      setArtistProfile(mockArtistProfile);
    };

    fetchArtistData();
  }, [artistId]);

  if (!artistProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ArtistPublicProfilePreview artistProfile={artistProfile} />
      {/* Add a link to the artist's dashboard if the user is the artist */}
      {/* Replace this with your actual authentication logic */}
      {/* For example: */}
      {/* {isAuthenticated && user.artistId === artistId && ( */}
      <div className="mt-4">
        <Link href="/dashboard/artist">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Dashboard
          </button>
        </Link>
      </div>
      {/* )} */}
    </div>
  );
};

export default ArtistPage;