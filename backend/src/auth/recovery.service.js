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
exports.RecoveryService = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../prisma/prisma.service");
var email_service_1 = require("../email/email.service");
var audit_service_1 = require("../audit/audit.service");
var rate_limiter_service_1 = require("../security/rate-limiter.service");
var bcrypt = require("bcryptjs");
var crypto = require("crypto");
var RecoveryService = /** @class */ (function () {
    function RecoveryService(prisma, email, audit, rateLimiter) {
        this.prisma = prisma;
        this.email = email;
        this.audit = audit;
        this.rateLimiter = rateLimiter;
    }
    RecoveryService.prototype.initiateRecovery = function (email, ipAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, expiresAt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Rate limiting check
                    return [4 /*yield*/, this.rateLimiter.checkLimit('password-recovery', ipAddress)];
                    case 1:
                        // Rate limiting check
                        _a.sent();
                        return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: email } })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            // Return success even if user not found to prevent email enumeration
                            return [2 /*return*/];
                        }
                        token = crypto.randomBytes(32).toString('hex');
                        expiresAt = new Date(Date.now() + 3600000);
                        return [4 /*yield*/, this.prisma.passwordReset.create({
                                data: {
                                    userId: user.id,
                                    token: token,
                                    expiresAt: expiresAt,
                                },
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.email.sendPasswordResetEmail(email, token)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.audit.createLog({
                                userId: user.id,
                                action: 'INITIATE_RECOVERY',
                                category: 'SECURITY',
                                severity: 'MEDIUM',
                                details: {
                                    component: 'PasswordRecovery',
                                    metadata: { email: email },
                                },
                                ipAddress: ipAddress,
                                status: 'SUCCESS',
                            })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RecoveryService.prototype.validateToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var reset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.passwordReset.findFirst({
                            where: {
                                token: token,
                                expiresAt: { gt: new Date() },
                                usedAt: null,
                            },
                        })];
                    case 1:
                        reset = _a.sent();
                        return [2 /*return*/, !!reset];
                }
            });
        });
    };
    RecoveryService.prototype.resetPassword = function (token, newPassword, ipAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var reset, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.passwordReset.findFirst({
                            where: {
                                token: token,
                                expiresAt: { gt: new Date() },
                                usedAt: null,
                            },
                            include: { user: true },
                        })];
                    case 1:
                        reset = _a.sent();
                        if (!reset) {
                            throw new common_1.UnauthorizedException('Invalid or expired reset token');
                        }
                        return [4 /*yield*/, bcrypt.hash(newPassword, 12)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.prisma.$transaction([
                                this.prisma.user.update({
                                    where: { id: reset.userId },
                                    data: { password: hashedPassword },
                                }),
                                this.prisma.passwordReset.update({
                                    where: { id: reset.id },
                                    data: { usedAt: new Date() },
                                }),
                            ])];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.audit.createLog({
                                userId: reset.userId,
                                action: 'RESET_PASSWORD',
                                category: 'SECURITY',
                                severity: 'HIGH',
                                details: {
                                    component: 'PasswordRecovery',
                                },
                                ipAddress: ipAddress,
                                status: 'SUCCESS',
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RecoveryService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService,
            email_service_1.EmailService,
            audit_service_1.AuditService,
            rate_limiter_service_1.RateLimiterService])
    ], RecoveryService);
    return RecoveryService;
}());
exports.RecoveryService = RecoveryService;
