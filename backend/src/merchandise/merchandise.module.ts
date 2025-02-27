import { Module } from '@nestjs/common';
import { MerchandiseService } from './merchandise.service';
import { MerchandiseController } from './merchandise.controller';
import { ArtistMerchandiseController } from './artist-merchandise.controller';
import { AdminMerchandiseController } from './admin-merchandise.controller';
import { MerchandiseManagementService } from './merchandise-management.service';

@Module({
  imports: [],
  controllers: [MerchandiseController, ArtistMerchandiseController, AdminMerchandiseController],
  providers: [MerchandiseService, MerchandiseManagementService],
})
export class MerchandiseModule {}
