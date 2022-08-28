"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const database_error_1 = __importDefault(require("../models/errors/database.error"));
const forbidden_error_1 = __importDefault(require("../models/errors/forbidden.error"));
function errorHandler(error, req, res, next) {
    if (error instanceof database_error_1.default) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    else if (error instanceof forbidden_error_1.default) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    else {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
exports.default = errorHandler;
