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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuditLogDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateAuditLogDto {
}
exports.CreateAuditLogDto = CreateAuditLogDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AuditAction }),
    (0, class_validator_1.IsEnum)(client_1.AuditAction),
    __metadata("design:type", typeof (_a = typeof client_1.AuditAction !== "undefined" && client_1.AuditAction) === "function" ? _a : Object)
], CreateAuditLogDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AuditCategory }),
    (0, class_validator_1.IsEnum)(client_1.AuditCategory),
    __metadata("design:type", typeof (_b = typeof client_1.AuditCategory !== "undefined" && client_1.AuditCategory) === "function" ? _b : Object)
], CreateAuditLogDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AuditSeverity }),
    (0, class_validator_1.IsEnum)(client_1.AuditSeverity),
    __metadata("design:type", typeof (_c = typeof client_1.AuditSeverity !== "undefined" && client_1.AuditSeverity) === "function" ? _c : Object)
], CreateAuditLogDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAuditLogDto.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsIP)(),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['SUCCESS', 'FAILURE'] }),
    (0, class_validator_1.IsEnum)(['SUCCESS', 'FAILURE']),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAuditLogDto.prototype, "errorMessage", void 0);
//# sourceMappingURL=create-audit-log.dto.js.map