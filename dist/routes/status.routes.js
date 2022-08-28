"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statusRoutes = (0, express_1.Router)();
statusRoutes.get('/status', (req, res) => {
    return res.status(200).send('Ok');
});
exports.default = statusRoutes;
