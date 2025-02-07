"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditModule = void 0;
var common_1 = require("@nestjs/common");
var audit_service_1 = require("./audit.service");
var audit_controller_1 = require("./audit.controller");
var prisma_module_1 = require("../prisma/prisma.module");
var cache_module_1 = require("../cache/cache.module");
var websocket_module_1 = require("../websocket/websocket.module");
var AuditModule = /** @class */ (function () {
    function AuditModule() {
    }
    AuditModule = __decorate([
        (0, common_1.Module)({
            imports: [
                prisma_module_1.PrismaModule,
                cache_module_1.CacheModule,
                websocket_module_1.WebsocketModule,
            ],
            providers: [audit_service_1.AuditService],
            controllers: [audit_controller_1.AuditController],
            exports: [audit_service_1.AuditService],
        })
    ], AuditModule);
    return AuditModule;
}());
exports.AuditModule = AuditModule;
