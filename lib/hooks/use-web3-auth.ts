"use client";

import { useEffect } from 'react';
import { useAddress, useConnectionStatus, useChainId } from "@thirdweb-dev/react";
import { useWeb3Store } from '@/lib/store/use-web3-store';

export function useWeb3Auth() {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const chainId = useChainId();
  
  const {
    setAddress,
    setConnectionStatus,
    setChainId,
    setError,
  } = useWeb3Store();

  useEffect(() => {
    setAddress(address);
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

  return {
    isConnected: !!address,
    isConnecting: connectionStatus === 'connecting',
    isDisconnected: connectionStatus === 'disconnected',
    isReconnecting: connectionStatus === 'unknown',
  };
}