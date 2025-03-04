'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Music2,
  Plus,
  MoreHorizontal,
  PlayCircle,
  Download,
  LineChart,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample data for tracks
const tracks = [
  {
    id: '1',
    title: 'Summer Breeze',
    plays: 1245,
    releaseDate: '2023-05-15',
    duration: '3:45',
    coverUrl: '/placeholder.jpg',
  },
  {
    id: '2',
    title: 'Night Sky',
    plays: 892,
    releaseDate: '2023-04-02',
    duration: '4:12',
    coverUrl: '/placeholder.jpg',
  },
  {
    id: '3',
    title: 'Urban Dreams',
    plays: 2156,
    releaseDate: '2023-03-10',
    duration: '3:58',
    coverUrl: '/placeholder.jpg',
  },
  {
    id: '4',
    title: 'Heartbeat',
    plays: 654,
    releaseDate: '2023-02-28',
    duration: '4:30',
    coverUrl: '/placeholder.jpg',
  },
];

export default function ArtistMusicPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTracks = tracks.filter((track) =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Music</h1>
        <Button asChild>
          <Link href="/dashboard/artist/music/upload">
            <Plus className="mr-2 h-4 w-4" /> Upload New Track
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search your tracks..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">
            All Tracks ({filteredTracks.length})
          </h2>
        </div>

        <div className="hidden md:grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
          <div className="col-span-5">Track</div>
          <div className="col-span-2 text-center">Duration</div>
          <div className="col-span-2 text-center">Plays</div>
          <div className="col-span-2 text-center">Release Date</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => (
              <div
                key={track.id}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                <div className="col-span-12 md:col-span-5 flex items-center space-x-3">
                  <div className="h-12 w-12 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Music2 className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 md:hidden">
                      {track.plays} plays • {track.duration}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:col-span-2 text-center">
                  {track.duration}
                </div>
                <div className="hidden md:block md:col-span-2 text-center">
                  {track.plays}
                </div>
                <div className="hidden md:block md:col-span-2 text-center">
                  {track.releaseDate}
                </div>
                <div className="col-span-12 md:col-span-1 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        <span>Preview</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LineChart className="mr-2 h-4 w-4" />
                        <span>Analytics</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No tracks found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
