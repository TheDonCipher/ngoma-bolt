import { useState, useEffect } from 'react';
import { ProductCard } from './product-card';
import { motion } from 'framer-motion';

interface ProductGridProps {
  category: string;
  searchTerm: string;
}

export function ProductGrid({ category, searchTerm }: ProductGridProps) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // This would normally be an API call to fetch products
    // Mock data for demonstration
    const mockProducts = [
      {
        id: '1',
        title: 'Ancestral Rhythms',
        type: 'albums',
        artist: 'Fela Soul',
        price: '2.5',
        image:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop',
        isFeatured: true,
      },
      {
        id: '2',
        title: 'Desert Echoes',
        type: 'albums',
        artist: 'Sahara Collective',
        price: '1.8',
        image:
          'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop',
      },
      {
        id: '3',
        title: 'Midnight Drums',
        type: 'tracks',
        artist: 'Rhythm Masters',
        price: '0.5',
        image:
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop',
      },
      {
        id: '4',
        title: 'Kente Pattern Hoodie',
        type: 'merch',
        artist: 'Afro Threads',
        price: '75',
        currency: 'USD',
        image:
          'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800&auto=format&fit=crop',
      },
      {
        id: '5',
        title: 'Festival of Lights 2023',
        type: 'tickets',
        artist: 'Various Artists',
        price: '120',
        currency: 'USD',
        date: '2023-12-15',
        image:
          'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop',
      },
      {
        id: '6',
        title: 'Jungle Beats',
        type: 'tracks',
        artist: 'Forest Sound',
        price: '0.4',
        image:
          'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop',
      },
      {
        id: '7',
        title: 'African Legends Tour',
        type: 'tickets',
        artist: 'Multiple Artists',
        price: '85',
        currency: 'USD',
        date: '2023-11-20',
        image:
          'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop',
      },
      {
        id: '8',
        title: 'Adinkra Symbol Tee',
        type: 'merch',
        artist: 'Culture Wear',
        price: '35',
        currency: 'USD',
        image:
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop',
      },
      {
        id: '9',
        title: 'Village Tales',
        type: 'albums',
        artist: 'Storytellers',
        price: '1.2',
        image:
          'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop',
      },
      {
        id: '10',
        title: 'Tribal Fusion',
        type: 'albums',
        artist: 'Neo Africa',
        price: '3.0',
        image:
          'https://images.unsplash.com/photo-1504509546545-e000b4a62425?w=800&auto=format&fit=crop',
        isFeatured: true,
      },
      {
        id: '11',
        title: 'Sunset Melodies',
        type: 'tracks',
        artist: 'Solar Sounds',
        price: '0.6',
        image:
          'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop',
      },
      {
        id: '12',
        title: 'Djembe Workshop',
        type: 'tickets',
        artist: 'Master Drummers',
        price: '50',
        currency: 'USD',
        date: '2023-12-05',
        image:
          'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
      },
    ];

    // Filter products based on category and search term
    let filteredProducts = mockProducts;

    if (category !== 'all') {
      filteredProducts = filteredProducts.filter((p) => p.type === category);
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.artist.toLowerCase().includes(search)
      );
    }

    setProducts(filteredProducts);
  }, [category, searchTerm]);

  // Separate products by type for better layout if not filtering
  const albumProducts = products.filter((p) => p.type === 'albums');
  const trackProducts = products.filter((p) => p.type === 'tracks');
  const merchProducts = products.filter((p) => p.type === 'merch');
  const ticketProducts = products.filter((p) => p.type === 'tickets');

  // If filtering by category or search, show regular grid
  const isFiltering = category !== 'all' || searchTerm !== '';

  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium">No items found</h3>
          <p className="text-gray-500 mt-2">
            Try changing your filters or search term
          </p>
        </div>
      ) : isFiltering ? (
        // Regular grid for filtered results
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        // Categorized sections when showing all products
        <div className="space-y-12">
          {/* Album Section */}
          {albumProducts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="bg-amber-100 p-1 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                </span>
                Album NFTs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {albumProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tracks Section */}
          {trackProducts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="bg-purple-100 p-1 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Track NFTs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trackProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Merchandise Section */}
          {merchProducts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="bg-pink-100 p-1 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-pink-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Merchandise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {merchProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tickets Section */}
          {ticketProducts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="bg-blue-100 p-1 rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                  </svg>
                </span>
                Event Tickets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ticketProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
