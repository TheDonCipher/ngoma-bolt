// Period types
export type PeriodType = 'week' | 'month' | 'year';

// Stats data structure
export interface StatsData {
  week: PeriodStats;
  month: PeriodStats;
  year: PeriodStats;
  [key: string]: PeriodStats; // Index signature for string access
}

export interface PeriodStats {
  plays: number;
  playsTrend: string;
  playsPercent: number;
  followers: number;
  followersTrend: string;
  followersPercent: number;
  revenue: number;
  revenueTrend: string;
  revenuePercent: number;
  events: number;
  eventsTrend: string;
  eventsPercent: number;
}

// Colors for UI elements
export interface ColorScheme {
  bg: string;
  text: string;
}

export interface ColorSchemes {
  indigo: ColorScheme;
  emerald: ColorScheme;
  amber: ColorScheme;
  purple: ColorScheme;
  blue: ColorScheme;
  [key: string]: ColorScheme; // Index signature for dynamic access
}

// Stats card props
export interface StatsCardProps {
  title: string;
  value: number | string;
  trend: string;
  percent: number;
  icon: React.ReactNode;
  iconColor: string;
}

// Action card props
export interface ActionCardProps {
  title: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}
