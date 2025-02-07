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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const websocket_service_1 = require("../websocket/websocket.service");
const email_service_1 = require("../email/email.service");
const redis_service_1 = require("../cache/redis.service");
let NotificationService = class NotificationService {
    constructor(prisma, websocket, email, redis) {
        this.prisma = prisma;
        this.websocket = websocket;
        this.email = email;
        this.redis = redis;
    }
    async createNotification(userId, type, title, message, priority = 'MEDIUM', metadata) {
        const notification = await this.prisma.notification.create({
            data: {
                userId,
                type,
                title,
                message,
                priority,
                metadata,
                timestamp: new Date(),
            },
        });
        this.websocket.sendToUser(userId, 'notification:new', notification);
        await this.redis.setex(`notification:${notification.id}`, 86400, JSON.stringify(notification));
        if (priority === 'HIGH') {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (user?.email) {
                await this.email.sendNotificationEmail(user.email, title, message);
            }
        }
        return notification;
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
        await this.redis.del(`notification:${notificationId}`);
    }
    async getUserNotifications(userId, page = 1, limit = 20) {
        return this.prisma.notification.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async updateUserPreferences(userId, preferences) {
        await this.prisma.notificationPreferences.upsert({
            where: { userId },
            update: preferences,
            create: {
                userId,
                ...preferences,
            },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof websocket_service_1.WebsocketService !== "undefined" && websocket_service_1.WebsocketService) === "function" ? _a : Object, typeof (_b = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _b : Object, typeof (_c = typeof redis_service_1.RedisService !== "undefined" && redis_service_1.RedisService) === "function" ? _c : Object])
], NotificationService);
//# sourceMappingURL=notification.service.js.map