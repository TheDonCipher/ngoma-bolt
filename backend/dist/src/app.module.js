"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const tracks_module_1 = require("./tracks/tracks.module");
const albums_module_1 = require("./albums/albums.module");
const events_module_1 = require("./events/events.module");
const merchandise_module_1 = require("./merchandise/merchandise.module");
const badges_module_1 = require("./badges/badges.module");
const prisma_module_1 = require("./prisma/prisma.module");
const cache_module_1 = require("./cache/cache.module");
const websocket_module_1 = require("./websocket/websocket.module");
const search_module_1 = require("./search/search.module");
const notification_module_1 = require("./notification/notification.module");
const audit_module_1 = require("./audit/audit.module");
const email_module_1 = require("./email/email.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            cache_module_1.CacheModule,
            websocket_module_1.WebsocketModule,
            search_module_1.SearchModule,
            notification_module_1.NotificationModule,
            audit_module_1.AuditModule,
            email_module_1.EmailModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            tracks_module_1.TracksModule,
            albums_module_1.AlbumsModule,
            events_module_1.EventsModule,
            merchandise_module_1.MerchandiseModule,
            badges_module_1.BadgesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map