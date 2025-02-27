'use client';

import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export function UpcomingEvents() {
  const events: Event[] = [
    {
      id: '1',
      title: 'Afrobeats Global Festival',
      date: '2023-12-15',
      time: '18:00',
      location: 'Lagos, Nigeria',
    },
    {
      id: '2',
      title: 'Rhythm & Vibes Tour',
      date: '2023-11-25',
      time: '20:00',
      location: 'Accra, Ghana',
    },
    {
      id: '3',
      title: 'Sounds of Africa Concert',
      date: '2023-12-02',
      time: '19:30',
      location: 'Nairobi, Kenya',
    },
  ];

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md p-5">
      <h2 className="text-xl font-bold mb-4 text-purple-800">
        Upcoming Events
      </h2>

      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-purple-100 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -2 }}
          >
            <h3 className="font-bold text-gray-900">{event.title}</h3>

            <div className="mt-2 space-y-1.5">
              <div className="flex items-center text-sm text-gray-700">
                <Calendar className="w-3.5 h-3.5 mr-2 text-purple-700" />
                <span>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <Clock className="w-3.5 h-3.5 mr-2 text-purple-700" />
                <span>{formatTime(event.time)}</span>
              </div>

              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="w-3.5 h-3.5 mr-2 text-purple-700" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="mt-3 text-right">
              <Link href={`/events/${event.id}`}>
                <button className="text-sm font-medium text-purple-700 hover:text-purple-900 transition-colors flex items-center justify-end gap-1">
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/events">
          <button className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all">
            View All Events
          </button>
        </Link>
      </div>
    </div>
  );
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}
