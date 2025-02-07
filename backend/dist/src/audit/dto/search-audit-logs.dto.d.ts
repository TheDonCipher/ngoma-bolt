import { AuditAction, AuditCategory, AuditSeverity } from '@prisma/client';
export declare class SearchAuditLogsDto {
    startDate?: Date;
    endDate?: Date;
    userId?: string;
    action?: AuditAction;
    category?: AuditCategory;
    severity?: AuditSeverity;
    status?: 'SUCCESS' | 'FAILURE';
    page?: number;
    limit?: number;
}
