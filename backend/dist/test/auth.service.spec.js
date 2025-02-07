"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("../src/auth/auth.service");
const prisma_service_1 = require("../src/prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
describe('AuthService', () => {
    let authService;
    let prismaService;
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: prisma_service_1.PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                            update: jest.fn(),
                        },
                    },
                },
                {
                    provide: jwt_1.JwtService,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();
        authService = moduleRef.get(auth_service_1.AuthService);
        prismaService = moduleRef.get(prisma_service_1.PrismaService);
    });
    describe('verify', () => {
        it('should verify signature and return token', async () => {
            const mockUser = {
                id: '1',
                address: '0x123',
                nonce: 'test-nonce',
            };
            prismaService.user.findUnique.mockResolvedValue(mockUser);
            const result = await authService.verify('message', 'signature');
            expect(result).toHaveProperty('token');
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map