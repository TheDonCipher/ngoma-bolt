'use client';

import { useContract, useContractRead } from '@thirdweb-dev/react';
import { BADGE_NFT_CONTRACT_ADDRESS } from '@/lib/constants';
import { BadgeType, BADGE_THRESHOLDS } from '@/lib/types/badge';

export function useBadgeProgressService() {
  const { contract } = useContract(BADGE_NFT_CONTRACT_ADDRESS);

  const getProgress = (address: string, type: BadgeType) => {
    return useContractRead(contract, 'getUserProgress', [address, type]);
  };

  // Use the imported BADGE_THRESHOLDS constant
  const getThresholds = (type: BadgeType): number[] => {
    return BADGE_THRESHOLDS[type];
  };

  const calculateNextThreshold = (
    currentValue: number,
    type: BadgeType
  ): number => {
    const thresholds = getThresholds(type);
    return (
      thresholds.find((t: number) => t > currentValue) ||
      thresholds[thresholds.length - 1]
    );
  };

  const calculatePercentage = (
    currentValue: number,
    nextThreshold: number
  ): number => {
    return Math.min((currentValue / nextThreshold) * 100, 100);
  };

  return {
    getProgress,
    getThresholds,
    calculateNextThreshold,
    calculatePercentage,
  };
}

// These helper functions properly use the imported BADGE_THRESHOLDS
export function getBadgeThresholds(type: BadgeType): number[] {
  return BADGE_THRESHOLDS[type];
}

export function getNextThreshold(
  thresholds: number[],
  currentValue: number
): number {
  return (
    thresholds.find((t: number) => t > currentValue) ||
    thresholds[thresholds.length - 1]
  );
}
