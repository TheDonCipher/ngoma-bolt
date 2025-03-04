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
exports.NotificationController = void 0;
var common_1 = require("@nestjs/common");
var notification_service_1 = require("./notification.service");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var update_preferences_dto_1 = require("./dto/update-preferences.dto");
var swagger_1 = require("@nestjs/swagger");
var NotificationController = /** @class */ (function () {
    function NotificationController(notificationService) {
        this.notificationService = notificationService;
    }
    NotificationController.prototype.getUserNotifications = function () {
        return __awaiter(this, arguments, void 0, function (page, limit) {
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.notificationService.getUserNotifications(page, limit)];
            });
        });
    };
    NotificationController.prototype.markAsRead = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.notificationService.markAsRead(id)];
            });
        });
    };
    NotificationController.prototype.updatePreferences = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.notificationService.updatePreferences(dto)];
            });
        });
    };
    NotificationController.prototype.getUnreadCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.notificationService.getUnreadCount()];
            });
        });
    };
    __decorate([
        (0, common_1.Get)(),
        (0, swagger_1.ApiOperation)({ summary: 'Get user notifications' }),
        __param(0, (0, common_1.Query)('page')),
        __param(1, (0, common_1.Query)('limit')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", Promise)
    ], NotificationController.prototype, "getUserNotifications", null);
    __decorate([
        (0, common_1.Post)(':id/read'),
        (0, swagger_1.ApiOperation)({ summary: 'Mark notification as read' }),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], NotificationController.prototype, "markAsRead", null);
    __decorate([
        (0, common_1.Put)('preferences'),
        (0, swagger_1.ApiOperation)({ summary: 'Update notification preferences' }),
        __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [update_preferences_dto_1.UpdatePreferencesDto]),
        __metadata("design:returntype", Promise)
    ], NotificationController.prototype, "updatePreferences", null);
    __decorate([
        (0, common_1.Get)('unread'),
        (0, swagger_1.ApiOperation)({ summary: 'Get unread notification count' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], NotificationController.prototype, "getUnreadCount", null);
    NotificationController = __decorate([
        (0, swagger_1.ApiTags)('notifications'),
        (0, common_1.Controller)('notifications'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiBearerAuth)(),
        __metadata("design:paramtypes", [notification_service_1.NotificationService])
    ], NotificationController);
    return NotificationController;
}());
exports.NotificationController = NotificationController;
