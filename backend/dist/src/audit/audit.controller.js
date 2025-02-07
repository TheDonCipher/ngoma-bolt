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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditController = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("./audit.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const search_audit_logs_dto_1 = require("./dto/search-audit-logs.dto");
const swagger_1 = require("@nestjs/swagger");
let AuditController = class AuditController {
    constructor(auditService) {
        this.auditService = auditService;
    }
    async searchLogs(query) {
        return this.auditService.searchLogs(query);
    }
    async exportLogs(format, filters, res) {
        const data = await this.auditService.exportLogs(format, filters);
        const filename = `audit-logs-${new Date().toISOString()}.${format.toLowerCase()}`;
        res.setHeader('Content-Type', format === 'CSV' ? 'text/csv' : 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.send(data);
    }
    async cleanupLogs(retentionDays) {
        await this.auditService.cleanupOldLogs(retentionDays);
        return { message: 'Cleanup completed successfully' };
    }
};
exports.AuditController = AuditController;
__decorate([
    (0, common_1.Get)('logs'),
    (0, swagger_1.ApiOperation)({ summary: 'Search audit logs' }),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_audit_logs_dto_1.SearchAuditLogsDto]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "searchLogs", null);
__decorate([
    (0, common_1.Post)('export'),
    (0, swagger_1.ApiOperation)({ summary: 'Export audit logs' }),
    __param(0, (0, common_1.Query)('format')),
    __param(1, (0, common_1.Query)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, search_audit_logs_dto_1.SearchAuditLogsDto, Object]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "exportLogs", null);
__decorate([
    (0, common_1.Post)('cleanup'),
    (0, swagger_1.ApiOperation)({ summary: 'Clean up old audit logs' }),
    __param(0, (0, common_1.Query)('retentionDays')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuditController.prototype, "cleanupLogs", null);
exports.AuditController = AuditController = __decorate([
    (0, swagger_1.ApiTags)('audit'),
    (0, common_1.Controller)('audit'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [audit_service_1.AuditService])
], AuditController);
//# sourceMappingURL=audit.controller.js.map