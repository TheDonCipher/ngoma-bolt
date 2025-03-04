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
exports.CreateTrackDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateTrackDto = /** @class */ (function () {
    function CreateTrackDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], CreateTrackDto.prototype, "title", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], CreateTrackDto.prototype, "description", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], CreateTrackDto.prototype, "genre", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], CreateTrackDto.prototype, "duration", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(0),
        __metadata("design:type", Number)
    ], CreateTrackDto.prototype, "price", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(10),
        __metadata("design:type", Number)
    ], CreateTrackDto.prototype, "royaltyFee", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], CreateTrackDto.prototype, "albumId", void 0);
    return CreateTrackDto;
}());
exports.CreateTrackDto = CreateTrackDto;
