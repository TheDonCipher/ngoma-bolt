'use client';

import { ReactNode } from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Ethereum } from '@thirdweb-dev/chains';

// Optional imports with error handling for missing modules
let useWeb3Store: any;
let useWebSocket: any;
try {
  // Only import if the modules exist
  useWeb3Store = require('@/lib/store/use-web3-store').useWeb3Store;
  useWebSocket = require('@/lib/services/websocket.service').useWebSocket;
} catch (error) {
  console.warn('Optional modules not available:', error);
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  // Get environment variables with fallbacks
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '';
  const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN || '';

  const authConfig = authDomain
    ? {
        authUrl: '/api/auth',
        domain: authDomain,
      }
    : undefined;

  return (
    <ThirdwebProvider
      activeChain={Ethereum}
      clientId={clientId}
      authConfig={authConfig}
    >
      {children}
    </ThirdwebProvider>
  );
}
