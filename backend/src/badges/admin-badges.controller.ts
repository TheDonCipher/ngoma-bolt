import { Controller } from '@nestjs/common';
import { BadgesService } from './badges.service';

@Controller('admin/badges')
export class AdminBadgesController {
  constructor(private readonly badgesService: BadgesService) {}
}