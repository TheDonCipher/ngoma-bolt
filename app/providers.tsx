'use client';

import { ReactNode } from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
// ...other imports...

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Get the ThirdWeb client ID from the environment variable
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '';
  const activeChain =
    process.env.NEXT_PUBLIC_THIRDWEB_ACTIVE_CHAIN || 'ethereum';

  return (
    <ThirdwebProvider clientId={clientId} activeChain={activeChain}>
      {/* Other providers */}
      {children}
    </ThirdwebProvider>
  );
}
