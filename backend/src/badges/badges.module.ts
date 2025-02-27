import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { AdminBadgesController } from './admin-badges.controller';
import { FanBadgesController } from './fan-badges.controller';
import { BadgeService } from './badge.service';

@Module({
  imports: [],
  controllers: [BadgesController, AdminBadgesController, FanBadgesController],
  providers: [BadgesService, BadgeService],
})
export class BadgesModule {}
