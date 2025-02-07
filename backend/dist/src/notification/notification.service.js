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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const websocket_service_1 = require("../websocket/websocket.service");
const email_service_1 = require("../email/email.service");
const cache_service_1 = require("../cache/cache.service");
const client_1 = require("@prisma/client");
let NotificationService = class NotificationService {
    constructor(prisma, websocket, email, cache) {
        this.prisma = prisma;
        this.websocket = websocket;
        this.email = email;
        this.cache = cache;
    }
    async createNotification(dto) {
        const notification = await this.prisma.notification.create({
            data: {
                userId: dto.userId,
                type: dto.type,
                title: dto.title,
                message: dto.message,
                priority: dto.priority,
                metadata: dto.metadata,
            },
        });
        this.websocket.emitToUser(dto.userId, 'notification:new', notification);
        const preferences = await this.prisma.notificationPreferences.findUnique({
            where: { userId: dto.userId },
        });
        if (preferences?.email.enabled &&
            preferences.email.types.includes(dto.type) &&
            (dto.priority === client_1.NotificationPriority.HIGH || preferences.email.frequency === 'INSTANT')) {
            const user = await this.prisma.user.findUnique({
                where: { id: dto.userId },
            });
            if (user?.email) {
                await this.email.sendNotificationEmail(user.email, dto.title, dto.message);
            }
        }
        await this.cache.invalidate(`notifications:${dto.userId}`);
        return notification;
    }
    async getUserNotifications(userId, page = 1, limit = 20) {
        const cacheKey = `notifications:${userId}:${page}:${limit}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const [notifications, total] = await Promise.all([
            this.prisma.notification.findMany({
                where: { userId },
                orderBy: { timestamp: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            this.prisma.notification.count({
                where: { userId },
            }),
        ]);
        const result = {
            items: notifications,
            total,
            page,
            pageSize: limit,
            hasMore: (page * limit) < total,
        };
        await this.cache.set(cacheKey, result, 300);
        return result;
    }
    async markAsRead(userId, notificationId) {
        await this.prisma.notification.update({
            where: {
                id: notificationId,
                userId,
            },
            data: {
                readAt: new Date(),
            },
        });
        await this.cache.invalidate(`notifications:${userId}:*`);
    }
    async updatePreferences(userId, dto) {
        await this.prisma.notificationPreferences.upsert({
            where: { userId },
            update: dto,
            create: {
                userId,
                ...dto,
            },
        });
        await this.cache.invalidate(`preferences:${userId}`);
    }
    async getUnreadCount(userId) {
        const cacheKey = `notifications:${userId}:unread`;
        const cached = await this.cache.get(cacheKey);
        if (cached !== null) {
            return cached;
        }
        const count = await this.prisma.notification.count({
            where: {
                userId,
                readAt: null,
            },
        });
        await this.cache.set(cacheKey, count, 60);
        return count;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        websocket_service_1.WebsocketService,
        email_service_1.EmailService,
        cache_service_1.CacheService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map