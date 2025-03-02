'use client';

import { useState } from 'react';
import ArtistDashboard from '@/components/dashboard/artist/ArtistDashboard';
import ArtistStatsCard from '@/components/dashboard/artist/ArtistStatsCard';
import ArtistPublicProfilePreview from '@/components/dashboard/artist/ArtistPublicProfilePreview';
import AlbumListComponent from '@/components/dashboard/artist/AlbumListComponent';

export default function ArtistDashboardPage() {
  // This page now uses the ArtistDashboard component which handles all the dashboard functionality
  return <ArtistDashboard />;
}
