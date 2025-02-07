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
var common_1 = require("@nestjs/common");
var websockets_1 = require("@nestjs/websockets");
var socket_io_1 = require("socket.io");
var WebsocketService = /** @class */ (function () {
    function WebsocketService() {
    }
    WebsocketService.prototype.emit = function (event, data) {
        this.server.emit(event, data);
    };
    WebsocketService.prototype.emitTransaction = function (userId, transaction) {
        this.server
            .to("transactions:".concat(userId))
            .emit('transaction', transaction);
    };
    WebsocketService.prototype.emitPriceUpdate = function (priceFeed) {
        this.server.to('prices').emit('price', priceFeed);
    };
    WebsocketService.prototype.emitNotification = function (userId, notification) {
        this.server
            .to("notifications:".concat(userId))
            .emit('notification', notification);
    };
    WebsocketService.prototype.emitToUser = function (userId, event, data) {
        this.server.to("user:".concat(userId)).emit(event, data);
    };
    WebsocketService.prototype.emitToAll = function (event, data) {
        this.server.emit(event, data);
    };
    __decorate([
        (0, websockets_1.WebSocketServer)(),
        __metadata("design:type", socket_io_1.Server)
    ], WebsocketService.prototype, "server", void 0);
    WebsocketService = __decorate([
        (0, common_1.Injectable)()
    ], WebsocketService);
    return WebsocketService;
}());
exports.WebsocketService = WebsocketService;
