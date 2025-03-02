import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data for analytics
  const listenerData = [
    { name: 'Jan', listeners: 4000, newListeners: 2400 },
    { name: 'Feb', listeners: 3000, newListeners: 1398 },
    { name: 'Mar', listeners: 2000, newListeners: 9800 },
    { name: 'Apr', listeners: 2780, newListeners: 3908 },
    { name: 'May', listeners: 1890, newListeners: 4800 },
    { name: 'Jun', listeners: 2390, newListeners: 3800 },
    { name: 'Jul', listeners: 3490, newListeners: 4300 },
  ];

  const trackPlayData = [
    { name: 'Midnight Dreams', plays: 12500 },
    { name: 'Stardust', plays: 8300 },
    { name: 'Cosmic Love', plays: 7200 },
    { name: 'Morning Light', plays: 6500 },
    { name: 'Silver Lining', plays: 5400 },
  ];

  const geographicData = [
    { name: 'USA', value: 45 },
    { name: 'UK', value: 15 },
    { name: 'Canada', value: 10 },
    { name: 'Germany', value: 8 },
    { name: 'France', value: 7 },
    { name: 'Other', value: 15 },
  ];

  const streamingPlatformData = [
    { name: 'Spotify', value: 52 },
    { name: 'Apple Music', value: 28 },
    { name: 'YouTube', value: 12 },
    { name: 'Other', value: 8 },
  ];

  const COLORS = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#0088fe',
    '#00c49f',
    '#ff8042',
    '#FFBB28',
  ];

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white dark:bg-gray-800 border rounded-md p-1">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === '7d'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === '30d'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              30D
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === '90d'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              90D
            </button>
            <button
              onClick={() => setTimeRange('1y')}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === '1y'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              1Y
            </button>
          </div>
          <button className="flex items-center gap-1 bg-white dark:bg-gray-800 border rounded-md px-3 py-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Custom</span>
          </button>
          <button className="flex items-center gap-1 bg-white dark:bg-gray-800 border rounded-md px-3 py-2 text-sm">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-1 bg-white dark:bg-gray-800 border rounded-md px-3 py-2 text-sm">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Audience Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
        <h3 className="text-lg font-bold mb-4">Audience Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={listenerData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="listeners"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="newListeners"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two column layout for charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Tracks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <h3 className="text-lg font-bold mb-4">Top Tracks</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trackPlayData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="plays" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Listeners by Location */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <h3 className="text-lg font-bold mb-4">Listeners by Location</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={geographicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {geographicData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Streaming Platform Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <h3 className="text-lg font-bold mb-4">
            Streaming Platform Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={streamingPlatformData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {streamingPlatformData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
          <h3 className="text-lg font-bold mb-4">Growth Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={listenerData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="listeners"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="newListeners" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
