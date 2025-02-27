import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  HeartIcon,
  ShoppingCart,
  Calendar,
  Music,
  Play,
  ShoppingBag,
  Ticket,
} from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    type: string;
    artist: string;
    price: string;
    currency?: string;
    image: string;
    date?: string;
    isFeatured?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const isNFT = product.type === 'albums' || product.type === 'tracks';
  const isTicket = product.type === 'tickets';
  const isAlbum = product.type === 'albums';
  const isTrack = product.type === 'tracks';
  const isMerch = product.type === 'merch';

  // Style variations based on product type
  const getCardStyle = () => {
    switch (product.type) {
      case 'albums':
        return 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200';
      case 'tracks':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
      case 'merch':
        return 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200';
      case 'tickets':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
      default:
        return 'bg-white';
    }
  };

  const getTypeIcon = () => {
    switch (product.type) {
      case 'albums':
        return <Music className="w-3 h-3 mr-1" />;
      case 'tracks':
        return <Play className="w-3 h-3 mr-1" />;
      case 'merch':
        return <ShoppingBag className="w-3 h-3 mr-1" />;
      case 'tickets':
        return <Ticket className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  const getActionButtonStyle = () => {
    switch (product.type) {
      case 'albums':
        return 'from-amber-500 to-orange-600';
      case 'tracks':
        return 'from-purple-500 to-indigo-600';
      case 'merch':
        return 'from-pink-500 to-rose-600';
      case 'tickets':
        return 'from-blue-500 to-cyan-600';
      default:
        return 'from-amber-500 to-pink-600';
    }
  };

  return (
    <motion.div
      className={`group relative rounded-xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 ${getCardStyle()}`}
      whileHover={{ y: -5 }}
    >
      {product.isFeatured && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          Featured
        </div>
      )}

      <div className={`relative ${isAlbum ? 'h-60' : 'h-48'} overflow-hidden`}>
        {isAlbum && <div className="absolute inset-0 bg-black/10 z-0"></div>}

        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`object-cover ${isAlbum ? 'rounded-lg shadow-inner p-4' : ''} group-hover:scale-110 transition-transform duration-700`}
        />

        {isTrack && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-4 left-4 flex space-x-1">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/80 rounded-full"
                  style={{
                    height: `${Math.random() * 16 + 4}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}

        {isTrack && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
            >
              <Play className="w-5 h-5 text-purple-600 ml-1" />
            </motion.div>
          </div>
        )}

        {!isTrack && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-800" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors">
              <HeartIcon className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        )}

        {isMerch && (
          <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-bold text-pink-600 shadow-md">
            NEW
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.artist}</p>
          </div>
          <div
            className={`flex items-center text-xs font-medium ${isAlbum ? 'bg-amber-100 text-amber-800' : isTrack ? 'bg-purple-100 text-purple-800' : isMerch ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'} rounded-full px-2 py-1`}
          >
            {getTypeIcon()}
            <span>
              {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
            </span>
          </div>
        </div>

        {isTicket && product.date && (
          <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 p-1.5 rounded-md mb-2">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(product.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div
            className={`font-bold ${isAlbum ? 'text-amber-700' : isTrack ? 'text-purple-700' : isMerch ? 'text-pink-700' : 'text-blue-700'}`}
          >
            {isNFT ? `${product.price} ETH` : `$${product.price}`}
          </div>
          <button
            className={`text-sm font-medium bg-gradient-to-r ${getActionButtonStyle()} text-white px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity`}
          >
            {isAlbum
              ? 'Collect Album'
              : isTrack
                ? 'Buy Track'
                : isMerch
                  ? 'Add to Cart'
                  : 'Get Tickets'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
