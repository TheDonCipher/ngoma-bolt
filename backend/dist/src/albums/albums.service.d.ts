import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { Album } from '@prisma/client';
export declare class AlbumsService {
    private prisma;
    private config;
    private ipfs;
    private provider;
    private albumContract;
    constructor(prisma: PrismaService, config: ConfigService);
    uploadAlbumToIPFS(coverImage: Buffer, metadata: any): Promise<string>;
    mintAlbumNFT(album: Album, trackTokenIds: string[], coverImage: Buffer, signer: ethers.Signer): Promise<string>;
    purchaseAlbum(tokenId: string, buyer: ethers.Signer): Promise<ethers.ContractReceipt>;
    withdrawRoyalties(artist: ethers.Signer): Promise<ethers.ContractReceipt>;
}
