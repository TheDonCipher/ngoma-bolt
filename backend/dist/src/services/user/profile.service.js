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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
let ProfileService = class ProfileService {
    constructor(prisma, cache) {
        this.prisma = prisma;
        this.cache = cache;
    }
    async getProfile(userId) {
        const cacheKey = `profile:${userId}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const profile = await this.prisma.userProfile.findUnique({
            where: { userId },
            include: {
                preferences: true,
                socialLinks: true,
            },
        });
        if (profile) {
            await this.cache.set(cacheKey, profile, 3600);
        }
        return profile;
    }
    async updateProfile(userId, data) {
        const profile = await this.prisma.userProfile.update({
            where: { userId },
            data: {
                ...data,
                updatedAt: new Date(),
            },
            include: {
                preferences: true,
                socialLinks: true,
            },
        });
        await this.cache.invalidate(`profile:${userId}`);
        return profile;
    }
    async updateAvatar(userId, avatarUrl) {
        const profile = await this.prisma.userProfile.update({
            where: { userId },
            data: {
                avatarUrl,
                updatedAt: new Date(),
            },
        });
        await this.cache.invalidate(`profile:${userId}`);
        return profile;
    }
    async updatePrivacySettings(userId, settings) {
        await this.prisma.userPreferences.update({
            where: { userId },
            data: {
                privacySettings: settings,
                updatedAt: new Date(),
            },
        });
        await this.cache.invalidate(`profile:${userId}`);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof cache_service_1.CacheService !== "undefined" && cache_service_1.CacheService) === "function" ? _a : Object])
], ProfileService);
//# sourceMappingURL=profile.service.js.map