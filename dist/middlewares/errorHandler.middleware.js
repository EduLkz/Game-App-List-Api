"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_error_1 = __importDefault(require("../models/errors/database.error"));
const forbidden_error_1 = __importDefault(require("../models/errors/forbidden.error"));
function errorHandler(error, req, res, next) {
    if (error instanceof database_error_1.default) {
        res.status(400);
    }
    else if (error instanceof forbidden_error_1.default) {
        res.status(403);
    }
    else {
        res.status(500);
    }
}
exports.default = errorHandler;
