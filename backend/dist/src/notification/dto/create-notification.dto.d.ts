import { NotificationType, NotificationPriority } from '@prisma/client';
export declare class CreateNotificationDto {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    priority: NotificationPriority;
    metadata?: Record<string, any>;
}
