import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import gamesRepositories from "../repositories/games.repositories";

const gamesRoutes = Router();

gamesRoutes.get('/games/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const user_uuid = req.params.uuid;
        const games = await gamesRepositories.GetUserGames(user_uuid);
        res.status(StatusCodes.OK).json(games);
    }catch(e){
        next(e)
    }
})


gamesRoutes.post('/games', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const new_game = req.body;
        const games = await gamesRepositories.AddUserGame(new_game);
        res.status(StatusCodes.CREATED).json(games);
    }catch(e){
        next(e)
    }
})

export default gamesRoutes;