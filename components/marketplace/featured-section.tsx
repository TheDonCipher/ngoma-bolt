import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FeaturedSection() {
  const featuredItems = [
    {
      id: '1',
      title: 'Tribal Fusion Collection',
      artist: 'Neo Africa',
      description:
        'Limited edition NFT collection featuring 10 unique digital artworks inspired by traditional African patterns with modern music elements.',
      price: '5.5 ETH',
      endTime: '2023-12-31',
      image:
        'https://images.unsplash.com/photo-1504509546545-e000b4a62425?w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Ancestral Rhythms Bundle',
      artist: 'Fela Soul',
      description:
        'This exclusive bundle includes the complete Ancestral Rhythms album NFT with 3 bonus tracks and a virtual meet-and-greet with the artist.',
      price: '3.2 ETH',
      endTime: '2023-11-25',
      image:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Featured Collections</h2>
        <Link
          href="/marketplace"
          className="flex items-center text-pink-600 hover:text-pink-700 font-medium transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative rounded-2xl overflow-hidden bg-white/30 backdrop-blur-sm border border-white/20 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 relative h-56 md:h-auto">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">By {item.artist}</p>
                  <p className="text-gray-700 my-4">{item.description}</p>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Current price</p>
                      <p className="text-xl font-bold text-amber-600">
                        {item.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ending in</p>
                      <p className="text-amber-600 font-medium">
                        {getRemainingTime(item.endTime)}
                      </p>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-pink-600 text-white font-medium rounded-full hover:opacity-90 transition-opacity">
                    View Collection
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function getRemainingTime(endTime: string): string {
  const end = new Date(endTime).getTime();
  const now = new Date().getTime();
  const distance = end - now;

  // If the date has passed
  if (distance < 0) {
    return 'Ended';
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return `${days}d ${hours}h`;
}
