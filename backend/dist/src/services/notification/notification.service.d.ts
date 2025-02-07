import { PrismaService } from '../../prisma/prisma.service';
import { WebsocketService } from '../websocket/websocket.service';
import { EmailService } from '../email/email.service';
import { NotificationType, NotificationPriority } from './types';
import { RedisService } from '../cache/redis.service';
export declare class NotificationService {
    private prisma;
    private websocket;
    private email;
    private redis;
    constructor(prisma: PrismaService, websocket: WebsocketService, email: EmailService, redis: RedisService);
    createNotification(userId: string, type: NotificationType, title: string, message: string, priority?: NotificationPriority, metadata?: Record<string, any>): Promise<any>;
    markAsRead(userId: string, notificationId: string): Promise<void>;
    getUserNotifications(userId: string, page?: number, limit?: number): Promise<any>;
    updateUserPreferences(userId: string, preferences: any): Promise<void>;
}
