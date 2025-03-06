import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface AlbumCardProps {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseDate?: string;
}

export function AlbumCard({
  id,
  title,
  artist,
  imageUrl,
  releaseDate,
}: AlbumCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/albums/${id}`}>
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardFooter className="flex flex-col items-start p-4">
            <h3 className="font-medium line-clamp-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{artist}</p>
            {releaseDate && (
              <p className="text-xs text-muted-foreground mt-1">
                {releaseDate}
              </p>
            )}
          </CardFooter>
        </CardContent>
      </Link>
    </Card>
  );
}

export default AlbumCard;
