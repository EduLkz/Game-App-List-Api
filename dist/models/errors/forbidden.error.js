"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ForbidenError extends Error {
    constructor(message, error) {
        super(message);
        this.message = message;
        this.error = error;
    }
}
exports.default = ForbidenError;
