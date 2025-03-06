'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MapPin,
  Plus,
  Users,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// Sample events data
const upcomingEvents = [
  {
    id: '1',
    title: 'Summer Festival 2023',
    date: '2023-07-15',
    time: '18:00',
    venue: 'Central Park',
    location: 'Durban, South Africa',
    attendees: 145,
    imageUrl:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&auto=format&fit=crop&q=60',
    status: 'upcoming' as const,
  },
  {
    id: '2',
    title: 'Club Performance',
    date: '2023-08-02',
    time: '21:00',
    venue: 'The Blue Note',
    location: 'Palapye, Botswana',
    attendees: 75,
    imageUrl:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=60',
    status: 'upcoming' as const,
  },
  {
    id: '3',
    title: 'Album Release Party',
    date: '2023-09-10',
    time: '20:00',
    venue: 'Studio 54',
    location: 'Gaborone, Botswana',
    attendees: 210,
    imageUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&auto=format&fit=crop&q=60',
    status: 'upcoming' as const,
  },
];

const pastEvents = [
  {
    id: '4',
    title: 'Winter Concert Series',
    date: '2023-02-20',
    time: '19:00',
    venue: 'Symphony Hall',
    location: 'Cape Town, South Africa',
    attendees: 320,
    imageUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60',
    status: 'past' as const,
  },
  {
    id: '5',
    title: 'College Tour',
    date: '2023-03-15',
    time: '16:00',
    venue: 'University Auditorium',
    location: 'Luanda, Angola',
    attendees: 185,
    imageUrl:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60',
    status: 'past' as const,
  },
];

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Define an interface for the event object
interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  venue: string;
  location: string;
  imageUrl: string;
  attendees: number;
  status: 'upcoming' | 'past' | 'canceled';
  ticketsSold?: number;
  ticketsTotal?: number;
}

export default function ArtistEventsPage() {
  const [currentTab, setCurrentTab] = useState('upcoming');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button asChild>
          <Link href="/dashboard/artist/events/create">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" onValueChange={setCurrentTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">June 2023</span>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="upcoming">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Draft Events</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You don't have any events saved as drafts.
            </p>
            <Button asChild>
              <Link href="/dashboard/artist/events/create">
                <Plus className="mr-2 h-4 w-4" /> Create Event
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Add the type annotation to the EventCard component
function EventCard({ event }: { event: Event }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          {formatDate(event.date)} at {event.time}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover mb-4"
        />
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>
            {event.venue}, {event.location}
          </span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          <span>{event.attendees} attendees</span>
        </div>
      </CardContent>
      <CardFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
