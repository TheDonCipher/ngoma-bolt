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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchandiseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const merchandise_service_1 = require("./merchandise.service");
const create_merchandise_dto_1 = require("./dto/create-merchandise.dto");
const update_merchandise_dto_1 = require("./dto/update-merchandise.dto");
let MerchandiseController = class MerchandiseController {
    constructor(merchandiseService) {
        this.merchandiseService = merchandiseService;
    }
    async createMerchandise(createMerchandiseDto) {
        return this.merchandiseService.createMerchandise(createMerchandiseDto);
    }
    async getMerchandise(type, artistId) {
        return this.merchandiseService.getMerchandise(type, artistId);
    }
    async getMerchandiseById(id) {
        return this.merchandiseService.getMerchandiseById(id);
    }
    async updateMerchandise(id, updateMerchandiseDto) {
        return this.merchandiseService.updateMerchandise(id, updateMerchandiseDto);
    }
    async deleteMerchandise(id) {
        return this.merchandiseService.deleteMerchandise(id);
    }
    async purchaseMerchandise(id) {
        return this.merchandiseService.purchaseMerchandise(id);
    }
};
exports.MerchandiseController = MerchandiseController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ARTIST'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new merchandise' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_merchandise_dto_1.CreateMerchandiseDto]),
    __metadata("design:returntype", Promise)
], MerchandiseController.prototype, "createMerchandise", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all merchandise' }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('artistId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MerchandiseController.prototype, "getMerchandise", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get merchandise by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchandiseController.prototype, "getMerchandiseById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('ARTIST'),
    (0, swagger_1.ApiOperation)({ summary: 'Update merchandise' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_merchandise_dto_1.UpdateMerchandiseDto]),
    __metadata("design:returntype", Promise)
], MerchandiseController.prototype, "updateMerchandise", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ARTIST'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete merchandise' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchandiseController.prototype, "deleteMerchandise", null);
__decorate([
    (0, common_1.Post)(':id/purchase'),
    (0, swagger_1.ApiOperation)({ summary: 'Purchase merchandise' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchandiseController.prototype, "purchaseMerchandise", null);
exports.MerchandiseController = MerchandiseController = __decorate([
    (0, swagger_1.ApiTags)('merchandise'),
    (0, common_1.Controller)('merchandise'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [merchandise_service_1.MerchandiseService])
], MerchandiseController);
//# sourceMappingURL=merchandise.controller.js.map