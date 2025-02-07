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
exports.EventsService = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../prisma/prisma.service");
var cache_service_1 = require("../cache/cache.service");
var websocket_service_1 = require("../websocket/websocket.service");
var EventsService = /** @class */ (function () {
    function EventsService(prisma, cache, websocket) {
        this.prisma = prisma;
        this.cache = cache;
        this.websocket = websocket;
    }
    EventsService.prototype.createEvent = function (createEventDto) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.event.create({
                            data: createEventDto,
                        })];
                    case 1:
                        event = _a.sent();
                        // Invalidate cache
                        return [4 /*yield*/, this.cache.invalidate('events:*')];
                    case 2:
                        // Invalidate cache
                        _a.sent();
                        // Notify followers
                        this.websocket.emit('event:created', event);
                        return [2 /*return*/, event];
                }
            });
        });
    };
    EventsService.prototype.getEvents = function (type, artistId) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "events:".concat(type || 'all', ":").concat(artistId || 'all');
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cached = _a.sent();
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, this.prisma.event.findMany({
                                where: __assign(__assign({}, (type && { type: type })), (artistId && { artistId: artistId })),
                                include: {
                                    artist: {
                                        include: {
                                            user: true,
                                        },
                                    },
                                },
                                orderBy: {
                                    startDate: 'asc',
                                },
                            })];
                    case 2:
                        events = _a.sent();
                        return [4 /*yield*/, this.cache.set(cacheKey, events, 300)];
                    case 3:
                        _a.sent(); // Cache for 5 minutes
                        return [2 /*return*/, events];
                }
            });
        });
    };
    EventsService.prototype.getEvent = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cached, event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "event:".concat(id);
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cached = _a.sent();
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, this.prisma.event.findUnique({
                                where: { id: id },
                                include: {
                                    artist: {
                                        include: {
                                            user: true,
                                        },
                                    },
                                },
                            })];
                    case 2:
                        event = _a.sent();
                        if (!event) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cache.set(cacheKey, event, 300)];
                    case 3:
                        _a.sent(); // Cache for 5 minutes
                        _a.label = 4;
                    case 4: return [2 /*return*/, event];
                }
            });
        });
    };
    EventsService.prototype.updateEvent = function (id, updateEventDto) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.event.update({
                            where: { id: id },
                            data: updateEventDto,
                        })];
                    case 1:
                        event = _a.sent();
                        // Invalidate cache
                        return [4 /*yield*/, this.cache.invalidate("event:".concat(id))];
                    case 2:
                        // Invalidate cache
                        _a.sent();
                        return [4 /*yield*/, this.cache.invalidate('events:*')];
                    case 3:
                        _a.sent();
                        // Notify registered users
                        this.websocket.emit('event:updated', event);
                        return [2 /*return*/, event];
                }
            });
        });
    };
    EventsService.prototype.deleteEvent = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.event.delete({
                            where: { id: id },
                        })];
                    case 1:
                        event = _a.sent();
                        // Invalidate cache
                        return [4 /*yield*/, this.cache.invalidate("event:".concat(id))];
                    case 2:
                        // Invalidate cache
                        _a.sent();
                        return [4 /*yield*/, this.cache.invalidate('events:*')];
                    case 3:
                        _a.sent();
                        // Notify registered users
                        this.websocket.emit('event:deleted', event);
                        return [2 /*return*/, event];
                }
            });
        });
    };
    EventsService.prototype.registerForEvent = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Implementation for event registration
                // This would involve creating a registration record
                // and potentially minting an event ticket NFT
                return [2 /*return*/, null];
            });
        });
    };
    EventsService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService,
            cache_service_1.CacheService,
            websocket_service_1.WebsocketService])
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
