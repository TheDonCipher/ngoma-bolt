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
exports.BadgesService = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../prisma/prisma.service");
var websocket_service_1 = require("../websocket/websocket.service");
var cache_service_1 = require("../cache/cache.service");
var BadgesService = /** @class */ (function () {
    function BadgesService(prisma, websocket, cache) {
        this.prisma = prisma;
        this.websocket = websocket;
        this.cache = cache;
    }
    BadgesService.prototype.getUserBadges = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, badges;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "badges:".concat(address);
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cached = _a.sent();
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, this.prisma.badge.findMany({
                                where: {
                                    user: {
                                        address: address.toLowerCase(),
                                    },
                                },
                                include: {
                                    rewards: true,
                                },
                            })];
                    case 2:
                        badges = _a.sent();
                        return [4 /*yield*/, this.cache.set(cacheKey, badges, 3600)];
                    case 3:
                        _a.sent(); // Cache for 1 hour
                        return [2 /*return*/, badges];
                }
            });
        });
    };
    BadgesService.prototype.getUserProgress = function (address, type) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, progress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "progress:".concat(address, ":").concat(type);
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cached = _a.sent();
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, this.prisma.badgeProgress.findFirst({
                                where: {
                                    user: {
                                        address: address.toLowerCase(),
                                    },
                                    type: type,
                                },
                            })];
                    case 2:
                        progress = _a.sent();
                        return [4 /*yield*/, this.cache.set(cacheKey, progress, 300)];
                    case 3:
                        _a.sent(); // Cache for 5 minutes
                        return [2 /*return*/, progress];
                }
            });
        });
    };
    BadgesService.prototype.updateProgress = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var address, type, amount, progress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = dto.address, type = dto.type, amount = dto.amount;
                        return [4 /*yield*/, this.prisma.badgeProgress.upsert({
                                where: {
                                    user_type: {
                                        userId: address,
                                        type: type,
                                    },
                                },
                                update: {
                                    currentValue: {
                                        increment: amount,
                                    },
                                },
                                create: {
                                    user: {
                                        connect: {
                                            address: address.toLowerCase(),
                                        },
                                    },
                                    type: type,
                                    currentValue: amount,
                                },
                            })];
                    case 1:
                        progress = _a.sent();
                        // Check for badge unlocks
                        return [4 /*yield*/, this.checkBadgeUnlocks(address, type, progress.currentValue)];
                    case 2:
                        // Check for badge unlocks
                        _a.sent();
                        // Invalidate cache
                        return [4 /*yield*/, this.cache.invalidate("progress:".concat(address, ":").concat(type))];
                    case 3:
                        // Invalidate cache
                        _a.sent();
                        return [4 /*yield*/, this.cache.invalidate("badges:".concat(address))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, progress];
                }
            });
        });
    };
    BadgesService.prototype.getLeaderboard = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, leaderboard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "leaderboard:".concat(type);
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cached = _a.sent();
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, this.prisma.badgeProgress.findMany({
                                where: { type: type },
                                orderBy: { currentValue: 'desc' },
                                take: 100,
                                include: {
                                    user: {
                                        select: {
                                            address: true,
                                            username: true,
                                            profileImage: true,
                                        },
                                    },
                                },
                            })];
                    case 2:
                        leaderboard = _a.sent();
                        return [4 /*yield*/, this.cache.set(cacheKey, leaderboard, 300)];
                    case 3:
                        _a.sent(); // Cache for 5 minutes
                        return [2 /*return*/, leaderboard];
                }
            });
        });
    };
    BadgesService.prototype.checkBadgeUnlocks = function (address, type, currentValue) {
        return __awaiter(this, void 0, void 0, function () {
            var thresholds, nextThreshold, shouldUnlock, badge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thresholds = {
                            COLLECTOR: [5, 15, 30, 50],
                            LISTENER: [200, 500, 1000, 2000],
                            SPECIAL: [1, 3, 5, 10],
                        };
                        nextThreshold = thresholds[type].find(function (t) { return t > currentValue; });
                        if (!nextThreshold)
                            return [2 /*return*/];
                        shouldUnlock = currentValue >= nextThreshold;
                        if (!shouldUnlock)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.prisma.badge.create({
                                data: {
                                    user: {
                                        connect: {
                                            address: address.toLowerCase(),
                                        },
                                    },
                                    type: type,
                                    level: this.getBadgeLevel(type, currentValue),
                                    unlockedAt: new Date(),
                                },
                            })];
                    case 1:
                        badge = _a.sent();
                        // Notify user
                        this.websocket.emitToUser(address, 'badge:unlocked', badge);
                        return [2 /*return*/];
                }
            });
        });
    };
    BadgesService.prototype.getBadgeLevel = function (type, value) {
        var levels = {
            COLLECTOR: {
                5: 'bronze',
                15: 'silver',
                30: 'gold',
                50: 'platinum',
            },
            LISTENER: {
                200: 'bronze',
                500: 'silver',
                1000: 'gold',
                2000: 'platinum',
            },
            SPECIAL: {
                1: 'bronze',
                3: 'silver',
                5: 'gold',
                10: 'platinum',
            },
        };
        var thresholds = Object.keys(levels[type])
            .map(Number)
            .sort(function (a, b) { return b - a; });
        for (var _i = 0, thresholds_1 = thresholds; _i < thresholds_1.length; _i++) {
            var threshold = thresholds_1[_i];
            if (value >= threshold) {
                return levels[type][threshold];
            }
        }
        return 'bronze';
    };
    BadgesService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService,
            websocket_service_1.WebsocketService,
            cache_service_1.CacheService])
    ], BadgesService);
    return BadgesService;
}());
exports.BadgesService = BadgesService;
