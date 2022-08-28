"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const database_error_1 = __importDefault(require("../models/errors/database.error"));
class UserRepository {
    async findAllUsers() {
        try {
            const query = `
                SELECT uuid, fullname, email, login
                FROM gameapp_user
            `;
            const { rows } = await db_1.default.query(query);
            return rows || [];
        }
        catch (e) {
            throw new database_error_1.default('DatabaseError: ', e);
        }
    }
    async findUsersByID(uuid) {
        try {
            const query = `
                SELECT uuid, fullname, email, login
                FROM gameapp_user 
                    WHERE uuid = $1
            `;
            const values = [uuid];
            const { rows } = await db_1.default.query(query, values);
            const [userLogin] = rows;
            return userLogin;
        }
        catch (e) {
            throw new database_error_1.default('DatabaseError: ', e);
        }
    }
    async findUsersByLogin(login, password) {
        try {
            const query = `
                SELECT uuid, fullname, email, login
                FROM gameapp_user 
                    WHERE uuid = 
                        (SELECT uuid
                        FROM gameapp_user
                        WHERE login = $1 OR email = $1)
                AND password = crypt($2, $3)
            `;
            const values = [login, password, process.env.SALT];
            const { rows } = await db_1.default.query(query, values);
            const [userLogin] = rows;
            return userLogin;
        }
        catch (e) {
            throw new database_error_1.default('DatabaseError: ', e);
        }
    }
    async createUser(user) {
        try {
            const query = `
                INSERT INTO gameapp_user(
                    fullname, email, login, password
                ) VALUES ( $1, $2, $3, crypt($4, $5) )
                RETURNING uuid
            `;
            const values = [user.fullname, user.email, user.login, user.password, process.env.SALT];
            const { rows } = await db_1.default.query(query, values);
            const [newUser] = rows;
            return newUser.uuid;
        }
        catch (e) {
            throw new database_error_1.default('DatabaseError: ', e);
        }
    }
    async changePassword(uuid, password, new_password) {
        try {
            const query = `
                UPDATE gameapp_user
                SET
                    password = crypt($3, $4)
                WHERE
                    uuid = $1 AND password = crypt($2, $4)
            `;
            const values = [uuid, password, new_password, process.env.SALT];
            const { rows } = await db_1.default.query(query, values);
            const [newUser] = rows;
            return newUser.uuid;
        }
        catch (e) {
            throw new database_error_1.default('DatabaseError: ', e);
        }
    }
}
exports.default = new UserRepository();
