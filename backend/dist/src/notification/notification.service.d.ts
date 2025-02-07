import { PrismaService } from '../prisma/prisma.service';
import { WebsocketService } from '../websocket/websocket.service';
import { EmailService } from '../email/email.service';
import { CacheService } from '../cache/cache.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
export declare class NotificationService {
    private prisma;
    private websocket;
    private email;
    private cache;
    constructor(prisma: PrismaService, websocket: WebsocketService, email: EmailService, cache: CacheService);
    createNotification(dto: CreateNotificationDto): Promise<any>;
    getUserNotifications(userId: string, page?: number, limit?: number): Promise<unknown>;
    markAsRead(userId: string, notificationId: string): Promise<void>;
    updatePreferences(userId: string, dto: UpdatePreferencesDto): Promise<void>;
    getUnreadCount(userId: string): Promise<number>;
}
