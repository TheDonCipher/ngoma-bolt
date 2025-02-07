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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const rate_limiter_service_1 = require("../security/rate-limiter.service");
const auth_1 = require("../../utils/auth");
let RecoveryService = class RecoveryService {
    constructor(prisma, emailService, rateLimiter) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.rateLimiter = rateLimiter;
    }
    async initiatePasswordReset(email) {
        await this.rateLimiter.checkLimit('password-reset', email);
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return;
        }
        const token = (0, auth_1.generateToken)();
        const expiresAt = new Date(Date.now() + 3600000);
        await this.prisma.passwordReset.create({
            data: {
                userId: user.id,
                token,
                expiresAt,
            },
        });
        await this.emailService.sendPasswordResetEmail(email, token);
    }
    async validateResetToken(token) {
        const reset = await this.prisma.passwordReset.findFirst({
            where: {
                token,
                expiresAt: { gt: new Date() },
                usedAt: null,
            },
        });
        return !!reset;
    }
    async resetPassword(token, newPassword) {
        const reset = await this.prisma.passwordReset.findFirst({
            where: {
                token,
                expiresAt: { gt: new Date() },
                usedAt: null,
            },
            include: { user: true },
        });
        if (!reset) {
            throw new common_1.UnauthorizedException('Invalid or expired reset token');
        }
        const hashedPassword = await (0, auth_1.hashPassword)(newPassword);
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: reset.userId },
                data: { password: hashedPassword },
            }),
            this.prisma.passwordReset.update({
                where: { id: reset.id },
                data: { usedAt: new Date() },
            }),
        ]);
    }
};
exports.RecoveryService = RecoveryService;
exports.RecoveryService = RecoveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _a : Object, typeof (_b = typeof rate_limiter_service_1.RateLimiterService !== "undefined" && rate_limiter_service_1.RateLimiterService) === "function" ? _b : Object])
], RecoveryService);
//# sourceMappingURL=recovery.service.js.map