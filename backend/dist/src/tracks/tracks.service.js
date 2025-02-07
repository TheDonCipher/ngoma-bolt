"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cache_service_1 = require("../cache/cache.service");
const config_1 = require("@nestjs/config");
const ipfs_http_client_1 = require("ipfs-http-client");
const ethers_1 = require("ethers");
let TracksService = class TracksService {
    constructor(prisma, cache, config) {
        this.prisma = prisma;
        this.cache = cache;
        this.config = config;
        this.ipfs = (0, ipfs_http_client_1.create)({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
        });
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(this.config.get('ETHEREUM_RPC_URL'));
        this.contract = new ethers_1.ethers.Contract(this.config.get('MUSIC_NFT_CONTRACT_ADDRESS'), MusicNFTAbi, this.provider);
    }
    async getTrack(id) {
        const cacheKey = this.cache.generateKey('track', id);
        const cachedTrack = await this.cache.get(cacheKey);
        if (cachedTrack) {
            return cachedTrack;
        }
        const track = await this.prisma.track.findUnique({
            where: { id },
            include: {
                artist: true,
                nft: true,
            },
        });
        if (track) {
            await this.cache.set(cacheKey, track);
        }
        return track;
    }
    async uploadToIPFS(file, metadata) {
        const fileResult = await this.ipfs.add(file);
        const metadataWithFile = {
            ...metadata,
            file: `ipfs://${fileResult.path}`,
        };
        const metadataResult = await this.ipfs.add(JSON.stringify(metadataWithFile));
        return `ipfs://${metadataResult.path}`;
    }
    async mintTrackNFT(track, file, signer) {
        const metadata = {
            name: track.title,
            description: track.description,
            artist: track.artistId,
            duration: track.duration,
            genre: track.genre,
        };
        const ipfsUri = await this.uploadToIPFS(file, metadata);
        const contractWithSigner = this.contract.connect(signer);
        const tx = await contractWithSigner.mintTrack(ipfsUri, ethers_1.ethers.utils.parseEther(track.price.toString()), track.royaltyFee * 100);
        const receipt = await tx.wait();
        const event = receipt.events.find(e => e.event === 'TrackMinted');
        const tokenId = event.args.tokenId.toString();
        await this.cache.invalidatePattern(`track:${track.id}*`);
        return tokenId;
    }
};
exports.TracksService = TracksService;
exports.TracksService = TracksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cache_service_1.CacheService,
        config_1.ConfigService])
], TracksService);
//# sourceMappingURL=tracks.service.js.map