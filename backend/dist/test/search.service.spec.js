"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const search_service_1 = require("../src/search/search.service");
const elasticsearch_1 = require("@nestjs/elasticsearch");
describe('SearchService', () => {
    let searchService;
    let elasticsearchService;
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            providers: [
                search_service_1.SearchService,
                {
                    provide: elasticsearch_1.ElasticsearchService,
                    useValue: {
                        search: jest.fn(),
                        index: jest.fn(),
                        delete: jest.fn(),
                        update: jest.fn(),
                    },
                },
            ],
        }).compile();
        searchService = moduleRef.get(search_service_1.SearchService);
        elasticsearchService = moduleRef.get(elasticsearch_1.ElasticsearchService);
    });
    describe('search', () => {
        it('should return search results', async () => {
            const mockResponse = {
                body: {
                    hits: {
                        hits: [
                            {
                                _source: { title: 'Test Track' },
                                _id: '1',
                                _score: 1,
                            },
                        ],
                        total: { value: 1 },
                    },
                },
            };
            elasticsearchService.search.mockResolvedValue(mockResponse);
            const result = await searchService.search('tracks', 'test', {});
            expect(result.items).toHaveLength(1);
            expect(result.total).toBe(1);
        });
    });
});
//# sourceMappingURL=search.service.spec.js.map