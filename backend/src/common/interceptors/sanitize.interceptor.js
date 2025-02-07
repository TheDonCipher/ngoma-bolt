"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var sanitizeHtml = require("sanitize-html");
var SanitizeInterceptor = /** @class */ (function () {
    function SanitizeInterceptor() {
        this.options = {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: __assign(__assign({}, sanitizeHtml.defaults.allowedAttributes), { img: ['src', 'alt'] }),
            allowedSchemes: ['http', 'https', 'ipfs'],
        };
    }
    SanitizeInterceptor.prototype.intercept = function (context, next) {
        var _this = this;
        return next.handle().pipe((0, operators_1.map)(function (data) { return _this.sanitizeData(data); }));
    };
    SanitizeInterceptor.prototype.sanitizeData = function (data) {
        var _this = this;
        if (typeof data === 'string') {
            return sanitizeHtml(data, this.options);
        }
        if (Array.isArray(data)) {
            return data.map(function (item) { return _this.sanitizeData(item); });
        }
        if (data && typeof data === 'object') {
            var sanitized = {};
            for (var key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    sanitized[key] = this.sanitizeData(data[key]);
                }
            }
            return sanitized;
        }
        return data;
    };
    SanitizeInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], SanitizeInterceptor);
    return SanitizeInterceptor;
}());
exports.SanitizeInterceptor = SanitizeInterceptor;
