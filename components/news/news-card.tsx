"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface NewsCardProps {
  news: {
    id: string;
    type: "album_release" | "festival" | "award" | "collaboration" | "charity" | "innovation" | "achievement";
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
    achievementType?: "fan" | "artist";
    badgeName?: string;
  };
}

const typeStyles = {
  festival: {
    gradient: "from-purple-500 to-pink-500",
    border: "border-purple-500/20",
    shadow: "shadow-purple-500/20"
  },
  award: {
    gradient: "from-yellow-500 to-amber-500",
    border: "border-yellow-500/20",
    shadow: "shadow-yellow-500/20"
  },
  collaboration: {
    gradient: "from-blue-500 to-cyan-500",
    border: "border-blue-500/20",
    shadow: "shadow-blue-500/20"
  },
  charity: {
    gradient: "from-green-500 to-emerald-500",
    border: "border-green-500/20",
    shadow: "shadow-green-500/20"
  },
  innovation: {
    gradient: "from-indigo-500 to-violet-500",
    border: "border-indigo-500/20",
    shadow: "shadow-indigo-500/20"
  },
  album_release: {
    gradient: "from-red-500 to-rose-500",
    border: "border-red-500/20",
    shadow: "shadow-red-500/20"
  },
  achievement: {
    gradient: "from-teal-500 to-cyan-500",
    border: "border-teal-500/20",
    shadow: "shadow-teal-500/20"
  }
}

export function NewsCard({ news }: NewsCardProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(news.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <Card className={`overflow-hidden backdrop-blur-sm bg-white/5 border ${typeStyles[news.type].border} hover:bg-white/10 hover:shadow-2xl ${typeStyles[news.type].shadow} transition-all duration-300 group`}>
      <div className="p-2 sm:p-3">
          <div className={`flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 p-2 rounded-lg bg-gradient-to-r ${typeStyles[news.type].gradient} bg-opacity-10 backdrop-blur-sm border ${typeStyles[news.type].border} shadow-inner`}>
            <div className="flex items-center gap-2">
              <Avatar className="border-2 border-primary/20 w-8 h-8 cursor-pointer hover:scale-110 transition-transform" onClick={() => news.artist.id && router.push(`/artist/${news.artist.id}`)}>
                <AvatarImage src={news.artist.image} alt={news.artist.name} />
              </Avatar>
              {news.collaborator && (
                <Avatar className="border-2 border-primary/20 w-8 h-8 -ml-2 cursor-pointer hover:scale-110 transition-transform" onClick={() => news.collaborator?.id && router.push(`/artist/${news.collaborator.id}`)}>
                  <AvatarImage src={news.collaborator.image} alt={news.collaborator.name} />
                </Avatar>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className={`font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r ${typeStyles[news.type].gradient} cursor-pointer hover:opacity-80`} onClick={() => news.artist.id && router.push(`/artist/${news.artist.id}`)}>{news.artist.name}</p>
                {news.collaborator && (
                  <>
                    <span className="text-sm text-muted-foreground">×</span>
                    <p className={`font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r ${typeStyles[news.type].gradient} cursor-pointer hover:opacity-80`} onClick={() => news.collaborator?.id && router.push(`/artist/${news.collaborator.id}`)}>{news.collaborator.name}</p>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground/80">
                {formatDistanceToNow(new Date(news.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        
        <h3 className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{news.title}</h3>
        <p className="text-sm text-muted-foreground mb-2 sm:mb-3">{news.description}</p>
        
        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 sm:mb-4 transform group-hover:scale-[1.02] transition-transform duration-300 shadow-xl ring-1 ring-white/20">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`${isLiked ? "text-primary" : "text-muted-foreground"} px-2 sm:px-3`}
              onClick={handleLike}
            >
              <Heart className="w-4 h-4 mr-1 sm:mr-2" />
              {likesCount}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground px-2 sm:px-3">
              <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" />
              {news.comments}
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground px-2 sm:px-3">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
