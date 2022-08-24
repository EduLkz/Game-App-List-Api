import db from "../db";
import User from "../models/user.model";

class UserRepository{

    async findAllUsers(): Promise<User[]>{
        const query = `
            SELECT uuid, fullname, email, login
            FROM gameapp_user
        `

        const { rows } = await db.query<User>(query);

        return rows || [];
    }

    async findUsersByLogin(login: string): Promise<User>{
        const query = `
            SELECT *
            FROM gameapp_user
            WHERE login = $1 OR email = $1
        `

        const values = [login]
        const { rows } = await db.query<User>(query, values);
        const [ user ] = rows;

        return user;
    }

    async createUser(user: User): Promise<string>{
        const query = `
            INSERT INTO gameapp_user(
                fullname, email, login, password
            ) VALUES ( $1, $2, $3, crypt($4, $5) )
            RETURNING uuid
        `

        const values = [user.fullname, user.email, user.login, user.password, process.env.SALT];

        const { rows } = await db.query<{ uuid: string }>(query, values);
        const [ newUser ] = rows;

        return newUser.uuid;
    }

}

export default new UserRepository();