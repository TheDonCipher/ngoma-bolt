import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(address: string): Promise<{
        id: string;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createUser(createUserDto: CreateUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(address: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserNFTs(address: string): Promise<unknown>;
    getFollowing(address: string): Promise<any>;
    searchUsers(query: string, role?: string): Promise<unknown>;
}
