"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesModule = void 0;
var common_1 = require("@nestjs/common");
var badges_controller_1 = require("./badges.controller");
var badges_service_1 = require("./badges.service");
var prisma_module_1 = require("../prisma/prisma.module");
var websocket_module_1 = require("../websocket/websocket.module");
var cache_module_1 = require("../cache/cache.module");
var BadgesModule = /** @class */ (function () {
    function BadgesModule() {
    }
    BadgesModule = __decorate([
        (0, common_1.Module)({
            imports: [prisma_module_1.PrismaModule, websocket_module_1.WebsocketModule, cache_module_1.CacheModule],
            controllers: [badges_controller_1.BadgesController],
            providers: [badges_service_1.BadgesService],
            exports: [badges_service_1.BadgesService],
        })
    ], BadgesModule);
    return BadgesModule;
}());
exports.BadgesModule = BadgesModule;
