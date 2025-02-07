import { NotificationService } from './notification.service';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getUserNotifications(page?: number, limit?: number): Promise<unknown>;
    markAsRead(id: string): Promise<void>;
    updatePreferences(dto: UpdatePreferencesDto): Promise<void>;
    getUnreadCount(): Promise<number>;
}
