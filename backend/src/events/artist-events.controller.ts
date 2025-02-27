import { Controller } from '@nestjs/common';
import { EventManagementService } from './events.service';

@Controller('artist/events')
export class ArtistEventsController {
  constructor(private readonly eventManagementService: EventManagementService) {}
}