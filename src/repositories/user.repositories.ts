import db from "../db";
import DatabaseError from "../models/errors/database.error";
import User from "../models/user.model";

class UserRepository{

    async findAllUsers(): Promise<User[]>{
        try{
            const query = `
                SELECT uuid, fullname, email, login
                FROM gameapp_user
            `

            const { rows } = await db.query<User>(query);

            return rows || [];
        }catch(e){
            throw new DatabaseError('DatabaseError: ', e);
        }
    }

    async findUsersByID(uuid: string): Promise<User>{
        try{
            const query = `
                SELECT uuid, fullname, email, login
                FROM gameapp_user 
                    WHERE uuid = $1
            `

            const values = [uuid]
            const { rows } = await db.query<User>(query, values);
            const [ userLogin ] = rows;

            return userLogin;
        }catch(e){
            throw new DatabaseError('DatabaseError: ', e);
        }
    }

    async findUsersByLogin(login: string, password:string): Promise<User>{
        try{
            const query = `
                SELECT uuid, fullname, email, login
                FROM gameapp_user 
                    WHERE uuid = 
                        (SELECT uuid
                        FROM gameapp_user
                        WHERE login = $1 OR email = $1)
                AND password = crypt($2, $3)
            `

            const values = [login, password, process.env.SALT]
            const { rows } = await db.query<User>(query, values);
            const [ userLogin ] = rows;

            return userLogin;
        }catch(e){
            throw new DatabaseError('DatabaseError: ', e);
        }
    }

    async createUser(user: User): Promise<string>{
        try{
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
        }catch(e){
            throw new DatabaseError('DatabaseError: ', e);
        }
    }

    async changePassword(uuid: string, password: string, new_password: string){
        try {
            const query = `
                UPDATE gameapp_user
                SET
                    password = crypt($3, $4)
                WHERE
                    uuid = $1 AND password = crypt($2, $4)
            `

            const values = [uuid, password, new_password, process.env.SALT]

            const { rows } = await db.query<{ uuid: string }>(query, values);
            const [ newUser ] = rows;

            return newUser.uuid;
        } catch (e) {
            throw new DatabaseError('DatabaseError: ', e);
        }
    }
}

export default new UserRepository();