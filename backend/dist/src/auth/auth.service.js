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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const siwe_1 = require("siwe");
const prisma_service_1 = require("../prisma/prisma.service");
const ethers_1 = require("ethers");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getNonce(address) {
        const user = await this.prisma.user.upsert({
            where: { address: address.toLowerCase() },
            update: {},
            create: { address: address.toLowerCase() },
        });
        return { nonce: user.nonce };
    }
    async verify(message, signature) {
        try {
            const siweMessage = new siwe_1.SiweMessage(message);
            const fields = await siweMessage.validate(signature);
            const user = await this.prisma.user.findUnique({
                where: { address: fields.address.toLowerCase() },
            });
            if (!user || user.nonce !== fields.nonce) {
                throw new common_1.UnauthorizedException('Invalid nonce');
            }
            await this.prisma.user.update({
                where: { id: user.id },
                data: { nonce: ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.randomBytes(32)) },
            });
            const token = this.jwtService.sign({
                sub: user.id,
                address: user.address,
                role: user.role,
            });
            return { token };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid signature');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map