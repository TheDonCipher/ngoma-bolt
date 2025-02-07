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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../prisma/prisma.service");
var websocket_service_1 = require("../websocket/websocket.service");
var email_service_1 = require("../email/email.service");
var cache_service_1 = require("../cache/cache.service");
var client_1 = require("@prisma/client");
var NotificationService = /** @class */ (function () {
    function NotificationService(prisma, websocket, email, cache) {
        this.prisma = prisma;
        this.websocket = websocket;
        this.email = email;
        this.cache = cache;
    }
    NotificationService.prototype.createNotification = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var notification, preferences, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.notification.create({
                            data: {
                                userId: dto.userId,
                                type: dto.type,
                                title: dto.title,
                                message: dto.message,
                                priority: dto.priority,
                                metadata: dto.metadata,
                            },
                        })];
                    case 1:
                        notification = _a.sent();
                        // Send real-time notification via WebSocket
                        this.websocket.emitToUser(dto.userId, 'notification:new', notification);
                        return [4 /*yield*/, this.prisma.notificationPreferences.findUnique({
                                where: { userId: dto.userId },
                            })];
                    case 2:
                        preferences = _a.sent();
                        if (!((preferences === null || preferences === void 0 ? void 0 : preferences.email.enabled) &&
                            preferences.email.types.includes(dto.type) &&
                            (dto.priority === client_1.NotificationPriority.HIGH || preferences.email.frequency === 'INSTANT'))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: dto.userId },
                            })];
                    case 3:
                        user = _a.sent();
                        if (!(user === null || user === void 0 ? void 0 : user.email)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.email.sendNotificationEmail(user.email, dto.title, dto.message)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: 
                    // Invalidate cache
                    return [4 /*yield*/, this.cache.invalidate("notifications:".concat(dto.userId))];
                    case 6:
                        // Invalidate cache
                        _a.sent();
                        return [2 /*return*/, notification];
                }
            });
        });
    };
    NotificationService.prototype.getUserNotifications = function (userId_1) {
        return __awaiter(this, arguments, void 0, function (userId, page, limit) {
            var cacheKey, cached, _a, notifications, total, result;
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cacheKey = "notifications:".concat(userId, ":").concat(page, ":").concat(limit);
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cached = _b.sent();
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, Promise.all([
                                this.prisma.notification.findMany({
                                    where: { userId: userId },
                                    orderBy: { timestamp: 'desc' },
                                    skip: (page - 1) * limit,
                                    take: limit,
                                }),
                                this.prisma.notification.count({
                                    where: { userId: userId },
                                }),
                            ])];
                    case 2:
                        _a = _b.sent(), notifications = _a[0], total = _a[1];
                        result = {
                            items: notifications,
                            total: total,
                            page: page,
                            pageSize: limit,
                            hasMore: (page * limit) < total,
                        };
                        return [4 /*yield*/, this.cache.set(cacheKey, result, 300)];
                    case 3:
                        _b.sent(); // Cache for 5 minutes
                        return [2 /*return*/, result];
                }
            });
        });
    };
    NotificationService.prototype.markAsRead = function (userId, notificationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.notification.update({
                            where: {
                                id: notificationId,
                                userId: userId,
                            },
                            data: {
                                readAt: new Date(),
                            },
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cache.invalidate("notifications:".concat(userId, ":*"))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.updatePreferences = function (userId, dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.notificationPreferences.upsert({
                            where: { userId: userId },
                            update: dto,
                            create: __assign({ userId: userId }, dto),
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cache.invalidate("preferences:".concat(userId))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.getUnreadCount = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "notifications:".concat(userId, ":unread");
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cached = _a.sent();
                        if (cached !== null) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, this.prisma.notification.count({
                                where: {
                                    userId: userId,
                                    readAt: null,
                                },
                            })];
                    case 2:
                        count = _a.sent();
                        return [4 /*yield*/, this.cache.set(cacheKey, count, 60)];
                    case 3:
                        _a.sent(); // Cache for 1 minute
                        return [2 /*return*/, count];
                }
            });
        });
    };
    NotificationService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService,
            websocket_service_1.WebsocketService,
            email_service_1.EmailService,
            cache_service_1.CacheService])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
