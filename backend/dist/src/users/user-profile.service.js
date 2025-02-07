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
exports.UserProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
const audit_service_1 = require("../audit/audit.service");
const sharp = require("sharp");
let UserProfileService = class UserProfileService {
    constructor(prisma, cache, audit) {
        this.prisma = prisma;
        this.cache = cache;
        this.audit = audit;
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
                user: {
                    select: {
                        username: true,
                        email: true,
                        role: true,
                    },
                },
                preferences: true,
            },
        });
        if (profile) {
            await this.cache.set(cacheKey, profile, 3600);
        }
        return profile;
    }
    async updateProfile(userId, dto, ipAddress) {
        const oldProfile = await this.getProfile(userId);
        const profile = await this.prisma.userProfile.update({
            where: { userId },
            data: {
                bio: dto.bio,
                avatarUrl: dto.avatarUrl,
                bannerUrl: dto.bannerUrl,
                socialLinks: dto.socialLinks,
            },
        });
        await this.audit.createLog({
            userId,
            action: 'UPDATE',
            category: 'USER',
            severity: 'LOW',
            details: {
                component: 'UserProfile',
                before: oldProfile,
                after: profile,
            },
            ipAddress,
            status: 'SUCCESS',
        });
        await this.cache.invalidate(`profile:${userId}`);
        return profile;
    }
    async updateSettings(userId, dto, ipAddress) {
        const oldSettings = await this.prisma.userPreferences.findUnique({
            where: { userId },
        });
        const settings = await this.prisma.userPreferences.upsert({
            where: { userId },
            update: dto,
            create: {
                userId,
                ...dto,
            },
        });
        await this.audit.createLog({
            userId,
            action: 'UPDATE',
            category: 'USER',
            severity: 'LOW',
            details: {
                component: 'UserSettings',
                before: oldSettings,
                after: settings,
            },
            ipAddress,
            status: 'SUCCESS',
        });
        await this.cache.invalidate(`profile:${userId}`);
        return settings;
    }
    async uploadAvatar(userId, file) {
        const optimizedBuffer = await sharp(file.buffer)
            .resize(200, 200)
            .jpeg({ quality: 80 })
            .toBuffer();
        const avatarUrl = `avatars/${userId}.jpg`;
        await this.prisma.userProfile.update({
            where: { userId },
            data: { avatarUrl },
        });
        await this.cache.invalidate(`profile:${userId}`);
        return { avatarUrl };
    }
    async deleteAccount(userId, ipAddress) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                preferences: true,
            },
        });
        await this.prisma.user.delete({
            where: { id: userId },
        });
        await this.audit.createLog({
            userId,
            action: 'DELETE',
            category: 'USER',
            severity: 'HIGH',
            details: {
                component: 'UserAccount',
                deletedData: user,
            },
            ipAddress,
            status: 'SUCCESS',
        });
        await this.cache.invalidate(`profile:${userId}`);
        return { success: true };
    }
};
exports.UserProfileService = UserProfileService;
exports.UserProfileService = UserProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService,
        audit_service_1.AuditService])
], UserProfileService);
//# sourceMappingURL=user-profile.service.js.map