"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const database_error_1 = __importDefault(require("../models/errors/database.error"));
class GameRepository {
    async GetUserGames(userUuid) {
        try {
            const query = `
                SELECT * 
                FROM gameapp_games
                WHERE user_uuid = $1
            `;
            const values = [userUuid];
            const { rows } = await db_1.default.query(query, values);
            return rows || [];
        }
        catch (e) {
            throw new database_error_1.default('Database Error', e);
        }
    }
    async AddUserGame(new_game) {
        try {
            const query = `
                INSERT INTO gameapp_games
                ( user_uuid, game_name, date_added, game_type )
                VALUES
                ( $1, $2, $3, $4 )
                RETURNING game_name, date_added, game_type
            `;
            const values = [new_game.user_uuid, new_game.game_name, new_game.date_added, new_game.game_type];
            const { rows } = await db_1.default.query(query, values);
            const [added_game] = rows;
            return added_game;
        }
        catch (e) {
            throw new database_error_1.default('Database Error', e);
        }
    }
    async UpdateGame(game) {
        try {
            const query = `
                UPDATE gameapp_games
                SET
                    game_type = $1
                WHERE
                    user_uuid = $2 AND game_name = $3
                RETURNING *
            `;
            const values = [game.game_type, game.user_uuid, game.game_name];
            const { rows } = await db_1.default.query(query, values);
            const [updatedGame] = rows;
            return updatedGame;
        }
        catch (e) {
            throw new database_error_1.default('Database Error', e);
        }
    }
    async DeleteGame(game) {
        try {
            const query = `
                DELETE
                FROM gameapp_games
                WHERE
                game_name = $1 AND user_uuid = $2
            `;
            const values = [game.game_name, game.user_uuid];
            await db_1.default.query(query, values);
        }
        catch (e) {
            throw new database_error_1.default('Database Error', e);
        }
    }
}
exports.default = new GameRepository();
