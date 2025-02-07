import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { AuditService } from '../audit/audit.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
export declare class UserProfileService {
    private prisma;
    private cache;
    private audit;
    constructor(prisma: PrismaService, cache: CacheService, audit: AuditService);
    getProfile(userId: string): Promise<any>;
    updateProfile(userId: string, dto: UpdateProfileDto, ipAddress: string): Promise<any>;
    updateSettings(userId: string, dto: UpdateSettingsDto, ipAddress: string): Promise<any>;
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<{
        avatarUrl: string;
    }>;
    deleteAccount(userId: string, ipAddress: string): Promise<{
        success: boolean;
    }>;
}
