import { PrismaService } from '../prisma/prisma.service';
import { WebsocketService } from '../websocket/websocket.service';
import { CacheService } from '../cache/cache.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { SearchAuditLogsDto } from './dto/search-audit-logs.dto';
import { AuditLog } from '@prisma/client';
export declare class AuditService {
    private prisma;
    private websocket;
    private cache;
    constructor(prisma: PrismaService, websocket: WebsocketService, cache: CacheService);
    createLog(dto: CreateAuditLogDto): Promise<AuditLog>;
    searchLogs(dto: SearchAuditLogsDto): Promise<unknown>;
    cleanupOldLogs(retentionDays: number): Promise<void>;
    exportLogs(format: 'CSV' | 'JSON', filters: SearchAuditLogsDto): Promise<string>;
    private generateCSV;
}
