import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfile } from '@prisma/client';
export declare class ProfileService {
    private prisma;
    private cache;
    constructor(prisma: PrismaService, cache: CacheService);
    getProfile(userId: string): Promise<UserProfile>;
    updateProfile(userId: string, data: UpdateProfileDto): Promise<UserProfile>;
    updateAvatar(userId: string, avatarUrl: string): Promise<UserProfile>;
    updatePrivacySettings(userId: string, settings: any): Promise<void>;
}
