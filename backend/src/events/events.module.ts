import { Module } from '@nestjs/common';
import { EventManagementService } from './events.service';
import { EventsController } from './events.controller';
import { ArtistEventsController } from './artist-events.controller';
import { AdminEventsController } from './admin-events.controller';

@Module({
  imports: [],
  controllers: [EventsController, ArtistEventsController, AdminEventsController],
  providers: [EventManagementService],
})
export class EventsModule {}
