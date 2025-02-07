import { PrismaService } from '../../prisma/prisma.service';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { SearchFilters, SortOption } from './types';
export declare class SearchService {
    private prisma;
    private elasticsearch;
    constructor(prisma: PrismaService, elasticsearch: ElasticsearchService);
    search(query: string, filters: SearchFilters, sort: SortOption, page?: number, limit?: number): Promise<{
        items: any;
        total: any;
        page: number;
        pageSize: number;
        hasMore: boolean;
    }>;
    private getIncludes;
    syncSearchIndex(): Promise<void>;
    private transformForSearch;
}
