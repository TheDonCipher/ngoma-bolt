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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let SearchService = class SearchService {
    constructor(elasticsearchService) {
        this.elasticsearchService = elasticsearchService;
    }
    async search(index, query, filters, page = 1, limit = 20) {
        const { body } = await this.elasticsearchService.search({
            index,
            body: {
                from: (page - 1) * limit,
                size: limit,
                query: {
                    bool: {
                        must: [
                            {
                                multi_match: {
                                    query,
                                    fields: ['title', 'description', 'artist.name'],
                                    fuzziness: 'AUTO',
                                },
                            },
                            ...this.buildFilters(filters),
                        ],
                    },
                },
            },
        });
        const hits = body.hits.hits.map((hit) => ({
            ...hit._source,
            id: hit._id,
            score: hit._score,
        }));
        return {
            items: hits,
            total: body.hits.total.value,
            page,
            pageSize: limit,
            hasMore: (page * limit) < body.hits.total.value,
        };
    }
    buildFilters(filters) {
        const filterClauses = [];
        if (filters.genre?.length) {
            filterClauses.push({
                terms: { genre: filters.genre },
            });
        }
        if (filters.priceRange) {
            filterClauses.push({
                range: {
                    price: {
                        gte: filters.priceRange.min,
                        lte: filters.priceRange.max,
                    },
                },
            });
        }
        if (filters.verified !== undefined) {
            filterClauses.push({
                term: { verified: filters.verified },
            });
        }
        return filterClauses;
    }
    async indexDocument(index, id, document) {
        await this.elasticsearchService.index({
            index,
            id,
            body: document,
        });
    }
    async deleteDocument(index, id) {
        await this.elasticsearchService.delete({
            index,
            id,
        });
    }
    async updateDocument(index, id, document) {
        await this.elasticsearchService.update({
            index,
            id,
            body: {
                doc: document,
            },
        });
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof elasticsearch_1.ElasticsearchService !== "undefined" && elasticsearch_1.ElasticsearchService) === "function" ? _a : Object])
], SearchService);
//# sourceMappingURL=search.service.js.map