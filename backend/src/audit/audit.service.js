"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../prisma/prisma.service");
var websocket_service_1 = require("../websocket/websocket.service");
var cache_service_1 = require("../cache/cache.service");
var AuditService = /** @class */ (function () {
    function AuditService(prisma, websocket, cache) {
        this.prisma = prisma;
        this.websocket = websocket;
        this.cache = cache;
    }
    AuditService.prototype.createLog = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var log;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.auditLog.create({
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
                        })];
                    case 1:
                        log = _a.sent();
                        // Notify admins of critical events in real-time
                        if (dto.severity === 'CRITICAL') {
                            this.websocket.notifyAdmins('audit:critical', log);
                        }
                        // Invalidate cache
                        return [4 /*yield*/, this.cache.invalidate('audit:logs:*')];
                    case 2:
                        // Invalidate cache
                        _a.sent();
                        return [2 /*return*/, log];
                }
            });
        });
    };
    AuditService.prototype.searchLogs = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, where, _a, logs, total, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cacheKey = "audit:logs:".concat(JSON.stringify(dto));
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cached = _b.sent();
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        where = {};
                        if (dto.startDate) {
                            where.timestamp = {
                                gte: new Date(dto.startDate),
                            };
                        }
                        if (dto.endDate) {
                            where.timestamp = __assign(__assign({}, where.timestamp), { lte: new Date(dto.endDate) });
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
                        return [4 /*yield*/, Promise.all([
                                this.prisma.auditLog.findMany({
                                    where: where,
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
                                this.prisma.auditLog.count({ where: where }),
                            ])];
                    case 2:
                        _a = _b.sent(), logs = _a[0], total = _a[1];
                        result = {
                            items: logs,
                            total: total,
                            page: dto.page,
                            pageSize: dto.limit,
                            hasMore: (dto.page * dto.limit) < total,
                        };
                        return [4 /*yield*/, this.cache.set(cacheKey, result, 300)];
                    case 3:
                        _b.sent(); // Cache for 5 minutes
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AuditService.prototype.cleanupOldLogs = function (retentionDays) {
        return __awaiter(this, void 0, void 0, function () {
            var cutoffDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cutoffDate = new Date();
                        cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
                        return [4 /*yield*/, this.prisma.auditLog.deleteMany({
                                where: {
                                    timestamp: {
                                        lt: cutoffDate,
                                    },
                                    severity: {
                                        not: 'CRITICAL', // Keep critical logs longer
                                    },
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cache.invalidate('audit:logs:*')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuditService.prototype.exportLogs = function (format, filters) {
        return __awaiter(this, void 0, void 0, function () {
            var logs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchLogs(__assign(__assign({}, filters), { page: 1, limit: 1000 }))];
                    case 1:
                        logs = _a.sent();
                        switch (format) {
                            case 'CSV':
                                return [2 /*return*/, this.generateCSV(logs.items)];
                            case 'JSON':
                                return [2 /*return*/, JSON.stringify(logs.items, null, 2)];
                            default:
                                throw new Error("Unsupported format: ".concat(format));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuditService.prototype.generateCSV = function (logs) {
        var headers = [
            'Timestamp',
            'User',
            'Action',
            'Category',
            'Severity',
            'Status',
            'IP Address',
            'Details',
        ].join(',');
        var rows = logs.map(function (log) { return [
            log.timestamp.toISOString(),
            log.userId,
            log.action,
            log.category,
            log.severity,
            log.status,
            log.ipAddress,
            JSON.stringify(log.details).replace(/,/g, ';'),
        ].join(','); });
        return __spreadArray([headers], rows, true).join('\n');
    };
    AuditService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService,
            websocket_service_1.WebsocketService,
            cache_service_1.CacheService])
    ], AuditService);
    return AuditService;
}());
exports.AuditService = AuditService;
