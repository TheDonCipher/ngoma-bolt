import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from './websocket.service';
export declare class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly websocketService;
    private readonly logger;
    server: Server;
    constructor(websocketService: WebsocketService);
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleTransactionSubscription(client: Socket): {
        event: string;
        data: string;
    };
    handlePriceSubscription(client: Socket): {
        event: string;
        data: string;
    };
    handleNotificationSubscription(client: Socket): {
        event: string;
        data: string;
    };
}
