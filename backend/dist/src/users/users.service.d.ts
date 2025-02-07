import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    private cache;
    constructor(prisma: PrismaService, cache: CacheService);
    getUser(address: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(address: string, updateUserDto: UpdateUserDto): Promise<User>;
    getUserNFTs(address: string): Promise<unknown>;
    getFollowing(address: string): Promise<any>;
    searchUsers(query: string, role?: string): Promise<unknown>;
}
