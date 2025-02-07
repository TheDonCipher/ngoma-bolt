import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SanitizeInterceptor implements NestInterceptor {
    private readonly options;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private sanitizeData;
}
