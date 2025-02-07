import { ConfigService } from '@nestjs/config';
export declare class RateLimiterService {
    private configService;
    private limiters;
    constructor(configService: ConfigService);
    checkLimit(type: string, key: string): Promise<void>;
    resetLimit(type: string, key: string): Promise<void>;
}
