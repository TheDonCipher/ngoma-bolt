import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { RateLimiterService } from '../security/rate-limiter.service';
export declare class RecoveryService {
    private prisma;
    private emailService;
    private rateLimiter;
    constructor(prisma: PrismaService, emailService: EmailService, rateLimiter: RateLimiterService);
    initiatePasswordReset(email: string): Promise<void>;
    validateResetToken(token: string): Promise<boolean>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
