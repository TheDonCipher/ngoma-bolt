'use client';

import { useEffect } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useBadgeService } from '@/lib/services/badge.service';
import { BadgeNotification } from '@/components/badges/collection/badge-notification';
import { toast } from 'react-hot-toast';

export function useBadgeUnlocks() {
  const address = useAddress();
  const { subscribeToBadgeEvents } = useBadgeService();

  useEffect(() => {
    if (!address) return;

    const unsubscribe = subscribeToBadgeEvents((badge) => {
      // Show notification for newly unlocked badge
      toast.custom((t) => <BadgeNotification badge={badge} />);
    });

    return () => {
      unsubscribe();
    };
  }, [address, subscribeToBadgeEvents]);

  return null;
}
