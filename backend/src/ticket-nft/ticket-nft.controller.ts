import { Controller } from '@nestjs/common';
import { TicketNftService } from './ticket-nft.service';

@Controller('ticket-nft')
export class TicketNftController {
  constructor(private readonly ticketNftService: TicketNftService) {}
}