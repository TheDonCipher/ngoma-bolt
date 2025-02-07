export declare class UpdateSettingsDto {
    emailNotifications: boolean;
    pushNotifications: boolean;
    privacySettings: {
        profileVisibility: 'public' | 'followers' | 'private';
        showActivity: boolean;
        showCollection: boolean;
    };
}
