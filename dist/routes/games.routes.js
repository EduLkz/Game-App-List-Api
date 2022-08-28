"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const bearer_auth_middleware_1 = __importDefault(require("../middlewares/bearer-auth-middleware"));
const games_repositories_1 = __importDefault(require("../repositories/games.repositories"));
const gamesRoutes = (0, express_1.Router)();
gamesRoutes.get('/games/:uuid', bearer_auth_middleware_1.default, async (req, res, next) => {
    try {
        const user_uuid = req.params.uuid;
        const games = await games_repositories_1.default.GetUserGames(user_uuid);
        res.status(http_status_codes_1.StatusCodes.OK).json(games);
    }
    catch (e) {
        next(e);
    }
});
gamesRoutes.post('/games', bearer_auth_middleware_1.default, async (req, res, next) => {
    try {
        const { new_game } = req.body;
        const games = await games_repositories_1.default.AddUserGame(new_game);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(games);
    }
    catch (e) {
        next(e);
    }
});
gamesRoutes.post('/games/update', bearer_auth_middleware_1.default, async (req, res, next) => {
    try {
        const { game } = req.body;
        const games = await games_repositories_1.default.UpdateGame(game);
        res.status(http_status_codes_1.StatusCodes.OK).json(games);
    }
    catch (e) {
        next(e);
    }
});
gamesRoutes.delete('/games', bearer_auth_middleware_1.default, async (req, res, next) => {
    try {
        const { game } = req.body;
        const games = await games_repositories_1.default.DeleteGame(game);
        res.status(http_status_codes_1.StatusCodes.OK).json(games);
    }
    catch (e) {
        next(e);
    }
});
exports.default = gamesRoutes;
