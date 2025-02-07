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
exports.BadgesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const websocket_service_1 = require("../websocket/websocket.service");
const cache_service_1 = require("../cache/cache.service");
let BadgesService = class BadgesService {
    constructor(prisma, websocket, cache) {
        this.prisma = prisma;
        this.websocket = websocket;
        this.cache = cache;
    }
    async getUserBadges(address) {
        const cacheKey = `badges:${address}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const badges = await this.prisma.badge.findMany({
            where: {
                user: {
                    address: address.toLowerCase(),
                },
            },
            include: {
                rewards: true,
            },
        });
        await this.cache.set(cacheKey, badges, 3600);
        return badges;
    }
    async getUserProgress(address, type) {
        const cacheKey = `progress:${address}:${type}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const progress = await this.prisma.badgeProgress.findFirst({
            where: {
                user: {
                    address: address.toLowerCase(),
                },
                type,
            },
        });
        await this.cache.set(cacheKey, progress, 300);
        return progress;
    }
    async updateProgress(dto) {
        const { address, type, amount } = dto;
        const progress = await this.prisma.badgeProgress.upsert({
            where: {
                user_type: {
                    userId: address,
                    type,
                },
            },
            update: {
                currentValue: {
                    increment: amount,
                },
            },
            create: {
                user: {
                    connect: {
                        address: address.toLowerCase(),
                    },
                },
                type,
                currentValue: amount,
            },
        });
        await this.checkBadgeUnlocks(address, type, progress.currentValue);
        await this.cache.invalidate(`progress:${address}:${type}`);
        await this.cache.invalidate(`badges:${address}`);
        return progress;
    }
    async getLeaderboard(type) {
        const cacheKey = `leaderboard:${type}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const leaderboard = await this.prisma.badgeProgress.findMany({
            where: { type },
            orderBy: { currentValue: 'desc' },
            take: 100,
            include: {
                user: {
                    select: {
                        address: true,
                        username: true,
                        profileImage: true,
                    },
                },
            },
        });
        await this.cache.set(cacheKey, leaderboard, 300);
        return leaderboard;
    }
    async checkBadgeUnlocks(address, type, currentValue) {
        const thresholds = {
            COLLECTOR: [5, 15, 30, 50],
            LISTENER: [200, 500, 1000, 2000],
            SPECIAL: [1, 3, 5, 10],
        };
        const nextThreshold = thresholds[type].find(t => t > currentValue);
        if (!nextThreshold)
            return;
        const shouldUnlock = currentValue >= nextThreshold;
        if (!shouldUnlock)
            return;
        const badge = await this.prisma.badge.create({
            data: {
                user: {
                    connect: {
                        address: address.toLowerCase(),
                    },
                },
                type,
                level: this.getBadgeLevel(type, currentValue),
                unlockedAt: new Date(),
            },
        });
        this.websocket.emitToUser(address, 'badge:unlocked', badge);
    }
    getBadgeLevel(type, value) {
        const levels = {
            COLLECTOR: {
                5: 'bronze',
                15: 'silver',
                30: 'gold',
                50: 'platinum',
            },
            LISTENER: {
                200: 'bronze',
                500: 'silver',
                1000: 'gold',
                2000: 'platinum',
            },
            SPECIAL: {
                1: 'bronze',
                3: 'silver',
                5: 'gold',
                10: 'platinum',
            },
        };
        const thresholds = Object.keys(levels[type])
            .map(Number)
            .sort((a, b) => b - a);
        for (const threshold of thresholds) {
            if (value >= threshold) {
                return levels[type][threshold];
            }
        }
        return 'bronze';
    }
};
exports.BadgesService = BadgesService;
exports.BadgesService = BadgesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        websocket_service_1.WebsocketService,
        cache_service_1.CacheService])
], BadgesService);
//# sourceMappingURL=badges.service.js.map