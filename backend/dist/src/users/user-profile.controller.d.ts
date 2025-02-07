import { UserProfileService } from './user-profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Request } from 'express';
export declare class UserProfileController {
    private readonly profileService;
    constructor(profileService: UserProfileService);
    getProfile(req: Request): Promise<any>;
    updateProfile(req: Request, dto: UpdateProfileDto): Promise<any>;
    updateSettings(req: Request, dto: UpdateSettingsDto): Promise<any>;
    uploadAvatar(req: Request, file: Express.Multer.File): Promise<{
        avatarUrl: string;
    }>;
    deleteAccount(req: Request): Promise<{
        success: boolean;
    }>;
}
