'use client';

import { useAddress } from '@thirdweb-dev/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const address = useAddress();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a slight delay to ensure auth state has stabilized
    const timer = setTimeout(() => {
      if (!address) {
        console.log('No wallet detected, redirecting to home');
        router.push('/');
      } else {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [address, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
