import { Controller } from '@nestjs/common';
import { BadgesService } from './badges.service';

@Controller('fan/badges')
export class FanBadgesController {
  constructor(private readonly badgesService: BadgesService) {}
}