import { PrismaService } from '../prisma/prisma.service';
import { WebsocketService } from '../websocket/websocket.service';
import { CacheService } from '../cache/cache.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { Badge } from '@prisma/client';
export declare class BadgesService {
    private prisma;
    private websocket;
    private cache;
    constructor(prisma: PrismaService, websocket: WebsocketService, cache: CacheService);
    getUserBadges(address: string): Promise<Badge[]>;
    getUserProgress(address: string, type: string): Promise<any>;
    updateProgress(dto: UpdateProgressDto): Promise<any>;
    getLeaderboard(type: string): Promise<any>;
    private checkBadgeUnlocks;
    private getBadgeLevel;
}
