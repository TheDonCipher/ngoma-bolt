export declare class SearchQueryDto {
    q: string;
    type: string;
    genre?: string[];
    priceMin?: number;
    priceMax?: number;
    verified?: boolean;
    page?: number;
    limit?: number;
}
