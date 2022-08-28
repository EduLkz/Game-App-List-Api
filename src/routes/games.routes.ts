import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import bearerAuthMiddleware from "../middlewares/bearer-auth-middleware";
import gamesRepositories from "../repositories/games.repositories";

const gamesRoutes = Router();

gamesRoutes.get('/games/:uuid', bearerAuthMiddleware, async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const user_uuid = req.params.uuid;
        const games = await gamesRepositories.GetUserGames(user_uuid);
        res.status(StatusCodes.OK).json(games);
    }catch(e){
        next(e)
    }
})


gamesRoutes.post('/games', bearerAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { new_game } = req.body;
        const games = await gamesRepositories.AddUserGame(new_game);
        res.status(StatusCodes.CREATED).json(games);
    }catch(e){
        next(e)
    }
})


gamesRoutes.post('/games/update', bearerAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { game } = req.body;
        const games = await gamesRepositories.UpdateGame(game);
        res.status(StatusCodes.OK).json(games);
    }catch(e){
        next(e)
    }
})


gamesRoutes.delete('/games', bearerAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { game } = req.body;
        const games = await gamesRepositories.DeleteGame(game);
        res.status(StatusCodes.OK).json(games);
    }catch(e){
        next(e)
    }
})

export default gamesRoutes;