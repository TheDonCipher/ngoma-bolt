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
exports.WebsocketService = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let WebsocketService = class WebsocketService {
    emitTransaction(userId, transaction) {
        this.server
            .to(`transactions:${userId}`)
            .emit('transaction', transaction);
    }
    emitPriceUpdate(priceFeed) {
        this.server.to('prices').emit('price', priceFeed);
    }
    emitNotification(userId, notification) {
        this.server
            .to(`notifications:${userId}`)
            .emit('notification', notification);
    }
    emitToUser(userId, event, data) {
        this.server.to(`user:${userId}`).emit(event, data);
    }
    emitToAll(event, data) {
        this.server.emit(event, data);
    }
};
exports.WebsocketService = WebsocketService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketService.prototype, "server", void 0);
exports.WebsocketService = WebsocketService = __decorate([
    (0, common_1.Injectable)()
], WebsocketService);
//# sourceMappingURL=websocket.service.js.map