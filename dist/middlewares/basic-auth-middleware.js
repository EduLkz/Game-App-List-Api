"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forbidden_error_1 = __importDefault(require("../models/errors/forbidden.error"));
const user_repositories_1 = __importDefault(require("../repositories/user.repositories"));
async function basicAuthMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            throw new forbidden_error_1.default('Unauthorized');
        }
        const [authType, token] = authorizationHeader.split(' ');
        if (authType !== 'Basic' || !token) {
            throw new forbidden_error_1.default('Unauthorized');
        }
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [login, password] = tokenContent.split(':');
        if (!login || !password) {
            throw new forbidden_error_1.default('Unauthorized');
        }
        const user = await user_repositories_1.default.findUsersByLogin(login, password);
        if (!user) {
            throw new forbidden_error_1.default('Usuario ou senha invalidos');
        }
        req.user = user;
        next();
    }
    catch (e) {
        next(e);
    }
}
exports.default = basicAuthMiddleware;
