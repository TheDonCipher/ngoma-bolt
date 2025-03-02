import { useEffect, useState } from 'react';

interface User {
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>({ role: 'artist' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return { user, isLoading };
};