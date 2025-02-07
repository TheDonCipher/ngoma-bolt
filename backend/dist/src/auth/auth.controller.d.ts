import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getNonce(address: string): Promise<{
        nonce: any;
    }>;
    verify(message: string, signature: string): Promise<{
        token: string;
    }>;
}
