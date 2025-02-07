import { MerchandiseService } from './merchandise.service';
import { CreateMerchandiseDto } from './dto/create-merchandise.dto';
import { UpdateMerchandiseDto } from './dto/update-merchandise.dto';
export declare class MerchandiseController {
    private readonly merchandiseService;
    constructor(merchandiseService: MerchandiseService);
    createMerchandise(createMerchandiseDto: CreateMerchandiseDto): Promise<Merchandise>;
    getMerchandise(type?: string, artistId?: string): Promise<any>;
    getMerchandiseById(id: string): Promise<Merchandise>;
    updateMerchandise(id: string, updateMerchandiseDto: UpdateMerchandiseDto): Promise<Merchandise>;
    deleteMerchandise(id: string): Promise<Merchandise>;
    purchaseMerchandise(id: string): Promise<Merchandise>;
}
