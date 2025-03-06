'use client';

import { useEffect } from 'react';
import {
  useAddress,
  useConnectionStatus,
  useChainId,
  useNetwork,
} from '@thirdweb-dev/react';
import { useWeb3Store } from '@/lib/store/use-web3-store';

export function useWeb3Auth() {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const chainId = useChainId();
  const networkData = useNetwork();
  const chain = networkData[0]; // Access first element in tuple

  const { setAddress, setConnectionStatus, setChainId, setError } =
    useWeb3Store();

  useEffect(() => {
    if (address !== undefined) {
      setAddress(address as string);
    }
  }, [address, setAddress]);

  useEffect(() => {
    setConnectionStatus(connectionStatus);
  }, [connectionStatus, setConnectionStatus]);

  useEffect(() => {
    setChainId(chainId);
  }, [chainId, setChainId]);

  useEffect(() => {
    const handleError = (error: any) => {
      setError(error?.message || 'An unknown error occurred');
    };

    window.ethereum?.on('error', handleError);

    return () => {
      window.ethereum?.removeListener('error', handleError);
    };
  }, [setError]);

  useEffect(() => {
    // Check if network is valid using a different approach
    // since 'unsupported' property doesn't exist
    if (
      connectionStatus === 'connected' &&
      chain &&
      !isSupportedNetwork(chain)
    ) {
      setError('Unsupported network. Please switch to a supported network.');
    }
  }, [connectionStatus, chain, setError]);

  return {
    isConnected: !!address,
    isConnecting: connectionStatus === 'connecting',
    isDisconnected: connectionStatus === 'disconnected',
    isReconnecting: connectionStatus === 'unknown',
  };
}

// Helper function to check if network is supported
function isSupportedNetwork(chainMetadata: any): boolean {
  // List of supported chains (add your supported chain IDs here)
  const supportedChainIds = [1, 5, 137, 80001]; // Example: Mainnet, Goerli, Polygon, Mumbai

  return supportedChainIds.includes(chainMetadata.chainId);
}
