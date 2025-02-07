"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const websocket_service_1 = require("../websocket/websocket.service");
const cache_service_1 = require("../cache/cache.service");
let AuditService = class AuditService {
    constructor(prisma, websocket, cache) {
        this.prisma = prisma;
        this.websocket = websocket;
        this.cache = cache;
    }
    async createLog(dto) {
        const log = await this.prisma.auditLog.create({
            data: {
                userId: dto.userId,
                action: dto.action,
                category: dto.category,
                severity: dto.severity,
                details: dto.details,
                ipAddress: dto.ipAddress,
                status: dto.status,
                errorMessage: dto.errorMessage,
            },
        });
        if (dto.severity === 'CRITICAL') {
            this.websocket.notifyAdmins('audit:critical', log);
        }
        await this.cache.invalidate('audit:logs:*');
        return log;
    }
    async searchLogs(dto) {
        const cacheKey = `audit:logs:${JSON.stringify(dto)}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const where = {};
        if (dto.startDate) {
            where.timestamp = {
                gte: new Date(dto.startDate),
            };
        }
        if (dto.endDate) {
            where.timestamp = {
                ...where.timestamp,
                lte: new Date(dto.endDate),
            };
        }
        if (dto.userId) {
            where.userId = dto.userId;
        }
        if (dto.action) {
            where.action = dto.action;
        }
        if (dto.category) {
            where.category = dto.category;
        }
        if (dto.severity) {
            where.severity = dto.severity;
        }
        if (dto.status) {
            where.status = dto.status;
        }
        const [logs, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                orderBy: { timestamp: 'desc' },
                skip: (dto.page - 1) * dto.limit,
                take: dto.limit,
                include: {
                    user: {
                        select: {
                            username: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        const result = {
            items: logs,
            total,
            page: dto.page,
            pageSize: dto.limit,
            hasMore: (dto.page * dto.limit) < total,
        };
        await this.cache.set(cacheKey, result, 300);
        return result;
    }
    async cleanupOldLogs(retentionDays) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
        await this.prisma.auditLog.deleteMany({
            where: {
                timestamp: {
                    lt: cutoffDate,
                },
                severity: {
                    not: 'CRITICAL',
                },
            },
        });
        await this.cache.invalidate('audit:logs:*');
    }
    async exportLogs(format, filters) {
        const logs = await this.searchLogs({
            ...filters,
            page: 1,
            limit: 1000,
        });
        switch (format) {
            case 'CSV':
                return this.generateCSV(logs.items);
            case 'JSON':
                return JSON.stringify(logs.items, null, 2);
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }
    generateCSV(logs) {
        const headers = [
            'Timestamp',
            'User',
            'Action',
            'Category',
            'Severity',
            'Status',
            'IP Address',
            'Details',
        ].join(',');
        const rows = logs.map(log => [
            log.timestamp.toISOString(),
            log.userId,
            log.action,
            log.category,
            log.severity,
            log.status,
            log.ipAddress,
            JSON.stringify(log.details).replace(/,/g, ';'),
        ].join(','));
        return [headers, ...rows].join('\n');
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        websocket_service_1.WebsocketService,
        cache_service_1.CacheService])
], AuditService);
//# sourceMappingURL=audit.service.js.map