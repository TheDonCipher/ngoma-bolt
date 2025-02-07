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
exports.RecoveryController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var recovery_service_1 = require("./recovery.service");
var initiate_recovery_dto_1 = require("./dto/initiate-recovery.dto");
var reset_password_dto_1 = require("./dto/reset-password.dto");
var RecoveryController = /** @class */ (function () {
    function RecoveryController(recoveryService) {
        this.recoveryService = recoveryService;
    }
    RecoveryController.prototype.initiateRecovery = function (dto, ipAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.recoveryService.initiateRecovery(dto.email, ipAddress)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'If the email exists, recovery instructions have been sent' }];
                }
            });
        });
    };
    RecoveryController.prototype.validateToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.recoveryService.validateToken(token)];
                    case 1:
                        isValid = _a.sent();
                        return [2 /*return*/, { isValid: isValid }];
                }
            });
        });
    };
    RecoveryController.prototype.resetPassword = function (dto, ipAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.recoveryService.resetPassword(dto.token, dto.newPassword, ipAddress)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'Password reset successfully' }];
                }
            });
        });
    };
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
    RecoveryController = __decorate([
        (0, swagger_1.ApiTags)('auth'),
        (0, common_1.Controller)('auth/recovery'),
        __metadata("design:paramtypes", [recovery_service_1.RecoveryService])
    ], RecoveryController);
    return RecoveryController;
}());
exports.RecoveryController = RecoveryController;
