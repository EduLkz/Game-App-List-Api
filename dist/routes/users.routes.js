"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bearer_auth_middleware_1 = __importDefault(require("../middlewares/bearer-auth-middleware"));
const user_repositories_1 = __importDefault(require("../repositories/user.repositories"));
const userRoutes = (0, express_1.Router)();
userRoutes.get('/users', bearer_auth_middleware_1.default, async (req, res, next) => {
    try {
        const users = await user_repositories_1.default.findAllUsers();
        res.status(200).json(users);
    }
    catch (e) {
        next(e);
    }
});
userRoutes.post('/users/login', bearer_auth_middleware_1.default, async (req, res, next) => {
    try {
        const { login, password } = req.body;
        const user = await user_repositories_1.default.findUsersByLogin(login, password);
        res.status(200).json({ user });
    }
    catch (e) {
        next(e);
    }
});
userRoutes.post('/users', async (req, res, next) => {
    try {
        const newUser = req.body;
        const uuid = await user_repositories_1.default.createUser(newUser);
        res.status(201).send(uuid);
    }
    catch (e) {
        next(e);
    }
});
userRoutes.post('/users/change-password', bearer_auth_middleware_1.default, async (req, res, next) => {
    try {
        const { uuid, password, new_password } = req.body;
        const useruuid = await user_repositories_1.default.changePassword(uuid, password, new_password);
        res.status(200).send(useruuid);
    }
    catch (e) {
        next(e);
    }
});
exports.default = userRoutes;
