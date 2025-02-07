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
exports.CreateEventDto = exports.EventType = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var EventType;
(function (EventType) {
    EventType["VIRTUAL"] = "VIRTUAL";
    EventType["PHYSICAL"] = "PHYSICAL";
    EventType["HYBRID"] = "HYBRID";
})(EventType || (exports.EventType = EventType = {}));
var CreateEventDto = /** @class */ (function () {
    function CreateEventDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], CreateEventDto.prototype, "title", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], CreateEventDto.prototype, "description", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ enum: EventType }),
        (0, class_validator_1.IsEnum)(EventType),
        __metadata("design:type", String)
    ], CreateEventDto.prototype, "type", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", String)
    ], CreateEventDto.prototype, "startDate", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", String)
    ], CreateEventDto.prototype, "endDate", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], CreateEventDto.prototype, "location", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ required: false }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], CreateEventDto.prototype, "virtualLink", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], CreateEventDto.prototype, "price", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], CreateEventDto.prototype, "artistId", void 0);
    return CreateEventDto;
}());
exports.CreateEventDto = CreateEventDto;
