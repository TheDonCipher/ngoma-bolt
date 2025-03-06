import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/types/badges';
import { Progress } from '@/components/ui/progress';

interface BadgeProps {
  badge: Badge;
  progress?: number;
}

export function BadgeOverview({ badge, progress = 0 }: BadgeProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{badge.name}</CardTitle>
        <CardDescription>{badge.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="relative aspect-square w-full max-w-[200px] mx-auto mb-4">
          <Image
            src={badge.imageUrl || '/images/placeholder-badge.png'}
            alt={badge.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
        {progress > 0 && progress < 100 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <div className="text-sm text-muted-foreground">
          {badge.unlocked ? (
            <span className="text-green-500 font-medium">Unlocked</span>
          ) : (
            <span>Not yet unlocked</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default BadgeOverview;
