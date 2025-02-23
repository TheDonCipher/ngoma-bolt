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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditController = void 0;
var common_1 = require("@nestjs/common");
var express_1 = require("express");
var audit_service_1 = require("./audit.service");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var roles_guard_1 = require("../auth/roles.guard");
var roles_decorator_1 = require("../auth/roles.decorator");
var search_audit_logs_dto_1 = require("./dto/search-audit-logs.dto");
var swagger_1 = require("@nestjs/swagger");
var AuditController = /** @class */ (function () {
    function AuditController(auditService) {
        this.auditService = auditService;
    }
    AuditController.prototype.searchLogs = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.auditService.searchLogs(query)];
            });
        });
    };
    AuditController.prototype.exportLogs = function (format, filters, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, filename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.auditService.exportLogs(format, filters)];
                    case 1:
                        data = _a.sent();
                        filename = "audit-logs-".concat(new Date().toISOString(), ".").concat(format.toLowerCase());
                        res.setHeader('Content-Type', format === 'CSV' ? 'text/csv' : 'application/json');
                        res.setHeader('Content-Disposition', "attachment; filename=".concat(filename));
                        res.send(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    AuditController.prototype.cleanupLogs = function (retentionDays) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.auditService.cleanupOldLogs(retentionDays)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'Cleanup completed successfully' }];
                }
            });
        });
    };
    var _a;
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
        __metadata("design:paramtypes", [String, search_audit_logs_dto_1.SearchAuditLogsDto, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
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
    AuditController = __decorate([
        (0, swagger_1.ApiTags)('audit'),
        (0, common_1.Controller)('audit'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        (0, roles_decorator_1.Roles)('ADMIN'),
        (0, swagger_1.ApiBearerAuth)(),
        __metadata("design:paramtypes", [audit_service_1.AuditService])
    ], AuditController);
    return AuditController;
}());
exports.AuditController = AuditController;
