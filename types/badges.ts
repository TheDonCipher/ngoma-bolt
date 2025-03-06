export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  unlocked: boolean;
  unlockedAt?: Date;
  criteria?: string;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  category?: string;
}
