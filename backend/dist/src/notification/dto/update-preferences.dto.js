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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePreferencesDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class UpdatePreferencesDto {
}
exports.UpdatePreferencesDto = UpdatePreferencesDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePreferencesDto.prototype, "emailEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['INSTANT', 'DAILY', 'WEEKLY'] }),
    (0, class_validator_1.IsEnum)(['INSTANT', 'DAILY', 'WEEKLY']),
    __metadata("design:type", String)
], UpdatePreferencesDto.prototype, "emailFrequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], enum: client_1.NotificationType }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.NotificationType, { each: true }),
    __metadata("design:type", Array)
], UpdatePreferencesDto.prototype, "emailTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePreferencesDto.prototype, "pushEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], enum: client_1.NotificationType }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.NotificationType, { each: true }),
    __metadata("design:type", Array)
], UpdatePreferencesDto.prototype, "pushTypes", void 0);
//# sourceMappingURL=update-preferences.dto.js.map