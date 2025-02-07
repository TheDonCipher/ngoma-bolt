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
exports.AuditService = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../../prisma/prisma.service");
var websocket_service_1 = require("../websocket/websocket.service");
var AuditService = /** @class */ (function () {
    function AuditService(prisma, websocket) {
        this.prisma = prisma;
        this.websocket = websocket;
    }
    AuditService.prototype.logAction = function (userId, action, category, severity, details, ip) {
        return __awaiter(this, void 0, void 0, function () {
            var log;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.auditLog.create({
                            data: {
                                userId: userId,
                                action: action,
                                category: category,
                                severity: severity,
                                details: details,
                                ipAddress: ip,
                                timestamp: new Date(),
                            },
                        })];
                    case 1:
                        log = _a.sent();
                        // Notify admins of critical events in real-time
                        if (severity === 'CRITICAL') {
                            this.websocket.notifyAdmins('audit:critical', log);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuditService.prototype.getAuditLogs = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, endDate, userId, action, category, severity;
            return __generator(this, function (_a) {
                startDate = filters.startDate, endDate = filters.endDate, userId = filters.userId, action = filters.action, category = filters.category, severity = filters.severity;
                return [2 /*return*/, this.prisma.auditLog.findMany({
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
                    })];
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
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    AuditService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof websocket_service_1.WebsocketService !== "undefined" && websocket_service_1.WebsocketService) === "function" ? _a : Object])
    ], AuditService);
    return AuditService;
}());
exports.AuditService = AuditService;
