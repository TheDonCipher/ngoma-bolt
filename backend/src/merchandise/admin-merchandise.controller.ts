import { Controller } from '@nestjs/common';
import { MerchandiseManagementService } from './merchandise-management.service';

@Controller('admin/merchandise')
export class AdminMerchandiseController {
  constructor(private readonly merchandiseManagementService: MerchandiseManagementService) {}
}