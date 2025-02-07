"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
var common_1 = require("@nestjs/common");
var notification_service_1 = require("./notification.service");
var notification_controller_1 = require("./notification.controller");
var websocket_module_1 = require("../websocket/websocket.module");
var email_module_1 = require("../email/email.module");
var prisma_module_1 = require("../prisma/prisma.module");
var cache_module_1 = require("../cache/cache.module");
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        (0, common_1.Module)({
            imports: [
                websocket_module_1.WebsocketModule,
                email_module_1.EmailModule,
                prisma_module_1.PrismaModule,
                cache_module_1.CacheModule,
            ],
            providers: [notification_service_1.NotificationService],
            controllers: [notification_controller_1.NotificationController],
            exports: [notification_service_1.NotificationService],
        })
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
