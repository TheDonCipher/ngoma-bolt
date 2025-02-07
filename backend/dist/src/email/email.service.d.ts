import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendNotificationEmail(email: string, title: string, message: string): Promise<void>;
}
