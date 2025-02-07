import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { AuditService } from '../audit/audit.service';
import { RateLimiterService } from '../security/rate-limiter.service';
export declare class RecoveryService {
    private prisma;
    private email;
    private audit;
    private rateLimiter;
    constructor(prisma: PrismaService, email: EmailService, audit: AuditService, rateLimiter: RateLimiterService);
    initiateRecovery(email: string, ipAddress: string): Promise<void>;
    validateToken(token: string): Promise<boolean>;
    resetPassword(token: string, newPassword: string, ipAddress: string): Promise<void>;
}
