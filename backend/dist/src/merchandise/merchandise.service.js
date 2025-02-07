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
exports.MerchandiseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
const websocket_service_1 = require("../websocket/websocket.service");
let MerchandiseService = class MerchandiseService {
    constructor(prisma, cache, websocket) {
        this.prisma = prisma;
        this.cache = cache;
        this.websocket = websocket;
    }
    async createMerchandise(createMerchandiseDto) {
        const merchandise = await this.prisma.merchandise.create({
            data: createMerchandiseDto,
        });
        await this.cache.invalidate('merchandise:*');
        this.websocket.emit('merchandise:created', merchandise);
        return merchandise;
    }
    async getMerchandise(type, artistId) {
        const cacheKey = `merchandise:${type || 'all'}:${artistId || 'all'}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const merchandise = await this.prisma.merchandise.findMany({
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
                createdAt: 'desc',
            },
        });
        await this.cache.set(cacheKey, merchandise, 300);
        return merchandise;
    }
    async getMerchandiseById(id) {
        const cacheKey = `merchandise:${id}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const merchandise = await this.prisma.merchandise.findUnique({
            where: { id },
            include: {
                artist: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (merchandise) {
            await this.cache.set(cacheKey, merchandise, 300);
        }
        return merchandise;
    }
    async updateMerchandise(id, updateMerchandiseDto) {
        const merchandise = await this.prisma.merchandise.update({
            where: { id },
            data: updateMerchandiseDto,
        });
        await this.cache.invalidate(`merchandise:${id}`);
        await this.cache.invalidate('merchandise:*');
        this.websocket.emit('merchandise:updated', merchandise);
        return merchandise;
    }
    async deleteMerchandise(id) {
        const merchandise = await this.prisma.merchandise.delete({
            where: { id },
        });
        await this.cache.invalidate(`merchandise:${id}`);
        await this.cache.invalidate('merchandise:*');
        this.websocket.emit('merchandise:deleted', merchandise);
        return merchandise;
    }
    async purchaseMerchandise(id) {
        return null;
    }
};
exports.MerchandiseService = MerchandiseService;
exports.MerchandiseService = MerchandiseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService,
        websocket_service_1.WebsocketService])
], MerchandiseService);
//# sourceMappingURL=merchandise.service.js.map