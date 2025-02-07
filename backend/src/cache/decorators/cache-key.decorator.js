"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheKey = exports.CACHE_KEY_METADATA = void 0;
var common_1 = require("@nestjs/common");
exports.CACHE_KEY_METADATA = 'cache_key_metadata';
var CacheKey = function (key) { return (0, common_1.SetMetadata)(exports.CACHE_KEY_METADATA, key); };
exports.CacheKey = CacheKey;
