import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  Music,
  Upload,
  Users,
  Plus,
  PlayCircle,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

// Type definitions
type StatCard = {
  title: string;
  value: string | number | React.ReactNode;
  trend?: string;
  icon: React.ReactNode;
};

// Data arrays
const statCards: StatCard[] = [
  {
    title: 'Total Streams',
    value: '127,532',
    trend: '+12.4%',
    icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
  },
  {
    title: 'Monthly Listeners',
    value: '4,827',
    trend: '+8.7%',
    icon: <Users className="h-5 w-5 text-green-600" />,
  },
  {
    title: 'Track Count',
    value: 32,
    icon: <Music className="h-5 w-5 text-purple-600" />,
  },
  {
    title: 'View Profile',
    value: <p>View your public profile</p>,
    icon: <Users className="h-5 w-5 text-blue-600" />,
  },
];

export default function ArtistDashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="px-2 md:px-4 py-4">
        {/* Header section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Artist Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome back! Here's an overview of your music performance.
          </p>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="catalog">Catalog</TabsTrigger>
            <TabsTrigger value="fans">Fans</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {statCards.map((stat, i) => (
                <Link key={i} href="/artist/123"> {/* Replace 123 with the actual artist ID */}
                  <Card
                    className="border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md"
                  >
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          {stat.title}
                        </p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        {stat.trend && (
                          <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> {stat.trend}
                          </p>
                        )}
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full">
                        {stat.icon}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Recent Tracks */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Tracks</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  asChild
                >
                  <Link href="/dashboard/artist/upload">
                    <Plus className="h-4 w-4" /> Add Track
                  </Link>
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Your Music</CardTitle>
                      <CardDescription>
                        Manage and monitor your music catalog
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                    <PlayCircle className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p className="mb-4">Your tracks will appear here</p>
                    <Button asChild>
                      <Link href="/dashboard/artist/upload">
                        Upload your first track
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* Other tab content stays the same */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  View detailed performance metrics for your music
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Analytics dashboard is coming soon!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalog">
            <Card>
              <CardHeader>
                <CardTitle>Music Catalog</CardTitle>
                <CardDescription>Manage your tracks and albums</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Music className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Your full catalog will appear here
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/dashboard/artist/upload">Upload New Track</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="fans">
            <Card>
              <CardHeader>
                <CardTitle>Fan Engagement</CardTitle>
                <CardDescription>Connect with your audience</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Fan engagement tools are coming soon!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
