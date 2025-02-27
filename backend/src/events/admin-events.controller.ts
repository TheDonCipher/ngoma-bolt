import { Controller } from '@nestjs/common';
import { EventManagementService } from './events.service';

@Controller('admin/events')
export class AdminEventsController {
  constructor(private readonly eventManagementService: EventManagementService) {}
}