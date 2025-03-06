'use client';

import React from 'react';
import ArtistDashboard from '@/components/dashboard/artist/ArtistDashboard';

export default function ArtistProfilePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Artist Profile</h1>
      <ArtistDashboard />
    </div>
  );
}
