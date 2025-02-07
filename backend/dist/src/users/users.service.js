"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
let UsersService = class UsersService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async getUser(address) {
        const cacheKey = `user:${address}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const user = await this.prisma.user.findUnique({
            where: { address: address.toLowerCase() },
            include: {
                artistProfile: true,
                followedArtists: true,
                achievements: true,
                ownedNFTs: true,
            },
        });
        if (user) {
            await this.cache.set(cacheKey, user, 3600);
        }
        return user;
    }
    async createUser(createUserDto) {
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                address: createUserDto.address.toLowerCase(),
            },
        });
        await this.cache.invalidate(`user:${user.address}`);
        return user;
    }
    async updateUser(address, updateUserDto) {
        const user = await this.prisma.user.update({
            where: { address: address.toLowerCase() },
            data: updateUserDto,
        });
        await this.cache.invalidate(`user:${address}`);
        return user;
    }
    async getUserNFTs(address) {
        const cacheKey = `user:${address}:nfts`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const nfts = await this.prisma.nFT.findMany({
            where: {
                owners: {
                    some: {
                        address: address.toLowerCase(),
                    },
                },
            },
            include: {
                track: {
                    include: {
                        artist: true,
                    },
                },
            },
        });
        await this.cache.set(cacheKey, nfts, 300);
        return nfts;
    }
    async getFollowing(address) {
        const cacheKey = `user:${address}:following`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const following = await this.prisma.follow.findMany({
            where: {
                follower: {
                    address: address.toLowerCase(),
                },
            },
            include: {
                artist: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        await this.cache.set(cacheKey, following, 300);
        return following;
    }
    async searchUsers(query, role) {
        const cacheKey = `users:search:${query}:${role || 'all'}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const users = await this.prisma.user.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { username: { contains: query, mode: 'insensitive' } },
                            { address: { contains: query, mode: 'insensitive' } },
                        ],
                    },
                    role ? { role } : {},
                ],
            },
            include: {
                artistProfile: true,
            },
            take: 20,
        });
        await this.cache.set(cacheKey, users, 300);
        return users;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService])
], UsersService);
//# sourceMappingURL=users.service.js.map