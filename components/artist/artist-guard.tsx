'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Fix imports using relative paths
import { useAuth } from '../../hooks/use-auth';
import { Loader } from '../ui/loader';

export function ArtistGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login?callbackUrl=/dashboard/artist');
      } else if (user.role !== 'artist') {
        router.push('/dashboard');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !isAuthorized) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader size="lg" text="Verifying artist credentials..." />
      </div>
    );
  }

  return <>{children}</>;
}

export default ArtistGuard;
