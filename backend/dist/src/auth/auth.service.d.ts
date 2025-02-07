import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getNonce(address: string): Promise<{
        nonce: any;
    }>;
    verify(message: string, signature: string): Promise<{
        token: string;
    }>;
}
