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
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const ipfs_http_client_1 = require("ipfs-http-client");
const ethers_1 = require("ethers");
let AlbumsService = class AlbumsService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.ipfs = (0, ipfs_http_client_1.create)({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
        });
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(this.config.get('ETHEREUM_RPC_URL'));
        this.albumContract = new ethers_1.ethers.Contract(this.config.get('ALBUM_NFT_CONTRACT_ADDRESS'), AlbumNFTAbi, this.provider);
    }
    async uploadAlbumToIPFS(coverImage, metadata) {
        const imageResult = await this.ipfs.add(coverImage);
        const metadataWithImage = {
            ...metadata,
            image: `ipfs://${imageResult.path}`,
        };
        const metadataResult = await this.ipfs.add(JSON.stringify(metadataWithImage));
        return `ipfs://${metadataResult.path}`;
    }
    async mintAlbumNFT(album, trackTokenIds, coverImage, signer) {
        const metadata = {
            name: album.title,
            description: album.description,
            artist: album.artistId,
            releaseDate: album.releaseDate,
            tracks: trackTokenIds,
        };
        const ipfsUri = await this.uploadAlbumToIPFS(coverImage, metadata);
        const contractWithSigner = this.albumContract.connect(signer);
        const trackTokenIdsNum = trackTokenIds.map(id => parseInt(id));
        const tx = await contractWithSigner.mintAlbum(ipfsUri, trackTokenIdsNum, ethers_1.ethers.utils.parseEther(album.price.toString()), album.royaltyFee * 100);
        const receipt = await tx.wait();
        const event = receipt.events.find(e => e.event === 'AlbumMinted');
        const tokenId = event.args.tokenId.toString();
        await this.prisma.album.update({
            where: { id: album.id },
            data: {
                nft: {
                    create: {
                        tokenId,
                        ipfsUrl: ipfsUri,
                        price: album.price,
                        royaltyFee: album.royaltyFee,
                    },
                },
            },
        });
        return tokenId;
    }
    async purchaseAlbum(tokenId, buyer) {
        const album = await this.prisma.nFT.findUnique({
            where: { tokenId },
            include: { album: true },
        });
        const contractWithSigner = this.albumContract.connect(buyer);
        const tx = await contractWithSigner.purchaseAlbum(tokenId, {
            value: ethers_1.ethers.utils.parseEther(album.price.toString()),
        });
        return tx.wait();
    }
    async withdrawRoyalties(artist) {
        const contractWithSigner = this.albumContract.connect(artist);
        const tx = await contractWithSigner.withdrawRoyalties();
        return tx.wait();
    }
};
exports.AlbumsService = AlbumsService;
exports.AlbumsService = AlbumsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AlbumsService);
//# sourceMappingURL=albums.service.js.map