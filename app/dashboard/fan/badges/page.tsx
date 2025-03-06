'use client';

import { useState, useEffect } from 'react';
import { BadgeOverview } from '@/components/badges/badge-overview';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/types/badges';

export default function BadgesPage() {
  const [badge, setBadge] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call to fetch badge data
    const fetchBadge = async () => {
      try {
        // Update mockBadge to match the Badge interface exactly
        const mockBadge: Badge = {
          id: '1',
          name: 'Early Supporter',
          description: 'One of the first 1000 users on the platform',
          imageUrl: '/images/badges/early-supporter.png',
          unlocked: true,
          unlockedAt: new Date('2023-01-15'), // Convert string to Date object
          criteria: 'Join during platform launch',
          tier: 'gold', // Optional tier property
          category: 'Membership', // Optional category property
        };

        setBadge(mockBadge);
      } catch (error) {
        console.error('Failed to fetch badge:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadge();
  }, []);

  if (loading) {
    return (
      <div className="container px-4 py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      {badge ? <BadgeOverview badge={badge} /> : <p>No badge found</p>}
    </div>
  );
}
