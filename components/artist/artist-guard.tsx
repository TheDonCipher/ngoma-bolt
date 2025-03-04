'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ArtistGuardProps {
  children: React.ReactNode;
}

const ArtistGuard = ({ children }: ArtistGuardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication check
  const isAuthenticated = true; // Replace with your actual auth check
  const isArtist = true; // Replace with your actual artist role check

  useEffect(() => {
    // Check if user is authenticated and is an artist
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login page if not authenticated
    } else if (!isArtist) {
      router.push('/dashboard'); // Redirect to general dashboard if not an artist
    } else {
      setIsLoading(false); // User is authenticated and is an artist
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-amber-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ArtistGuard;
