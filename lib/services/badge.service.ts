'use client';

import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { BADGE_NFT_CONTRACT_ADDRESS } from '@/lib/constants';
import { Badge, BadgeType } from '@/lib/types/badges';
import { useToast } from '@/hooks/use-toast';
import { useWebSocket } from './websocket.service';

export function useBadgeService() {
  const { contract } = useContract(BADGE_NFT_CONTRACT_ADDRESS);
  const { mutateAsync: updateProgressAsync } = useContractWrite(
    contract,
    'updateProgress'
  );
  const { subscribe, emit } = useWebSocket();
  const { toast } = useToast();

  const trackProgress = async (
    address: string,
    type: BadgeType,
    amount: number
  ) => {
    try {
      const tx = await updateProgressAsync({
        args: [address, type, amount],
      });
      const receipt = tx.receipt;
      // or if you need to wait for confirmations:
      // await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for transaction to be mined

      emit('badge:progress', { address, type, amount });

      toast({
        title: 'Progress Updated',
        description: `Your ${type.toLowerCase()} progress has been updated!`,
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  };

  const subscribeToBadgeEvents = (callback: (badge: Badge) => void) => {
    return subscribe<Badge>('badge:unlocked', callback);
  };

  return {
    trackProgress,
    subscribeToBadgeEvents,
  };
}
