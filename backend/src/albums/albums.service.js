"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsService = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../prisma/prisma.service");
var config_1 = require("@nestjs/config");
var ipfs_http_client_1 = require("ipfs-http-client");
var ethers_1 = require("ethers");
var AlbumNFTAbi_1 = require("./AlbumNFTAbi");
var AlbumsService = /** @class */ (function () {
    function AlbumsService(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.ipfs = (0, ipfs_http_client_1.create)({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
        });
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(this.config.get('ETHEREUM_RPC_URL'));
        this.albumContract = new ethers_1.ethers.Contract(this.config.get('ALBUM_NFT_CONTRACT_ADDRESS'), AlbumNFTAbi_1.default, this.provider);
    }
    AlbumsService.prototype.uploadAlbumToIPFS = function (coverImage, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var imageResult, metadataWithImage, metadataResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ipfs.add(coverImage)];
                    case 1:
                        imageResult = _a.sent();
                        metadataWithImage = __assign(__assign({}, metadata), { image: "ipfs://".concat(imageResult.path) });
                        return [4 /*yield*/, this.ipfs.add(JSON.stringify(metadataWithImage))];
                    case 2:
                        metadataResult = _a.sent();
                        return [2 /*return*/, "ipfs://".concat(metadataResult.path)];
                }
            });
        });
    };
    AlbumsService.prototype.mintAlbumNFT = function (album, trackTokenIds, coverImage, signer) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, ipfsUri, contractWithSigner, trackTokenIdsNum, tx, receipt, event, tokenId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = {
                            name: album.title,
                            description: album.description,
                            artist: album.artistId,
                            releaseDate: album.releaseDate,
                            tracks: trackTokenIds,
                        };
                        return [4 /*yield*/, this.uploadAlbumToIPFS(coverImage, metadata)];
                    case 1:
                        ipfsUri = _a.sent();
                        contractWithSigner = this.albumContract.connect(signer);
                        trackTokenIdsNum = trackTokenIds.map(function (id) { return parseInt(id); });
                        return [4 /*yield*/, contractWithSigner.mintAlbum(ipfsUri, trackTokenIdsNum, ethers_1.ethers.utils.parseEther(album.price.toString()), album.royaltyFee * 100)];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 3:
                        receipt = _a.sent();
                        event = receipt.events.find(function (e) { return e.event === 'AlbumMinted'; });
                        tokenId = event.args.tokenId.toString();
                        // Update album in database with NFT details
                        return [4 /*yield*/, this.prisma.album.update({
                                where: { id: album.id },
                                data: {
                                    nft: {
                                        create: {
                                            tokenId: tokenId,
                                            ipfsUrl: ipfsUri,
                                            price: album.price,
                                            royaltyFee: album.royaltyFee,
                                        },
                                    },
                                },
                            })];
                    case 4:
                        // Update album in database with NFT details
                        _a.sent();
                        return [2 /*return*/, tokenId];
                }
            });
        });
    };
    AlbumsService.prototype.purchaseAlbum = function (tokenId, buyer) {
        return __awaiter(this, void 0, void 0, function () {
            var album, contractWithSigner, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.album.findUnique({
                            where: { nftId: tokenId },
                            include: { nft: true },
                        })];
                    case 1:
                        album = _a.sent();
                        if (!album) {
                            throw new Error("Album with tokenId ".concat(tokenId, " not found"));
                        }
                        contractWithSigner = this.albumContract.connect(buyer);
                        return [4 /*yield*/, contractWithSigner.purchaseAlbum(tokenId, {
                                value: ethers_1.ethers.utils.parseEther(album.price.toString()),
                            })];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    AlbumsService.prototype.withdrawRoyalties = function (artist) {
        return __awaiter(this, void 0, void 0, function () {
            var contractWithSigner, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractWithSigner = this.albumContract.connect(artist);
                        return [4 /*yield*/, contractWithSigner.withdrawRoyalties()];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, tx.wait()];
                }
            });
        });
    };
    AlbumsService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService,
            config_1.ConfigService])
    ], AlbumsService);
    return AlbumsService;
}());
exports.AlbumsService = AlbumsService;
