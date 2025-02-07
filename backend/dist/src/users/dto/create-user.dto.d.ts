import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    address: string;
    username?: string;
    profileImage?: string;
    bio?: string;
    role?: UserRole;
}
