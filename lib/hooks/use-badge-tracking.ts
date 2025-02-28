'use client';

import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { usePlayerStore } from '@/lib/store/use-player-store';
// Import this separately if it exists, or define it inline
// import { useBadgeService } from "@/lib/services/badge.service";
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from './use-local-storage';

// Define the BadgeType to include "LISTENER"
export type BadgeType =
  | 'EXPLORER'
  | 'LISTENER'
  | 'COLLECTOR'
  | 'CREATOR'
  | 'SUPPORTER';

type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
};

const BADGES = [
  {
    id: 'explorer',
    name: 'African Explorer',
    description: 'Visited the Ngoma platform',
    icon: '🌍',
    requirements: () => true,
  },
  {
    id: 'scroll_master',
    name: 'Rhythm Navigator',
    description: 'Scrolled through the entire page',
    icon: '📜',
    requirements: (metrics: UserMetrics) => metrics.scrollDepth >= 90,
  },
  {
    id: 'feature_discoverer',
    name: 'Feature Discoverer',
    description: 'Explored all platform features',
    icon: '🔍',
    requirements: (metrics: UserMetrics) =>
      metrics.sectionsViewed.includes('features'),
  },
  {
    id: 'community_member',
    name: 'Community Member',
    description: 'Viewed the community section',
    icon: '👥',
    requirements: (metrics: UserMetrics) =>
      metrics.sectionsViewed.includes('community'),
  },
  {
    id: 'engaged_visitor',
    name: 'Engaged Visitor',
    description: 'Spent over 2 minutes on the platform',
    icon: '⏱️',
    requirements: (metrics: UserMetrics) => metrics.timeOnPage > 120,
  },
];

interface UserMetrics {
  visitCount: number;
  timeOnPage: number;
  scrollDepth: number;
  sectionsViewed: string[];
  interactionCount: number;
}

// Temporarily mock the badge service until it's fully implemented
const mockBadgeService = {
  trackProgress: async (
    address: string,
    badgeType: BadgeType,
    value: number
  ) => {
    console.log(`Tracked ${value} for ${badgeType} by ${address}`);
    return true;
  },
};

export function useBadgeTracking() {
  const address = useAddress();
  const { currentTrack, playbackProgress } = usePlayerStore();
  // Use the mock badge service for now
  const { trackProgress } = mockBadgeService;
  const { toast } = useToast?.() || { toast: () => {} };
  const [badges, setBadges] = useLocalStorage<Badge[]>(
    'ngoma_badges',
    BADGES.map((b) => ({ ...b, earned: false }))
  );

  const [metrics, setMetrics] = useState<UserMetrics>({
    visitCount: 1,
    timeOnPage: 0,
    scrollDepth: 0,
    sectionsViewed: [],
    interactionCount: 0,
  });

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({ ...prev, timeOnPage: prev.timeOnPage + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;

      // Calculate scroll depth as percentage
      const depth = Math.min(
        100,
        Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
      );

      setMetrics((prev) => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, depth),
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track sections viewed with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setMetrics((prev) => ({
              ...prev,
              sectionsViewed: prev.sectionsViewed.includes(sectionId)
                ? prev.sectionsViewed
                : [...prev.sectionsViewed, sectionId],
            }));
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id], div[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Check for badges to award based on metrics
  useEffect(() => {
    // Clone the current badges to modify
    const updatedBadges = [...badges];
    let badgeAwarded = false;

    // Check each badge
    BADGES.forEach((badgeTemplate) => {
      const badgeIndex = updatedBadges.findIndex(
        (b) => b.id === badgeTemplate.id
      );
      if (badgeIndex !== -1 && !updatedBadges[badgeIndex].earned) {
        if (badgeTemplate.requirements(metrics)) {
          updatedBadges[badgeIndex].earned = true;
          updatedBadges[badgeIndex].earnedAt = new Date();
          badgeAwarded = true;

          // Show a notification
          const badge = updatedBadges[badgeIndex];
          showBadgeNotification(badge);
        }
      }
    });

    if (badgeAwarded) {
      setBadges(updatedBadges);
    }
  }, [metrics, badges, setBadges]);

  // Track listening progress
  useEffect(() => {
    if (!address || !currentTrack) return;

    let trackingInterval: NodeJS.Timeout;

    const trackListening = async () => {
      try {
        if (playbackProgress > 0.9) {
          // Track completed
          await trackProgress(address, 'LISTENER' as BadgeType, 1);
        }
      } catch (error) {
        console.error('Error tracking listening progress:', error);
        if (toast) {
          toast({
            title: 'Error',
            description: 'Failed to track listening progress',
            variant: 'destructive',
          });
        }
      }
    };

    if (playbackProgress > 0) {
      trackingInterval = setInterval(trackListening, 1000);
    }

    return () => {
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    };
  }, [address, currentTrack, playbackProgress, trackProgress, toast]);

  return { badges };
}

function showBadgeNotification(badge: Badge) {
  // Create and display the badge notification
  const notification = document.createElement('div');
  notification.className =
    'fixed bottom-20 right-6 z-50 p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-500 transform translate-y-20 opacity-0';
  notification.style.maxWidth = '300px';
  notification.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="text-3xl">${badge.icon}</div>
      <div>
        <h3 class="font-semibold text-white text-base">Badge Earned: ${badge.name}</h3>
        <p class="text-white/80 text-sm">${badge.description}</p>
      </div>
    </div>
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.replace('translate-y-20', 'translate-y-0');
    notification.classList.replace('opacity-0', 'opacity-100');
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.classList.replace('translate-y-0', 'translate-y-20');
    notification.classList.replace('opacity-100', 'opacity-0');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 5000);
}
