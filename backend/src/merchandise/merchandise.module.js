"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchandiseModule = void 0;
var common_1 = require("@nestjs/common");
var merchandise_service_1 = require("./merchandise.service");
var merchandise_controller_1 = require("./merchandise.controller");
var artist_merchandise_controller_1 = require("./artist-merchandise.controller");
var admin_merchandise_controller_1 = require("./admin-merchandise.controller");
var merchandise_management_service_1 = require("./merchandise-management.service");
var MerchandiseModule = /** @class */ (function () {
    function MerchandiseModule() {
    }
    MerchandiseModule = __decorate([
        (0, common_1.Module)({
            imports: [],
            controllers: [merchandise_controller_1.MerchandiseController, artist_merchandise_controller_1.ArtistMerchandiseController, admin_merchandise_controller_1.AdminMerchandiseController],
            providers: [merchandise_service_1.MerchandiseService, merchandise_management_service_1.MerchandiseManagementService],
        })
    ], MerchandiseModule);
    return MerchandiseModule;
}());
exports.MerchandiseModule = MerchandiseModule;
