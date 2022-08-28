"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const forbidden_error_1 = __importDefault(require("../models/errors/forbidden.error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const basic_auth_middleware_1 = __importDefault(require("../middlewares/basic-auth-middleware"));
const authRoutes = (0, express_1.Router)();
authRoutes.post('/token', basic_auth_middleware_1.default, async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            throw new forbidden_error_1.default('Usuario invalidos');
        }
        let secret_key = process.env.SECRET;
        if (!secret_key) {
            throw new Error();
        }
        if (!user.uuid) {
            throw new forbidden_error_1.default('Usuario ou senha invalidos');
        }
        const jwt = jsonwebtoken_1.default.sign({ user: user }, secret_key, { subject: user.uuid });
        res.status(http_status_codes_1.StatusCodes.OK).json({ user: user, token: jwt });
    }
    catch (e) {
        next(e);
    }
});
exports.default = authRoutes;
