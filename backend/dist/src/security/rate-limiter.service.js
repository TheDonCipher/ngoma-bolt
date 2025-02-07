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
exports.RateLimiterService = void 0;
const common_1 = require("@nestjs/common");
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const config_1 = require("@nestjs/config");
let RateLimiterService = class RateLimiterService {
    constructor(configService) {
        this.configService = configService;
        this.limiters = new Map();
        this.limiters.set('password-recovery', new rate_limiter_flexible_1.RateLimiterMemory({
            points: 5,
            duration: 3600,
        }));
        this.limiters.set('login', new rate_limiter_flexible_1.RateLimiterMemory({
            points: 10,
            duration: 900,
        }));
        this.limiters.set('api', new rate_limiter_flexible_1.RateLimiterMemory({
            points: this.configService.get('RATE_LIMIT_MAX'),
            duration: this.configService.get('RATE_LIMIT_WINDOW'),
        }));
    }
    async checkLimit(type, key) {
        const limiter = this.limiters.get(type);
        if (!limiter) {
            throw new Error(`Rate limiter not found for type: ${type}`);
        }
        try {
            await limiter.consume(key);
        }
        catch (error) {
            throw new common_1.HttpException('Too Many Requests', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
    }
    async resetLimit(type, key) {
        const limiter = this.limiters.get(type);
        if (limiter) {
            await limiter.delete(key);
        }
    }
};
exports.RateLimiterService = RateLimiterService;
exports.RateLimiterService = RateLimiterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RateLimiterService);
//# sourceMappingURL=rate-limiter.service.js.map