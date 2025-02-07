import { Response } from 'express';
import { AuditService } from './audit.service';
import { SearchAuditLogsDto } from './dto/search-audit-logs.dto';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    searchLogs(query: SearchAuditLogsDto): Promise<unknown>;
    exportLogs(format: 'CSV' | 'JSON', filters: SearchAuditLogsDto, res: Response): Promise<void>;
    cleanupLogs(retentionDays: number): Promise<{
        message: string;
    }>;
}
