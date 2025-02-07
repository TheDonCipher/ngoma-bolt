import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { Track } from '@prisma/client';
export declare class TracksService {
    private prisma;
    private cache;
    private config;
    private ipfs;
    private provider;
    private contract;
    constructor(prisma: PrismaService, cache: CacheService, config: ConfigService);
    getTrack(id: string): Promise<Track | null>;
    uploadToIPFS(file: Buffer, metadata: any): Promise<string>;
    mintTrackNFT(track: Track, file: Buffer, signer: ethers.Signer): Promise<string>;
}
