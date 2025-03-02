import React from 'react';
import {
  Music,
  Users,
  PlayCircle,
  TrendingUp,
  DollarSign,
  Calendar,
} from 'lucide-react';

const ArtistStatsCard = () => {
  const stats = [
    {
      title: 'Monthly Listeners',
      value: '12.5K',
      change: '+22%',
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      positive: true,
    },
    {
      title: 'Track Plays',
      value: '157K',
      change: '+18%',
      icon: <PlayCircle className="h-8 w-8 text-emerald-500" />,
      positive: true,
    },
    {
      title: 'Revenue',
      value: '$3,285',
      change: '+15%',
      icon: <DollarSign className="h-8 w-8 text-amber-500" />,
      positive: true,
    },
    {
      title: 'New Releases',
      value: '2',
      change: 'this month',
      icon: <Music className="h-8 w-8 text-purple-500" />,
      neutral: true,
    },
    {
      title: 'Upcoming Events',
      value: '3',
      change: 'scheduled',
      icon: <Calendar className="h-8 w-8 text-rose-500" />,
      neutral: true,
    },
    {
      title: 'Profile Views',
      value: '5.2K',
      change: '+8%',
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      positive: true,
    },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {/* ...Header with title and timeframe selector... */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-md bg-white dark:bg-gray-600 shadow-sm">
                {stat.icon}
              </div>
              <div
                className={`text-sm font-semibold ${stat.positive ? 'text-green-500' : stat.neutral ? 'text-gray-500' : 'text-red-500'}`}
              >
                {stat.change}
              </div>
            </div>
            <div className="text-lg font-bold">{stat.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {stat.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistStatsCard;
