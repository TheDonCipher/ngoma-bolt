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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const websocket_service_1 = require("../websocket/websocket.service");
let AuditService = class AuditService {
    constructor(prisma, websocket) {
        this.prisma = prisma;
        this.websocket = websocket;
    }
    async logAction(userId, action, category, severity, details, ip) {
        const log = await this.prisma.auditLog.create({
            data: {
                userId,
                action,
                category,
                severity,
                details,
                ipAddress: ip,
                timestamp: new Date(),
            },
        });
        if (severity === 'CRITICAL') {
            this.websocket.notifyAdmins('audit:critical', log);
        }
    }
    async getAuditLogs(filters) {
        const { startDate, endDate, userId, action, category, severity } = filters;
        return this.prisma.auditLog.findMany({
            where: {
                timestamp: {
                    gte: startDate,
                    lte: endDate,
                },
                userId: userId ? userId : undefined,
                action: action ? action : undefined,
                category: category ? category : undefined,
                severity: severity ? severity : undefined,
            },
            orderBy: {
                timestamp: 'desc',
            },
            include: {
                user: {
                    select: {
                        username: true,
                        email: true,
                    },
                },
            },
        });
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
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof websocket_service_1.WebsocketService !== "undefined" && websocket_service_1.WebsocketService) === "function" ? _a : Object])
], AuditService);
//# sourceMappingURL=audit.service.js.map