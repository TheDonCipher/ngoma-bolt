import { RecoveryService } from './recovery.service';
import { InitiateRecoveryDto } from './dto/initiate-recovery.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class RecoveryController {
    private readonly recoveryService;
    constructor(recoveryService: RecoveryService);
    initiateRecovery(dto: InitiateRecoveryDto, ipAddress: string): Promise<{
        message: string;
    }>;
    validateToken(token: string): Promise<{
        isValid: boolean;
    }>;
    resetPassword(dto: ResetPasswordDto, ipAddress: string): Promise<{
        message: string;
    }>;
}
