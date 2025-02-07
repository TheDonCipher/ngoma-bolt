import { UserRole } from '@prisma/client';
export declare class UpdateUserDto {
    username?: string;
    profileImage?: string;
    bio?: string;
    role?: UserRole;
}
