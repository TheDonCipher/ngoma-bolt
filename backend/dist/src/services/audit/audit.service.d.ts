import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction, AuditCategory, AuditSeverity } from './types';
import { WebsocketService } from '../websocket/websocket.service';
export declare class AuditService {
    private prisma;
    private websocket;
    constructor(prisma: PrismaService, websocket: WebsocketService);
    logAction(userId: string, action: AuditAction, category: AuditCategory, severity: AuditSeverity, details: any, ip: string): Promise<void>;
    getAuditLogs(filters: any): Promise<any>;
    cleanupOldLogs(retentionDays: number): Promise<void>;
}
