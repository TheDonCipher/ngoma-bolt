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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const recovery_service_1 = require("./recovery.service");
const initiate_recovery_dto_1 = require("./dto/initiate-recovery.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
let RecoveryController = class RecoveryController {
    constructor(recoveryService) {
        this.recoveryService = recoveryService;
    }
    async initiateRecovery(dto, ipAddress) {
        await this.recoveryService.initiateRecovery(dto.email, ipAddress);
        return { message: 'If the email exists, recovery instructions have been sent' };
    }
    async validateToken(token) {
        const isValid = await this.recoveryService.validateToken(token);
        return { isValid };
    }
    async resetPassword(dto, ipAddress) {
        await this.recoveryService.resetPassword(dto.token, dto.newPassword, ipAddress);
        return { message: 'Password reset successfully' };
    }
};
exports.RecoveryController = RecoveryController;
__decorate([
    (0, common_1.Post)('initiate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Initiate password recovery' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [initiate_recovery_dto_1.InitiateRecoveryDto, String]),
    __metadata("design:returntype", Promise)
], RecoveryController.prototype, "initiateRecovery", null);
__decorate([
    (0, common_1.Post)('validate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Validate recovery token' }),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecoveryController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Post)('reset'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password' }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto, String]),
    __metadata("design:returntype", Promise)
], RecoveryController.prototype, "resetPassword", null);
exports.RecoveryController = RecoveryController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth/recovery'),
    __metadata("design:paramtypes", [recovery_service_1.RecoveryService])
], RecoveryController);
//# sourceMappingURL=recovery.controller.js.map