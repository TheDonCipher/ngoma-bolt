import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash,
  Video,
  Filter,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  type: 'live' | 'virtual' | 'hybrid';
  date: Date;
  time?: string;
  location: string;
  description: string;
  image?: string;
  ticketPrice?: number;
  ticketUrl?: string;
  attendees: number;
  maxCapacity?: number;
  status: 'upcoming' | 'past' | 'cancelled';
}

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Album Release Party',
    type: 'hybrid',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    time: '7:00 PM',
    location: 'The Grand Hall, Nairobi',
    description:
      'Join us for an exclusive album release party with live performances and special guests.',
    image:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ticketPrice: 25,
    ticketUrl: 'https://example.com/tickets/1',
    attendees: 42,
    maxCapacity: 100,
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Live Stream Concert',
    type: 'virtual',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    time: '8:00 PM',
    location: 'Online Stream',
    description: 'An intimate acoustic set streamed live to your home.',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ticketPrice: 15,
    ticketUrl: 'https://example.com/tickets/2',
    attendees: 156,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Summer Music Festival',
    type: 'live',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    time: '2:00 PM',
    location: 'Liberty Gardens, Accra',
    description: 'A day-long celebration of music featuring multiple artists.',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ticketPrice: 45,
    ticketUrl: 'https://example.com/tickets/3',
    attendees: 78,
    maxCapacity: 500,
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Jazz Night',
    type: 'live',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    time: '9:00 PM',
    location: 'Blue Note Club, Lagos',
    description: 'A night of smooth jazz and soul music.',
    image:
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ticketPrice: 30,
    attendees: 87,
    maxCapacity: 120,
    status: 'past',
  },
  {
    id: '5',
    title: 'Music Workshop',
    type: 'hybrid',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    time: '10:00 AM',
    location: 'Community Center & Online',
    description: 'Learn about music production and songwriting techniques.',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ticketPrice: 20,
    attendees: 45,
    status: 'past',
  },
  {
    id: '6',
    title: 'Unplugged Tour',
    type: 'live',
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    time: 'Various',
    location: 'Various Venues',
    description: 'A cancelled tour due to unforeseen circumstances.',
    ticketPrice: 35,
    attendees: 0,
    status: 'cancelled',
  },
];

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [activeTab, setActiveTab] = useState<
    'upcoming' | 'past' | 'cancelled' | 'all'
  >('upcoming');
  const [isCreating, setIsCreating] = useState(false);

  const filteredEvents =
    activeTab === 'all'
      ? events
      : events.filter((event) => event.status === activeTab);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getEventTypeIcon = (type: 'live' | 'virtual' | 'hybrid') => {
    switch (type) {
      case 'live':
        return <MapPin className="h-4 w-4" />;
      case 'virtual':
        return <Video className="h-4 w-4" />;
      case 'hybrid':
        return <Users className="h-4 w-4" />;
    }
  };

  const getEventTypeLabel = (type: 'live' | 'virtual' | 'hybrid') => {
    switch (type) {
      case 'live':
        return 'In-Person';
      case 'virtual':
        return 'Virtual';
      case 'hybrid':
        return 'Hybrid';
    }
  };

  const getStatusColor = (status: 'upcoming' | 'past' | 'cancelled') => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'past':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Upcoming Events
              </h3>
              <p className="text-2xl font-bold">
                {events.filter((e) => e.status === 'upcoming').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
              <User className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Attendees
              </h3>
              <p className="text-2xl font-bold">
                {events.reduce((sum, event) => sum + event.attendees, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Past Events
              </h3>
              <p className="text-2xl font-bold">
                {events.filter((e) => e.status === 'past').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Events</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your performances and appearances
          </p>
        </div>

        <div className="flex space-x-2">
          <div className="flex items-center bg-white dark:bg-gray-800 border rounded-md p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={cn(
                'px-3 py-1 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700',
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              )}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={cn(
                'px-3 py-1 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700',
                activeTab === 'upcoming'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              )}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={cn(
                'px-3 py-1 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700',
                activeTab === 'past'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              )}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={cn(
                'px-3 py-1 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700',
                activeTab === 'cancelled'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              )}
            >
              Cancelled
            </button>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </button>
        </div>
      </div>

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* Event image */}
            <div className="relative h-48">
              <img
                src={
                  event.image ||
                  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&w=300&q=80'
                }
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'upcoming'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300'
                    : event.status === 'past'
                      ? 'bg-gray-100 text-gray-800 dark:bg-gray-700/70 dark:text-gray-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-300'
                }`}
              >
                {event.status === 'upcoming'
                  ? 'Upcoming'
                  : event.status === 'past'
                    ? 'Past'
                    : 'Cancelled'}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 right-4 space-x-2">
                  <button className="bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Event content */}
            <div className="p-5">
              <h3 className="font-bold text-lg line-clamp-1">{event.title}</h3>

              <div className="flex items-center my-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{formatDate(event.date)}</span>
                <Clock className="h-4 w-4 mx-1 flex-shrink-0" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center mb-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                {event.description}
              </p>

              {event.status === 'upcoming' && (
                <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{event.attendees} attendees registered</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredEvents.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow">
          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No events found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {activeTab === 'all'
              ? "You haven't created any events yet."
              : activeTab === 'upcoming'
                ? "You don't have any upcoming events."
                : "You don't have any past events."}
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto hover:bg-amber-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" /> Create your first event
          </button>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
