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
exports.RateLimiterGuard = void 0;
const common_1 = require("@nestjs/common");
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const config_1 = require("@nestjs/config");
let RateLimiterGuard = class RateLimiterGuard {
    constructor(configService) {
        this.configService = configService;
        this.rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
            points: configService.get('RATE_LIMIT_MAX', 100),
            duration: configService.get('RATE_LIMIT_WINDOW', 900000),
        });
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const key = request.ip;
        try {
            await this.rateLimiter.consume(key);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.TOO_MANY_REQUESTS,
                message: 'Too Many Requests',
                retryAfter: Math.ceil(error.msBeforeNext / 1000),
            }, common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
    }
};
exports.RateLimiterGuard = RateLimiterGuard;
exports.RateLimiterGuard = RateLimiterGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RateLimiterGuard);
//# sourceMappingURL=rate-limiter.guard.js.map