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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../../prisma/prisma.service");
var elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
var SearchService = /** @class */ (function () {
    function SearchService(prisma, elasticsearch) {
        this.prisma = prisma;
        this.elasticsearch = elasticsearch;
    }
    SearchService.prototype.search = function (query_1, filters_1, sort_1) {
        return __awaiter(this, arguments, void 0, function (query, filters, sort, page, limit) {
            var category, genre, priceRange, dateRange, tags, verified, searchResults, ids, items;
            var _a;
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 20; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        category = filters.category, genre = filters.genre, priceRange = filters.priceRange, dateRange = filters.dateRange, tags = filters.tags, verified = filters.verified;
                        return [4 /*yield*/, this.elasticsearch.search({
                                index: category,
                                query: {
                                    bool: {
                                        must: [
                                            { multi_match: {
                                                    query: query,
                                                    fields: ['title', 'description', 'artist.name'],
                                                } },
                                            genre && { term: { genre: genre } },
                                            verified && { term: { verified: verified } },
                                            (tags === null || tags === void 0 ? void 0 : tags.length) && { terms: { tags: tags } },
                                            priceRange && {
                                                range: {
                                                    price: {
                                                        gte: priceRange.min,
                                                        lte: priceRange.max,
                                                    },
                                                },
                                            },
                                            dateRange && {
                                                range: {
                                                    createdAt: {
                                                        gte: dateRange.start,
                                                        lte: dateRange.end,
                                                    },
                                                },
                                            },
                                        ].filter(Boolean),
                                    },
                                },
                                sort: [
                                    (_a = {}, _a[sort.field] = sort.direction, _a),
                                ],
                                from: (page - 1) * limit,
                                size: limit,
                            })];
                    case 1:
                        searchResults = _b.sent();
                        ids = searchResults.hits.hits.map(function (hit) { return hit._id; });
                        return [4 /*yield*/, this.prisma[category].findMany({
                                where: { id: { in: ids } },
                                include: this.getIncludes(category),
                            })];
                    case 2:
                        items = _b.sent();
                        return [2 /*return*/, {
                                items: items,
                                total: searchResults.hits.total.value,
                                page: page,
                                pageSize: limit,
                                hasMore: (page * limit) < searchResults.hits.total.value,
                            }];
                }
            });
        });
    };
    SearchService.prototype.getIncludes = function (category) {
        switch (category) {
            case 'tracks':
                return {
                    artist: true,
                    album: true,
                };
            case 'albums':
                return {
                    artist: true,
                    tracks: true,
                };
            case 'artists':
                return {
                    tracks: true,
                    albums: true,
                };
            default:
                return {};
        }
    };
    SearchService.prototype.syncSearchIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categories, _loop_1, this_1, _i, categories_1, category;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categories = ['tracks', 'albums', 'artists'];
                        _loop_1 = function (category) {
                            var items;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this_1.prisma[category].findMany({
                                            include: this_1.getIncludes(category),
                                        })];
                                    case 1:
                                        items = _b.sent();
                                        return [4 /*yield*/, this_1.elasticsearch.bulk(items.flatMap(function (item) { return [
                                                { index: { _index: category, _id: item.id } },
                                                _this.transformForSearch(item),
                                            ]; }))];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, categories_1 = categories;
                        _a.label = 1;
                    case 1:
                        if (!(_i < categories_1.length)) return [3 /*break*/, 4];
                        category = categories_1[_i];
                        return [5 /*yield**/, _loop_1(category)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SearchService.prototype.transformForSearch = function (item) {
        var _a;
        // Transform database model to search-friendly format
        return __assign(__assign({}, item), { _searchable: __spreadArray([
                item.title,
                item.description,
                (_a = item.artist) === null || _a === void 0 ? void 0 : _a.name,
                item.genre
            ], (item.tags || []), true).filter(Boolean).join(' ') });
    };
    var _a;
    SearchService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof elasticsearch_service_1.ElasticsearchService !== "undefined" && elasticsearch_service_1.ElasticsearchService) === "function" ? _a : Object])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
