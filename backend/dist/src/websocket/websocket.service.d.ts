import { TransactionEvent, PriceFeed, UserNotification } from '@/lib/types/web3';
export declare class WebsocketService {
    private server;
    emitTransaction(userId: string, transaction: TransactionEvent): void;
    emitPriceUpdate(priceFeed: PriceFeed): void;
    emitNotification(userId: string, notification: UserNotification): void;
    emitToUser(userId: string, event: string, data: any): void;
    emitToAll(event: string, data: any): void;
}
