import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function EventsSection() {
  const events = [
    {
      id: '1',
      title: 'African Legends Festival',
      description:
        'Experience the ultimate celebration of African music featuring performances from legendary artists across the continent.',
      date: '2023-12-15',
      time: '18:00',
      location: 'Addis Ababa, Ethiopia',
      price: '$120',
      image:
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Djembe Workshop with Master Drummers',
      description:
        'Learn traditional West African drumming techniques from master drummers in this immersive workshop experience.',
      date: '2023-12-05',
      time: '14:00',
      location: 'Lagos, Nigeria',
      price: '$50',
      image:
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
    },
    {
      id: '3',
      title: 'Afro-Tech Fusion Night',
      description:
        'A night of innovative music that blends traditional African sounds with modern electronic music.',
      date: '2023-11-28',
      time: '20:00',
      location: 'Cape Town, South Africa',
      price: '$85',
      image:
        'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Upcoming Events</h2>
        <Link
          href="/marketplace?category=tickets"
          className="flex items-center text-pink-600 hover:text-pink-700 font-medium transition-colors"
        >
          <span>View All Events</span>
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-bold">
                {event.price}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-amber-600" />
                  <span>
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-amber-600" />
                  <span>{formatTime(event.time)}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button className="bg-gradient-to-r from-amber-500 to-pink-600 text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
                  Buy Tickets
                </button>
                <button className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
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
