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
var WebsocketGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const websocket_service_1 = require("./websocket.service");
const jwt_util_1 = require("../common/utils/jwt.util");
let WebsocketGateway = WebsocketGateway_1 = class WebsocketGateway {
    constructor(websocketService) {
        this.websocketService = websocketService;
        this.logger = new common_1.Logger(WebsocketGateway_1.name);
    }
    afterInit() {
        this.logger.log('WebSocket Gateway initialized');
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token;
            if (!token) {
                throw new Error('No token provided');
            }
            const decoded = await (0, jwt_util_1.verifyToken)(token);
            client.data.userId = decoded.sub;
            client.join(`user:${decoded.sub}`);
            this.logger.log(`Client connected: ${client.id}`);
        }
        catch (error) {
            this.logger.error(`Connection error: ${error.message}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleTransactionSubscription(client) {
        client.join(`transactions:${client.data.userId}`);
        return { event: 'subscribed', data: 'transactions' };
    }
    handlePriceSubscription(client) {
        client.join('prices');
        return { event: 'subscribed', data: 'prices' };
    }
    handleNotificationSubscription(client) {
        client.join(`notifications:${client.data.userId}`);
        return { event: 'subscribed', data: 'notifications' };
    }
};
exports.WebsocketGateway = WebsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe:transactions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleTransactionSubscription", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe:prices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handlePriceSubscription", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe:notifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleNotificationSubscription", null);
exports.WebsocketGateway = WebsocketGateway = WebsocketGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [websocket_service_1.WebsocketService])
], WebsocketGateway);
//# sourceMappingURL=websocket.gateway.js.map