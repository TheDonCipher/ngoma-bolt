'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  ChevronRight,
  Music2,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Clock,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import the types we created
import {
  PeriodType,
  StatsData,
  ColorSchemes,
  StatsCardProps,
  ActionCardProps,
} from '@/types/dashboard';

// Move colorSchemes outside the component
const colorSchemes: ColorSchemes = {
  indigo: {
    bg: 'bg-indigo-100 dark:bg-indigo-900/20',
    text: 'text-indigo-600 dark:text-indigo-400',
  },
  emerald: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/20',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-900/20',
    text: 'text-amber-600 dark:text-amber-400',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
  },
};

export default function ArtistPage() {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Simulated analytics data
  const analyticsData: StatsData = {
    week: {
      plays: 1234,
      playsTrend: 'up',
      playsPercent: 12,
      followers: 57,
      followersTrend: 'up',
      followersPercent: 8,
      revenue: 284,
      revenueTrend: 'up',
      revenuePercent: 15,
      events: 3,
      eventsTrend: 'down',
      eventsPercent: 25,
    },
    month: {
      plays: 5467,
      playsTrend: 'up',
      playsPercent: 23,
      followers: 245,
      followersTrend: 'up',
      followersPercent: 18,
      revenue: 1250,
      revenueTrend: 'up',
      revenuePercent: 32,
      events: 12,
      eventsTrend: 'up',
      eventsPercent: 50,
    },
    year: {
      plays: 54329,
      playsTrend: 'up',
      playsPercent: 104,
      followers: 2845,
      followersTrend: 'up',
      followersPercent: 87,
      revenue: 12425,
      revenueTrend: 'up',
      revenuePercent: 112,
      events: 48,
      eventsTrend: 'up',
      eventsPercent: 140,
    },
  };

  const currentData = analyticsData[selectedTimeframe as PeriodType];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Artist Dashboard</h1>
        <Tabs
          value={selectedTimeframe}
          onValueChange={setSelectedTimeframe}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Track Plays"
          value={currentData.plays.toLocaleString()}
          trend={currentData.playsTrend}
          percent={currentData.playsPercent}
          icon={<Music2 className="h-5 w-5" />}
          iconColor="indigo"
        />
        <StatCard
          title="New Followers"
          value={currentData.followers.toLocaleString()}
          trend={currentData.followersTrend}
          percent={currentData.followersPercent}
          icon={<Users className="h-5 w-5" />}
          iconColor="purple"
        />
        <StatCard
          title="Revenue"
          value={`$${currentData.revenue.toLocaleString()}`}
          trend={currentData.revenueTrend}
          percent={currentData.revenuePercent}
          icon={<BarChart3 className="h-5 w-5" />}
          iconColor="emerald"
        />
        <StatCard
          title="Events"
          value={currentData.events.toString()}
          trend={currentData.eventsTrend}
          percent={currentData.eventsPercent}
          icon={<Calendar className="h-5 w-5" />}
          iconColor="amber"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">
              Performance Overview
            </CardTitle>
            <Button variant="ghost" size="sm">
              View details
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
              <TrendingUp className="h-16 w-16 text-slate-300 dark:text-slate-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6">
              <div className="divide-y dark:divide-gray-800">
                {[
                  {
                    title: 'Summer Music Festival',
                    date: 'July 15',
                    location: 'Central Park, NY',
                  },
                  {
                    title: 'Album Release Party',
                    date: 'August 3',
                    location: 'The Blue Room, LA',
                  },
                  {
                    title: 'Live Radio Interview',
                    date: 'August 10',
                    location: 'KEXP Studio',
                  },
                ].map((event, i) => (
                  <div key={i} className="py-3">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <span>{event.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t dark:border-gray-800 p-3 mt-2">
              <Button
                variant="ghost"
                className="w-full justify-center"
                size="sm"
              >
                View All Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="Upload Music"
            href="/dashboard/artist/music/upload"
            icon={<Music2 className="h-5 w-5" />}
            color="indigo"
          />
          <QuickActionCard
            title="Create Event"
            href="/dashboard/artist/events/create"
            icon={<Calendar className="h-5 w-5" />}
            color="emerald"
          />
          <QuickActionCard
            title="Add Merchandise"
            href="/dashboard/artist/merchandise/create"
            icon={<ShoppingBag className="h-5 w-5" />}
            color="amber"
          />
          <QuickActionCard
            title="View Analytics"
            href="/dashboard/artist/analytics/overview"
            icon={<BarChart3 className="h-5 w-5" />}
            color="blue"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  type: 'play',
                  text: 'Your track "Summer Vibes" was played 24 times',
                  time: '2h ago',
                },
                {
                  type: 'follow',
                  text: 'You gained 5 new followers',
                  time: '5h ago',
                },
                {
                  type: 'sale',
                  text: 'Someone purchased your "Limited Edition Hoodie"',
                  time: '1d ago',
                },
                {
                  type: 'event',
                  text: "12 people RSVP'd to your upcoming event",
                  time: '2d ago',
                },
                {
                  type: 'engagement',
                  text: 'A fan commented on your latest release',
                  time: '3d ago',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ActivityIcon type={activity.type} />
                      <div>
                        <p className="font-medium">{activity.text}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  percent,
  icon,
  iconColor,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-full ${colorSchemes[iconColor].bg}`}>
            <div className={colorSchemes[iconColor].text}>{icon}</div>
          </div>
          <div
            className={`flex items-center ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}
          >
            {trend === 'up' ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm font-medium">{percent}%</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({ title, href, icon, color }: ActionCardProps) {
  return (
    <Link href={href}>
      <div
        className={`${colorSchemes[color].bg} p-4 rounded-lg flex items-center justify-between h-full transition-colors`}
      >
        <div className="flex items-center">
          <span className={`mr-3 ${colorSchemes[color].text}`}>{icon}</span>
          <span className="font-medium">{title}</span>
        </div>
        <ChevronRight className={`h-4 w-4 ${colorSchemes[color].text}`} />
      </div>
    </Link>
  );
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case 'play':
      return (
        <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <Music2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
      );
    case 'follow':
      return (
        <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
      );
    case 'sale':
      return (
        <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <ShoppingBag className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
      );
    case 'event':
      return (
        <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
      );
    default:
      return (
        <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      );
  }
}
