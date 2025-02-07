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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
const websocket_service_1 = require("../websocket/websocket.service");
let EventsService = class EventsService {
    constructor(prisma, cache, websocket) {
        this.prisma = prisma;
        this.cache = cache;
        this.websocket = websocket;
    }
    async createEvent(createEventDto) {
        const event = await this.prisma.event.create({
            data: createEventDto,
        });
        await this.cache.invalidate('events:*');
        this.websocket.emit('event:created', event);
        return event;
    }
    async getEvents(type, artistId) {
        const cacheKey = `events:${type || 'all'}:${artistId || 'all'}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const events = await this.prisma.event.findMany({
            where: {
                ...(type && { type }),
                ...(artistId && { artistId }),
            },
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
        });
        await this.cache.set(cacheKey, events, 300);
        return events;
    }
    async getEvent(id) {
        const cacheKey = `event:${id}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                artist: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (event) {
            await this.cache.set(cacheKey, event, 300);
        }
        return event;
    }
    async updateEvent(id, updateEventDto) {
        const event = await this.prisma.event.update({
            where: { id },
            data: updateEventDto,
        });
        await this.cache.invalidate(`event:${id}`);
        await this.cache.invalidate('events:*');
        this.websocket.emit('event:updated', event);
        return event;
    }
    async deleteEvent(id) {
        const event = await this.prisma.event.delete({
            where: { id },
        });
        await this.cache.invalidate(`event:${id}`);
        await this.cache.invalidate('events:*');
        this.websocket.emit('event:deleted', event);
        return event;
    }
    async registerForEvent(id) {
        return null;
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService,
        websocket_service_1.WebsocketService])
], EventsService);
//# sourceMappingURL=events.service.js.map