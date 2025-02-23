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
exports.UserProfileController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var user_profile_service_1 = require("./user-profile.service");
var update_profile_dto_1 = require("./dto/update-profile.dto");
var update_settings_dto_1 = require("./dto/update-settings.dto");
var express_1 = require("express");
var UserProfileController = /** @class */ (function () {
    function UserProfileController(profileService) {
        this.profileService = profileService;
    }
    UserProfileController.prototype.getProfile = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.getProfile(req.user.id)];
            });
        });
    };
    UserProfileController.prototype.updateProfile = function (req, dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.updateProfile(req.user.id, dto, req.ip)];
            });
        });
    };
    UserProfileController.prototype.updateSettings = function (req, dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.updateSettings(req.user.id, dto, req.ip)];
            });
        });
    };
    UserProfileController.prototype.uploadAvatar = function (req, file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.uploadAvatar(req.user.id, file)];
            });
        });
    };
    UserProfileController.prototype.deleteAccount = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.deleteAccount(req.user.id, req.ip)];
            });
        });
    };
    var _a, _b, _c, _d, _e, _f, _g;
    __decorate([
        (0, common_1.Get)(),
        (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
        __param(0, (0, common_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object]),
        __metadata("design:returntype", Promise)
    ], UserProfileController.prototype, "getProfile", null);
    __decorate([
        (0, common_1.Put)(),
        (0, swagger_1.ApiOperation)({ summary: 'Update user profile' }),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, update_profile_dto_1.UpdateProfileDto]),
        __metadata("design:returntype", Promise)
    ], UserProfileController.prototype, "updateProfile", null);
    __decorate([
        (0, common_1.Put)('settings'),
        (0, swagger_1.ApiOperation)({ summary: 'Update user settings' }),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, update_settings_dto_1.UpdateSettingsDto]),
        __metadata("design:returntype", Promise)
    ], UserProfileController.prototype, "updateSettings", null);
    __decorate([
        (0, common_1.Put)('avatar'),
        (0, swagger_1.ApiOperation)({ summary: 'Upload user avatar' }),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.UploadedFile)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_f = typeof Express !== "undefined" && (_e = Express.Multer) !== void 0 && _e.File) === "function" ? _f : Object]),
        __metadata("design:returntype", Promise)
    ], UserProfileController.prototype, "uploadAvatar", null);
    __decorate([
        (0, common_1.Delete)(),
        (0, swagger_1.ApiOperation)({ summary: 'Delete user account' }),
        __param(0, (0, common_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object]),
        __metadata("design:returntype", Promise)
    ], UserProfileController.prototype, "deleteAccount", null);
    UserProfileController = __decorate([
        (0, swagger_1.ApiTags)('profile'),
        (0, common_1.Controller)('profile'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiBearerAuth)(),
        __metadata("design:paramtypes", [user_profile_service_1.UserProfileService])
    ], UserProfileController);
    return UserProfileController;
}());
exports.UserProfileController = UserProfileController;
