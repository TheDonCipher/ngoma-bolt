import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Link,
  Plus,
  Edit,
  Trash,
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  ticketUrl: string;
  capacity: string;
  status: 'upcoming' | 'past' | 'cancelled';
  image?: string; // Make image optional
}

const EventManagement = () => {
  // Mock data for events
  const initialEvents: Event[] = [
    {
      id: 1,
      title: 'Summer Vibes Tour',
      date: '2023-07-15',
      time: '19:00',
      location: 'New York, NY',
      venue: 'Madison Square Garden',
      description: 'Join us for a night of soulful music and good vibes.',
      ticketUrl: 'https://tickets.example.com/summer-vibes',
      capacity: '5,000',
      status: 'past',
      image:
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      title: 'Winter Wonderland Festival',
      date: '2023-12-18',
      time: '20:00',
      location: 'Los Angeles, CA',
      venue: 'Hollywood Bowl',
      description: 'A magical evening of music under the stars.',
      ticketUrl: 'https://tickets.example.com/winter-wonderland',
      capacity: '8,000',
      status: 'upcoming',
      image:
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 3,
      title: 'Jazz & Soul Night',
      date: '2024-02-28',
      time: '21:00',
      location: 'Chicago, IL',
      venue: 'House of Blues',
      description: 'An intimate evening featuring soulful jazz and R&B.',
      ticketUrl: 'https://tickets.example.com/jazz-soul',
      capacity: '1,200',
      status: 'upcoming',
      image:
        'https://images.unsplash.com/photo-1483393458019-411bc6bd104e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
  ];

  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    venue: '',
    description: '',
    ticketUrl: '',
    capacity: '',
    status: 'upcoming',
    image: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEventForm({
      ...eventForm,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentEvent) {
      // Update existing event
      setEvents(
        events.map((event) =>
          event.id === currentEvent.id
            ? { ...eventForm, id: currentEvent.id }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent = {
        ...eventForm,
        id: Math.max(0, ...events.map((e) => e.id)) + 1,
      };
      setEvents([...events, newEvent]);
    }

    // Reset form
    setShowForm(false);
    setCurrentEvent(null);
    setEventForm({
      title: '',
      date: '',
      time: '',
      location: '',
      venue: '',
      description: '',
      ticketUrl: '',
      capacity: '',
      status: 'upcoming',
      image: '',
    });
  };

  const editEvent = (event: Event) => {
    setCurrentEvent(event);
    setEventForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      venue: event.venue,
      description: event.description,
      ticketUrl: event.ticketUrl,
      capacity: event.capacity,
      status: event.status,
      image: event.image || '',
    });
    setShowForm(true);
  };

  const deleteEvent = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  // Group events by status
  const upcomingEvents = events.filter((event) => event.status === 'upcoming');
  const pastEvents = events.filter((event) => event.status === 'past');

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <button
          onClick={() => {
            setCurrentEvent(null);
            setShowForm(true);
          }}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Event
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">
            {currentEvent ? 'Edit Event' : 'Create New Event'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={eventForm.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Event title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={eventForm.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={eventForm.date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                    required
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    value={eventForm.time}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                    required
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={eventForm.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                    placeholder="City, State"
                    required
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={eventForm.venue}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Venue name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={eventForm.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border rounded-md"
                placeholder="Event description"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Ticket URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="ticketUrl"
                    value={eventForm.ticketUrl}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                    placeholder="https://example.com/tickets"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <Link className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Capacity
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="capacity"
                    value={eventForm.capacity}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                    placeholder="Number of attendees"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={eventForm.image}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {currentEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming Events */}
      <div>
        <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No upcoming events scheduled.
          </p>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">
                      {event.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(event.date)} at {event.time}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {event.description}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => editEvent(event)}
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="flex items-center text-red-600 hover:text-red-800"
                    >
                      <Trash className="h-4 w-4 mr-1" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
