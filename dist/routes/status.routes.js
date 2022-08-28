"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const statusRoutes = (0, express_1.Router)();
statusRoutes.get('/status', (req, res) => {
    return res.status(http_status_codes_1.default.OK).send('Ok');
});
exports.default = statusRoutes;
