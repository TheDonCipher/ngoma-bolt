import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { WebsocketService } from '../websocket/websocket.service';
import { CreateMerchandiseDto } from './dto/create-merchandise.dto';
import { UpdateMerchandiseDto } from './dto/update-merchandise.dto';
import { Merchandise } from '@prisma/client';
export declare class MerchandiseService {
    private prisma;
    private cache;
    private websocket;
    constructor(prisma: PrismaService, cache: CacheService, websocket: WebsocketService);
    createMerchandise(createMerchandiseDto: CreateMerchandiseDto): Promise<Merchandise>;
    getMerchandise(type?: string, artistId?: string): Promise<any>;
    getMerchandiseById(id: string): Promise<Merchandise>;
    updateMerchandise(id: string, updateMerchandiseDto: UpdateMerchandiseDto): Promise<Merchandise>;
    deleteMerchandise(id: string): Promise<Merchandise>;
    purchaseMerchandise(id: string): Promise<Merchandise>;
}
