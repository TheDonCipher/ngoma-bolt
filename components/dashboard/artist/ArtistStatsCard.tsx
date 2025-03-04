import React from 'react';
import {
  ArrowUp,
  ArrowDown,
  Disc,
  Users,
  CreditCard,
  TrendingUp,
} from 'lucide-react';

const ArtistStatsCard = () => {
  // Mock data
  const stats = [
    {
      title: 'Total Plays',
      value: '24.3K',
      change: '+12.5%',
      positive: true,
      icon: <Disc className="h-5 w-5" />,
      color:
        'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    },
    {
      title: 'New Listeners',
      value: '1,238',
      change: '+18.2%',
      positive: true,
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    },
    {
      title: 'Revenue',
      value: '0.86 ETH',
      change: '-2.4%',
      positive: false,
      icon: <CreditCard className="h-5 w-5" />,
      color:
        'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    },
    {
      title: 'Engagement',
      value: '32.5%',
      change: '+4.1%',
      positive: true,
      icon: <TrendingUp className="h-5 w-5" />,
      color:
        'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <div className={`p-2 rounded-md ${stat.color}`}>{stat.icon}</div>
              <span
                className={`text-xs font-medium flex items-center ${stat.positive ? 'text-green-600' : 'text-red-600'}`}
              >
                {stat.positive ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="text-right mt-2">
        <a
          href="/dashboard/artist/analytics"
          className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
        >
          View detailed analytics
        </a>
      </div>
    </div>
  );
};

export default ArtistStatsCard;
