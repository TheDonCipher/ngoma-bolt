import { NotificationType } from '@prisma/client';
export declare class UpdatePreferencesDto {
    emailEnabled: boolean;
    emailFrequency: string;
    emailTypes: NotificationType[];
    pushEnabled: boolean;
    pushTypes: NotificationType[];
}
