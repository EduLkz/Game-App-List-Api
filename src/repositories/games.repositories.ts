import db from "../db";
import DatabaseError from "../models/errors/database.error";
import Game from "../models/game.model";

class GameRepository{

    async GetUserGames(userUuid: string) : Promise<Game[]>{
        try{
            const query = `
                SELECT * 
                FROM gameapp_games
                WHERE user_uuid = $1
            `

            const values = [userUuid];

            const { rows } = await db.query<Game>(query, values);

            return rows || [];
        }catch(e){
            throw new DatabaseError('Database Error', e);
        }
    }

    async AddUserGame(new_game: Game): Promise<Game> {
        try {
            const query = `
                INSERT INTO gameapp_games
                ( user_uuid, game_name, date_added, game_type )
                VALUES
                ( $1, $2, $3, $4 )
                RETURNING game_name, date_added, game_type
            `;
            
            const values = [new_game.user_uuid, new_game.game_name, new_game.date_added, new_game.game_type];

            const { rows } = await db.query<Game>(query, values);
            const [ added_game ] = rows;

            return added_game;
        } catch (e) {
            throw new DatabaseError('Database Error', e);
        }
    }

    async UpdateGame(game: Game): Promise<Game> {
        try {
            const query = `
                UPDATE gameapp_games
                SET
                    game_type = $1
                WHERE
                    user_uuid = $2 AND game_name = $3
                RETURNING *
            `
    
            const values = [game.game_type, game.user_uuid, game.game_name];
    
            const { rows } = await db.query<Game>(query, values);
            const [ updatedGame ] = rows;
    
            return updatedGame;
        } catch (e) {
            throw new DatabaseError('Database Error', e);
        }
    }

    async DeleteGame(game: Game) :Promise<void> {
        try {
            const query = `
                DELETE
                FROM gameapp_games
                WHERE
                game_name = $1 AND user_uuid = $2
            `
    
            const values = [game.game_name, game.user_uuid];
    
            await db.query<Game>(query, values);
        } catch (e) {
            throw new DatabaseError('Database Error', e);
        }
    }
}


export default new GameRepository();