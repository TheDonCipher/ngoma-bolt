"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var auth_module_1 = require("./auth/auth.module");
var users_module_1 = require("./users/users.module");
var tracks_module_1 = require("./tracks/tracks.module");
var albums_module_1 = require("./albums/albums.module");
var events_module_1 = require("./events/events.module");
var merchandise_module_1 = require("./merchandise/merchandise.module");
var badges_module_1 = require("./badges/badges.module");
var prisma_module_1 = require("./prisma/prisma.module");
var cache_module_1 = require("./cache/cache.module");
var websocket_module_1 = require("./websocket/websocket.module");
var search_module_1 = require("./search/search.module");
var notification_module_1 = require("./notification/notification.module");
var audit_module_1 = require("./audit/audit.module");
var email_module_1 = require("./email/email.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
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
    return AppModule;
}());
exports.AppModule = AppModule;
