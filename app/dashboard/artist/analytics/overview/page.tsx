'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  Users,
  Play,
  DollarSign,
  ChevronDown,
  Calendar,
  Share2,
  Download,
  Globe,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AnalyticsOverviewPage() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Analytics Overview</h1>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30d" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Plays"
          value="23,487"
          change="+12.3%"
          trend="up"
          icon={Play}
          description="vs previous period"
        />
        <StatsCard
          title="Unique Listeners"
          value="5,642"
          change="+7.8%"
          trend="up"
          icon={Users}
          description="vs previous period"
        />
        <StatsCard
          title="Revenue"
          value="$3,271.45"
          change="+23.1%"
          trend="up"
          icon={DollarSign}
          description="vs previous period"
        />
        <StatsCard
          title="Social Reach"
          value="17,891"
          change="-2.4%"
          trend="down"
          icon={Share2}
          description="vs previous period"
        />
      </div>

      <Tabs defaultValue="audience" className="mb-8">
        <TabsList>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="audience">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Audience Growth</CardTitle>
                <CardDescription>Monthly listeners over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80 bg-slate-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>Where your listeners are from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: 'United States', percent: 42, listeners: 2345 },
                    { country: 'United Kingdom', percent: 18, listeners: 982 },
                    { country: 'Nigeria', percent: 12, listeners: 632 },
                    { country: 'Canada', percent: 8, listeners: 447 },
                    { country: 'Germany', percent: 5, listeners: 274 },
                  ].map((location, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-slate-400" />
                        <span>{location.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{location.percent}%</div>
                        <div className="text-sm text-slate-500">
                          {location.listeners.toLocaleString()} listeners
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-sm text-slate-500 justify-center border-t pt-4">
                <Button variant="ghost" size="sm">
                  View all locations
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tracks">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Track Performance</CardTitle>
                <CardDescription>Track plays over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80 bg-slate-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Tracks</CardTitle>
                <CardDescription>Your most popular music</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Summer Vibes', plays: 8245 },
                    { title: 'Midnight Drive', plays: 6132 },
                    { title: 'Lost in Sound', plays: 3871 },
                    { title: 'Neon Lights', plays: 2543 },
                    { title: 'Urban Dreams', plays: 2187 },
                  ].map((track, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 text-center font-medium text-slate-400 mr-3">
                          {i + 1}
                        </div>
                        <span>{track.title}</span>
                      </div>
                      <div className="flex items-center text-slate-500">
                        <Play className="h-3 w-3 mr-1" />
                        {track.plays.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-sm text-slate-500 justify-center border-t pt-4">
                <Button variant="ghost" size="sm">
                  View all tracks
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Income sources and trends</CardDescription>
              </CardHeader>
              <CardContent className="h-80 bg-slate-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income Sources</CardTitle>
                <CardDescription>Revenue by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: 'Streaming', amount: 1842.72, percent: 56 },
                    { source: 'Merchandise', amount: 743.21, percent: 23 },
                    { source: 'Ticket Sales', amount: 487.34, percent: 15 },
                    { source: 'Licensing', amount: 198.18, percent: 6 },
                  ].map((source, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span>{source.source}</span>
                        <span className="font-medium">${source.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${source.percent}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-right text-slate-500">
                        {source.percent}% of total
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
                <CardDescription>
                  Fan interaction with your content
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 bg-slate-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your scheduled performances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: 'Summer Festival',
                      date: '2023-07-21',
                      location: 'New York, NY',
                      tickets: 245,
                    },
                    {
                      name: 'Club Performance',
                      date: '2023-08-05',
                      location: 'Los Angeles, CA',
                      tickets: 112,
                    },
                    {
                      name: 'Album Release',
                      date: '2023-08-15',
                      location: 'Chicago, IL',
                      tickets: 87,
                    },
                  ].map((event, i) => (
                    <div key={i} className="border rounded-md p-3">
                      <div className="font-medium">{event.name}</div>
                      <div className="text-sm text-slate-500 flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="text-sm text-slate-500 flex items-center mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        {event.tickets} tickets sold
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="text-sm text-slate-500 justify-center border-t pt-4">
                <Button variant="ghost" size="sm">
                  View all events
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Tips to improve your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30">
                <h4 className="font-medium text-green-700 dark:text-green-400 mb-1">
                  Upload frequency
                </h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Artists who upload new music at least once a month see 2x more
                  engagement.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30">
                <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-1">
                  Social promotion
                </h4>
                <p className="text-sm text-amber-600 dark:text-amber-300">
                  Your social share rate is below average. Consider sharing your
                  music more frequently.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30">
                <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">
                  Fan interaction
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Responding to comments within 24 hours increases follow rates
                  by 30%.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>What's happening with your music</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(
                [
                  {
                    type: 'play' as const,
                    user: 'New listener',
                    track: 'Summer Vibes',
                    time: '10 minutes ago',
                  },
                  {
                    type: 'follow' as const,
                    user: 'New fan',
                    track: null,
                    time: '1 hour ago',
                  },
                  {
                    type: 'purchase' as const,
                    user: 'Fan',
                    track: 'Midnight Drive',
                    time: '3 hours ago',
                  },
                  {
                    type: 'share' as const,
                    user: 'Influencer',
                    track: 'Lost in Sound',
                    time: '5 hours ago',
                  },
                  {
                    type: 'comment' as const,
                    user: 'Fan',
                    track: 'Urban Dreams',
                    time: 'Yesterday',
                  },
                ] as ActivityType[]
              ).map((activity, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    {activity.type === 'play' && <Play className="h-4 w-4" />}
                    {activity.type === 'follow' && (
                      <Users className="h-4 w-4" />
                    )}
                    {activity.type === 'purchase' && (
                      <DollarSign className="h-4 w-4" />
                    )}
                    {activity.type === 'share' && (
                      <Share2 className="h-4 w-4" />
                    )}
                    {activity.type === 'comment' && (
                      <Calendar className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {getActivityDescription(activity)}
                      {activity.track && (
                        <span className="font-medium"> "{activity.track}"</span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
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

// Define the props interface for StatsCard
interface StatsCardProps {
  title: string;
  value: string | number;
  change: string; // Changed from 'number' to 'string' to accept percentage strings
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  description: string;
}

function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  description,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center ${
              trend === 'up'
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              trend === 'up'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {change}
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// Define an ActivityType interface
interface ActivityType {
  type: 'play' | 'follow' | 'purchase' | 'share' | 'comment';
  user: string;
  track: string | null;
  time: string;
}

function getActivityDescription(activity: ActivityType) {
  switch (activity.type) {
    case 'play':
      return 'listened to';
    case 'follow':
      return 'started following you';
    case 'purchase':
      return 'purchased';
    case 'share':
      return 'shared';
    case 'comment':
      return 'commented on';
    default:
      return 'interacted with';
  }
}
