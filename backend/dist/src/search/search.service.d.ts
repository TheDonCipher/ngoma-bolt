import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchFilters, SearchResults } from './interfaces/search.interface';
export declare class SearchService {
    private readonly elasticsearchService;
    constructor(elasticsearchService: ElasticsearchService);
    search<T>(index: string, query: string, filters: SearchFilters, page?: number, limit?: number): Promise<SearchResults<T>>;
    private buildFilters;
    indexDocument(index: string, id: string, document: any): Promise<void>;
    deleteDocument(index: string, id: string): Promise<void>;
    updateDocument(index: string, id: string, document: any): Promise<void>;
}
