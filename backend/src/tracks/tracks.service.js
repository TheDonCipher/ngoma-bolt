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
exports.TracksService = void 0;
var common_1 = require("@nestjs/common");
var prisma_service_1 = require("../prisma/prisma.service");
var cache_service_1 = require("../cache/cache.service");
var config_1 = require("@nestjs/config");
var ipfs_http_client_1 = require("ipfs-http-client");
var ethers_1 = require("ethers");
var TracksService = /** @class */ (function () {
    function TracksService(prisma, cache, config) {
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
    TracksService.prototype.getTrack = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, cachedTrack, track;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = this.cache.generateKey('track', id);
                        return [4 /*yield*/, this.cache.get(cacheKey)];
                    case 1:
                        cachedTrack = _a.sent();
                        if (cachedTrack) {
                            return [2 /*return*/, cachedTrack];
                        }
                        return [4 /*yield*/, this.prisma.track.findUnique({
                                where: { id: id },
                                include: {
                                    artist: true,
                                    nft: true,
                                },
                            })];
                    case 2:
                        track = _a.sent();
                        if (!track) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cache.set(cacheKey, track)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, track];
                }
            });
        });
    };
    TracksService.prototype.uploadToIPFS = function (file, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var fileResult, metadataWithFile, metadataResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ipfs.add(file)];
                    case 1:
                        fileResult = _a.sent();
                        metadataWithFile = __assign(__assign({}, metadata), { file: "ipfs://".concat(fileResult.path) });
                        return [4 /*yield*/, this.ipfs.add(JSON.stringify(metadataWithFile))];
                    case 2:
                        metadataResult = _a.sent();
                        return [2 /*return*/, "ipfs://".concat(metadataResult.path)];
                }
            });
        });
    };
    TracksService.prototype.mintTrackNFT = function (track, file, signer) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, ipfsUri, contractWithSigner, tx, receipt, event, tokenId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metadata = {
                            name: track.title,
                            description: track.description,
                            artist: track.artistId,
                            duration: track.duration,
                            genre: track.genre,
                        };
                        return [4 /*yield*/, this.uploadToIPFS(file, metadata)];
                    case 1:
                        ipfsUri = _a.sent();
                        contractWithSigner = this.contract.connect(signer);
                        return [4 /*yield*/, contractWithSigner.mintTrack(ipfsUri, ethers_1.ethers.utils.parseEther(track.price.toString()), track.royaltyFee * 100)];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 3:
                        receipt = _a.sent();
                        event = receipt.events.find(function (e) { return e.event === 'TrackMinted'; });
                        tokenId = event.args.tokenId.toString();
                        // Invalidate cache after minting
                        return [4 /*yield*/, this.cache.invalidatePattern("track:".concat(track.id, "*"))];
                    case 4:
                        // Invalidate cache after minting
                        _a.sent();
                        return [2 /*return*/, tokenId];
                }
            });
        });
    };
    TracksService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [prisma_service_1.PrismaService,
            cache_service_1.CacheService,
            config_1.ConfigService])
    ], TracksService);
    return TracksService;
}());
exports.TracksService = TracksService;
