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
var badges_service_1 = require("./badges.service");
var badges_controller_1 = require("./badges.controller");
var admin_badges_controller_1 = require("./admin-badges.controller");
var fan_badges_controller_1 = require("./fan-badges.controller");
var badge_service_1 = require("./badge.service");
var BadgesModule = /** @class */ (function () {
    function BadgesModule() {
    }
    BadgesModule = __decorate([
        (0, common_1.Module)({
            imports: [],
            controllers: [badges_controller_1.BadgesController, admin_badges_controller_1.AdminBadgesController, fan_badges_controller_1.FanBadgesController],
            providers: [badges_service_1.BadgesService, badge_service_1.BadgeService],
        })
    ], BadgesModule);
    return BadgesModule;
}());
exports.BadgesModule = BadgesModule;
