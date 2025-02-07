import { BadgesService } from './badges.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
export declare class BadgesController {
    private readonly badgesService;
    constructor(badgesService: BadgesService);
    getUserBadges(address: string): Promise<Badge[]>;
    getUserProgress(address: string, type: string): Promise<any>;
    updateProgress(updateProgressDto: UpdateProgressDto): Promise<any>;
    getLeaderboard(type: string): Promise<any>;
}
