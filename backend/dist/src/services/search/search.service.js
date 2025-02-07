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
const prisma_service_1 = require("../../prisma/prisma.service");
const elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
let SearchService = class SearchService {
    constructor(prisma, elasticsearch) {
        this.prisma = prisma;
        this.elasticsearch = elasticsearch;
    }
    async search(query, filters, sort, page = 1, limit = 20) {
        const { category, genre, priceRange, dateRange, tags, verified } = filters;
        const searchResults = await this.elasticsearch.search({
            index: category,
            query: {
                bool: {
                    must: [
                        { multi_match: {
                                query,
                                fields: ['title', 'description', 'artist.name'],
                            } },
                        genre && { term: { genre } },
                        verified && { term: { verified } },
                        tags?.length && { terms: { tags } },
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
                { [sort.field]: sort.direction },
            ],
            from: (page - 1) * limit,
            size: limit,
        });
        const ids = searchResults.hits.hits.map(hit => hit._id);
        const items = await this.prisma[category].findMany({
            where: { id: { in: ids } },
            include: this.getIncludes(category),
        });
        return {
            items,
            total: searchResults.hits.total.value,
            page,
            pageSize: limit,
            hasMore: (page * limit) < searchResults.hits.total.value,
        };
    }
    getIncludes(category) {
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
    }
    async syncSearchIndex() {
        const categories = ['tracks', 'albums', 'artists'];
        for (const category of categories) {
            const items = await this.prisma[category].findMany({
                include: this.getIncludes(category),
            });
            await this.elasticsearch.bulk(items.flatMap(item => [
                { index: { _index: category, _id: item.id } },
                this.transformForSearch(item),
            ]));
        }
    }
    transformForSearch(item) {
        return {
            ...item,
            _searchable: [
                item.title,
                item.description,
                item.artist?.name,
                item.genre,
                ...(item.tags || []),
            ].filter(Boolean).join(' '),
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, typeof (_a = typeof elasticsearch_service_1.ElasticsearchService !== "undefined" && elasticsearch_service_1.ElasticsearchService) === "function" ? _a : Object])
], SearchService);
//# sourceMappingURL=search.service.js.map