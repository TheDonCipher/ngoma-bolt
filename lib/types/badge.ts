export type BadgeType = 'COLLECTOR' | 'LISTENER' | 'SPECIAL';

export const BADGE_THRESHOLDS = {
  COLLECTOR: [1, 5, 10, 50, 100],
  LISTENER: [10, 50, 100, 500, 1000],
  SPECIAL: [1, 3, 5],
};

export interface BadgeProgress {
  type: BadgeType;
  count: number;
  level: number;
  nextThreshold: number;
}
