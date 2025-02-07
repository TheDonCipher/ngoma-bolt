import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
export declare class AlbumsController {
    private readonly albumsService;
    constructor(albumsService: AlbumsService);
    mintAlbum(coverImage: Express.Multer.File, createAlbumDto: CreateAlbumDto): Promise<string>;
    purchaseAlbum(tokenId: string): Promise<import("ethers").ContractReceipt>;
    withdrawRoyalties(): Promise<import("ethers").ContractReceipt>;
}
