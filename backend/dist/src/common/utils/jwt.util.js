"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const configService = new config_1.ConfigService();
async function verifyToken(token) {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.verify)(token, configService.get('JWT_SECRET'), (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
}
//# sourceMappingURL=jwt.util.js.map