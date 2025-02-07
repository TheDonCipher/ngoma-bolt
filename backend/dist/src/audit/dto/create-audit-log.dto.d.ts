import { AuditAction, AuditCategory, AuditSeverity } from '@prisma/client';
export declare class CreateAuditLogDto {
    userId: string;
    action: AuditAction;
    category: AuditCategory;
    severity: AuditSeverity;
    details: Record<string, any>;
    ipAddress: string;
    status: 'SUCCESS' | 'FAILURE';
    errorMessage?: string;
}
