"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchandiseModule = void 0;
const common_1 = require("@nestjs/common");
const merchandise_controller_1 = require("./merchandise.controller");
const merchandise_service_1 = require("./merchandise.service");
const prisma_module_1 = require("../prisma/prisma.module");
const cache_module_1 = require("../cache/cache.module");
const websocket_module_1 = require("../websocket/websocket.module");
let MerchandiseModule = class MerchandiseModule {
};
exports.MerchandiseModule = MerchandiseModule;
exports.MerchandiseModule = MerchandiseModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, cache_module_1.CacheModule, websocket_module_1.WebsocketModule],
        controllers: [merchandise_controller_1.MerchandiseController],
        providers: [merchandise_service_1.MerchandiseService],
        exports: [merchandise_service_1.MerchandiseService],
    })
], MerchandiseModule);
//# sourceMappingURL=merchandise.module.js.map