'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Calendar,
  Disc3,
  Award,
  Users,
  Heart,
  Lightbulb,
  ArrowRight,
  Music,
  Ticket,
  Share2,
  MessageCircle,
  Trophy,
  Sparkles,
  Mic,
  ListMusic,
  BadgeDollarSign,
  Megaphone,
  CalendarDays,
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface NewsCardProps {
  news: {
    id: string;
    type:
      | 'album_release'
      | 'festival'
      | 'award'
      | 'collaboration'
      | 'charity'
      | 'innovation'
      | 'achievement';
    title: string;
    description: string;
    image: string;
    artist: {
      name: string;
      image: string;
      id?: string;
    };
    collaborator?: {
      name: string;
      image: string;
      id?: string;
    };
    timestamp: string;
    likes: number;
    comments: number;
    releaseDate?: string;
    ticketUrl?: string;
    achievementType?: 'fan' | 'artist';
    badgeName?: string;
  };
}

export function NewsCard({ news }: NewsCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(news.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  // Enhanced category-specific attributes with improved icons and text colors
  const getCategoryAttributes = () => {
    switch (news.type) {
      case 'album_release':
        return {
          icon: <Disc3 className="w-5 h-5" />,
          secondaryIcon: <Mic className="w-4 h-4 mr-1" />,
          bgColor: 'bg-gradient-to-r from-amber-50 to-amber-100',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-900',
          titleColor: 'text-gray-900',
          badgeBg: 'bg-amber-600',
          hoverShadow: 'hover:shadow-amber-200/50',
          name: 'Album Release',
          buttonGradient: 'from-amber-600 to-orange-700',
          actionText: 'Listen Preview',
          descriptionColor: 'text-gray-800',
        };
      case 'festival':
        return {
          icon: <Ticket className="w-5 h-5" />,
          secondaryIcon: <CalendarDays className="w-4 h-4 mr-1" />,
          bgColor: 'bg-gradient-to-r from-purple-50 to-purple-100',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-900',
          titleColor: 'text-gray-900',
          badgeBg: 'bg-purple-600',
          hoverShadow: 'hover:shadow-purple-200/50',
          name: 'Festival',
          buttonGradient: 'from-purple-600 to-indigo-700',
          actionText: 'View Event',
          descriptionColor: 'text-gray-800',
        };
      case 'award':
        return {
          icon: <Trophy className="w-5 h-5" />,
          secondaryIcon: <Award className="w-4 h-4 mr-1" />,
          bgColor: 'bg-gradient-to-r from-yellow-50 to-yellow-100',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-900',
          titleColor: 'text-gray-900',
          badgeBg: 'bg-yellow-600',
          hoverShadow: 'hover:shadow-yellow-200/50',
          name: 'Award',
          buttonGradient: 'from-yellow-600 to-amber-700',
          actionText: 'Read More',
          descriptionColor: 'text-gray-800',
        };
      case 'collaboration':
        return {
          icon: <Users className="w-5 h-5" />,
          secondaryIcon: <ListMusic className="w-4 h-4 mr-1" />,
          bgColor: 'bg-gradient-to-r from-blue-50 to-blue-100',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-900',
          titleColor: 'text-gray-900',
          badgeBg: 'bg-blue-600',
          hoverShadow: 'hover:shadow-blue-200/50',
          name: 'Collaboration',
          buttonGradient: 'from-blue-600 to-cyan-700',
          actionText: 'Listen Now',
          descriptionColor: 'text-gray-800',
        };
      case 'charity':
        return {
          icon: <Heart className="w-5 h-5" />, // Replace HandHeart with Heart
          secondaryIcon: <Users className="w-4 h-4 mr-1" />, // Use Users as secondary icon for charity
          bgColor: 'bg-gradient-to-r from-pink-50 to-pink-100',
          borderColor: 'border-pink-200',
          textColor: 'text-pink-900',
          titleColor: 'text-gray-900',
          badgeBg: 'bg-pink-600',
          hoverShadow: 'hover:shadow-pink-200/50',
          name: 'Charity',
          buttonGradient: 'from-pink-600 to-rose-700',
          actionText: 'Support Cause',
          descriptionColor: 'text-gray-800',
        };
      case 'innovation':
        return {
          icon: <Lightbulb className="w-5 h-5" />,
          secondaryIcon: <Sparkles className="w-4 h-4 mr-1" />,
          bgColor: 'bg-gradient-to-r from-green-50 to-green-100',
          borderColor: 'border-green-200',
          textColor: 'text-green-900',
          titleColor: 'text-gray-900',
          badgeBg: 'bg-green-600',
          hoverShadow: 'hover:shadow-green-200/50',
          name: 'Innovation',
          buttonGradient: 'from-green-600 to-emerald-700',
          actionText: 'Explore',
          descriptionColor: 'text-gray-800',
        };
      case 'achievement':
        return {
          icon: <BadgeDollarSign className="w-5 h-5" />,
          secondaryIcon: <Award className="w-4 h-4 mr-1" />,
          bgColor: 'bg-gradient-to-r from-teal-50 to-teal-100',
          borderColor: 'border-teal-200',
          textColor: 'text-teal-900',
          titleColor: 'text-gray-900',
          badgeBg: 'bg-teal-600',
          hoverShadow: 'hover:shadow-teal-200/50',
          name: 'Achievement',
          buttonGradient: 'from-teal-600 to-cyan-700',
          actionText: 'Congratulate',
          descriptionColor: 'text-gray-800',
        };
      default:
        return {
          icon: <Megaphone className="w-5 h-5" />,
          secondaryIcon: <Calendar className="w-4 h-4 mr-1" />,
          bgColor: 'bg-white',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-900',
          titleColor: 'text-gray-900',
          badgeBg: 'bg-gray-600',
          hoverShadow: 'hover:shadow-gray-200/50',
          name: 'News',
          buttonGradient: 'from-gray-600 to-gray-700',
          actionText: 'Read More',
          descriptionColor: 'text-gray-800',
        };
    }
  };

  const attributes = getCategoryAttributes();

  // Consolidated getImageUrl function with all news IDs in one mapping
  const getImageUrl = () => {
    // All specific news item images in one mapping object
    const specificNewsImages: Record<string, string> = {
      // Festival
      '1': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
      // Fan achievement
      '2': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      // Burna Boy album
      '3': 'https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&w=800&q=80',
      // Collaboration
      '4': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      // Wizkid achievement - platinum/award themed
      '5': 'https://images.unsplash.com/photo-1621111848501-8d3634f82336?auto=format&fit=crop&w=800&q=80',
      // Innovation
      '6': 'https://images.unsplash.com/photo-1535957998253-26ae1ef29506?auto=format&fit=crop&w=800&q=80',
      // Angelique Kidjo charity - education themed
      '7': 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
      // Tems album
      '8': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    };

    // Check if we have a specific image for this news ID
    if (news.id in specificNewsImages) {
      return specificNewsImages[news.id];
    }

    // Type-based fallbacks if no specific image is found
    const typeToImageMap: Record<string, string> = {
      album_release:
        'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=800&q=80',
      festival:
        'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
      award:
        'https://images.unsplash.com/photo-1579439635466-9790cc7d8c3e?auto=format&fit=crop&w=800&q=80',
      collaboration:
        'https://images.unsplash.com/photo-1529518969858-8baa65152fc8?auto=format&fit=crop&w=800&q=80',
      charity:
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      innovation:
        'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?auto=format&fit=crop&w=800&q=80',
      achievement:
        'https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=800&q=80',
    };

    // Return type-specific image or ultimate fallback
    return (
      typeToImageMap[news.type] ||
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80'
    );
  };

  // Fixed artist image function with proper TypeScript types
  const getArtistImage = (
    artistType: 'primary' | 'collaborator' = 'primary'
  ) => {
    const artistName =
      artistType === 'primary' ? news.artist.name : news.collaborator?.name;

    // Special case with direct string comparisons for specific news IDs
    if (news.id === '7' && artistType === 'primary') {
      return 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=100&h=100&q=80';
    }

    if (news.id === '5' && artistType === 'primary') {
      return 'https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?auto=format&fit=crop&w=100&h=100&q=80';
    }

    // Artist-specific images with type-safe access
    const artistImages: Record<string, string> = {
      'Angelique Kidjo':
        'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=100&h=100&q=80',
      'Burna Boy':
        'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=100&h=100&q=80',
      Wizkid:
        'https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?auto=format&fit=crop&w=100&h=100&q=80',
      Tems: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      'Diamond Platnumz':
        'https://images.unsplash.com/photo-1522196772883-393d879eb14d?auto=format&fit=crop&w=100&h=100&q=80',
      'Alicia Keys':
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=100&h=100&q=80',
      'Mr Eazi':
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80',
    };

    // Type-safe check if the artist name is a key in our mapping
    if (
      artistName &&
      Object.prototype.hasOwnProperty.call(artistImages, artistName)
    ) {
      return artistImages[artistName];
    }

    // Reliable fallbacks with gender diversity
    return artistType === 'primary'
      ? 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=100&h=100&q=80' // Female profile for primary
      : 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=100&h=100&q=80'; // Male profile for collaborator
  };

  // Album release layout
  if (news.type === 'album_release') {
    return (
      <div
        className={`flex flex-col md:flex-row rounded-xl overflow-hidden border ${attributes.borderColor} ${attributes.bgColor} shadow-md hover:shadow-xl transition-all duration-300 ${attributes.hoverShadow}`}
      >
        <div className="md:w-1/3 relative">
          <div className="aspect-square relative">
            <Image
              src={getImageUrl()}
              alt={news.title}
              width={300}
              height={300}
              priority
              className="object-cover w-full h-full rounded-lg md:rounded-none p-4 md:p-6"
              style={{ boxShadow: '0px 0px 15px rgba(0,0,0,0.2)' }}
              onError={(e) => {
                // Fallback if the image fails to load
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
          <div className="hidden md:block absolute top-0 left-0 w-6 h-6 bg-black rounded-full ml-[50%] mt-[50%]"></div>
        </div>
        <div className="p-6 md:w-2/3 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`${attributes.badgeBg} text-white p-1.5 rounded-full flex items-center justify-center`}
            >
              {attributes.icon}
            </span>
            <span className={`text-sm font-medium ${attributes.textColor}`}>
              {attributes.name}
            </span>
            <span className="text-sm text-gray-700 ml-auto flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {format(new Date(news.timestamp), 'MMM d, yyyy')}
            </span>
          </div>
          <h3 className={`text-xl font-bold mb-2 ${attributes.titleColor}`}>
            {news.title}
          </h3>
          <p className={`${attributes.descriptionColor} mb-6 leading-relaxed`}>
            {news.description}
          </p>

          <div className="flex items-center justify-between">
            <Link href={`/news/${news.id}`}>
              <button
                className={`text-white bg-gradient-to-r ${attributes.buttonGradient} px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center`}
              >
                <Music className="w-4 h-4 mr-2" />
                {attributes.actionText}
              </button>
            </Link>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={isLiked ? 'currentColor' : 'none'}
                />
                <span className="text-xs">{likesCount}</span>
              </button>

              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{news.comments}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Festival & other event layout
  if (news.type === 'festival') {
    return (
      <div
        className={`rounded-xl overflow-hidden border ${attributes.borderColor} ${attributes.bgColor} shadow-md hover:shadow-xl transition-all duration-300 ${attributes.hoverShadow}`}
      >
        <div className="relative h-48">
          <Image
            src={getImageUrl()}
            alt={news.title}
            width={600}
            height={300}
            priority
            className="object-cover w-full h-full"
            onError={(e) => {
              // Fallback if the image fails to load
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
            <div className="bg-purple-600 p-1.5 rounded-full flex items-center justify-center">
              {attributes.icon}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider">
                {attributes.name}
              </p>
              <p className="text-lg font-bold">
                {format(new Date(news.timestamp), 'MMM d')}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 ${attributes.titleColor}`}>
            {news.title}
          </h3>
          <p className={`${attributes.descriptionColor} mb-6 leading-relaxed`}>
            {news.description}
          </p>
          <div className="flex justify-between items-center">
            <Link href={`/news/${news.id}`}>
              <button
                className={`text-white bg-gradient-to-r ${attributes.buttonGradient} px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center`}
              >
                <Ticket className="w-4 h-4 mr-2" />
                <span>{attributes.actionText}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={isLiked ? 'currentColor' : 'none'}
                />
                <span className="text-xs ml-1">{likesCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card layout for all other types
  return (
    <div
      className={`rounded-xl overflow-hidden border ${attributes.borderColor} ${attributes.bgColor} shadow-md hover:shadow-xl transition-all duration-300 ${attributes.hoverShadow}`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 relative">
          <div className="h-48 md:h-full relative">
            <Image
              src={getImageUrl()}
              alt={news.title}
              width={500}
              height={300}
              priority
              onError={(e) => {
                // Fallback if the image fails to load
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=800&q=80';
              }}
              className="object-cover w-full h-full"
            />
            <div
              className="absolute top-4 left-4 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
              style={{ backgroundColor: `var(--${news.type}-color, #8b5cf6)` }}
            >
              {attributes.icon}
              <span>{attributes.name}</span>
            </div>
          </div>
        </div>
        <div className="p-6 md:w-3/5">
          {/* Improved artist info section with better contrast and spacing */}
          <div className="flex items-center gap-3 mb-4 bg-gray-50 rounded-lg p-2">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-white h-9 w-9 shadow-sm">
                <Image
                  src={getArtistImage('primary')}
                  alt={news.artist.name}
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </Avatar>
              {news.collaborator && (
                <Avatar className="border-2 border-white h-9 w-9 shadow-sm">
                  <Image
                    src={getArtistImage('collaborator')}
                    alt={news.collaborator.name}
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </Avatar>
              )}
            </div>
            <div>
              <span className="font-semibold text-sm text-gray-900 block">
                {news.artist.name}
                {news.collaborator && <span> & {news.collaborator.name}</span>}
              </span>
              <p className="text-xs text-gray-600">
                {format(new Date(news.timestamp), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          <h3 className={`text-xl font-bold mb-2 ${attributes.titleColor}`}>
            {news.title}
          </h3>
          <p className={`${attributes.descriptionColor} mb-4 leading-relaxed`}>
            {news.description}
          </p>

          <div className="flex justify-between items-center">
            <Link href={`/news/${news.id}`}>
              <button
                className={`text-white bg-gradient-to-r ${attributes.buttonGradient} px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center`}
              >
                {attributes.secondaryIcon}
                {attributes.actionText}
              </button>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={isLiked ? 'currentColor' : 'none'}
                />
                <span className="text-xs">{likesCount}</span>
              </button>

              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
