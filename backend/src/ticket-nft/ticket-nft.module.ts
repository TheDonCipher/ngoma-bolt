import { Module } from '@nestjs/common';
import { TicketNftService } from './ticket-nft.service';
import { TicketNftController } from './ticket-nft.controller';

@Module({
  imports: [],
  controllers: [TicketNftController],
  providers: [TicketNftService],
})
export class TicketNftModule {}