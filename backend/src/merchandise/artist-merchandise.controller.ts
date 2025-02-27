import { Controller } from '@nestjs/common';
import { MerchandiseManagementService } from './merchandise-management.service';

@Controller('artist/merchandise')
export class ArtistMerchandiseController {
  constructor(private readonly merchandiseManagementService: MerchandiseManagementService) {}
}