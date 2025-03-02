import React from 'react';
import { Inter, Poppins } from 'next/font/google';
import ArtistGuard from '../../../components/artist/artist-guard'; // use the correct relative path

// Minimal fonts configuration
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Artist Dashboard | Ngoma',
  description: 'Manage your music, performances, and connect with fans',
};

export default function ArtistDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${poppins.variable} font-sans`}>
      <ArtistGuard>{children}</ArtistGuard>
    </div>
  );
}
