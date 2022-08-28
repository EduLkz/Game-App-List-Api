"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forbidden_error_1 = __importDefault(require("../models/errors/forbidden.error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function bearerAuthMiddleware(error, req, res, next) {
    try {
        const authorizationHeader = req.header('authorization');
        if (!authorizationHeader) {
            throw new forbidden_error_1.default('Unauthorized');
        }
        const [authType, token] = authorizationHeader.split(' ');
        if (authType !== 'Bearer' || !token) {
            throw new forbidden_error_1.default('Unauthorized');
        }
        let secret_key = process.env.SECRET;
        if (!secret_key) {
            throw new Error('Something went wrong');
        }
        const tokenPayload = jsonwebtoken_1.default.verify(token, secret_key);
        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new forbidden_error_1.default('Invalid Token');
        }
        const uuid = tokenPayload.sub;
        if (!uuid) {
            throw new forbidden_error_1.default('Unauthorized');
        }
        const user = tokenPayload.user;
        req.user = user;
        next();
    }
    catch (e) {
        next(e);
    }
}
exports.default = bearerAuthMiddleware;
