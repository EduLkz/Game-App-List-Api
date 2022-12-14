import { NextFunction, Request, Response, Router } from "express";
import bearerAuthMiddleware from "../middlewares/bearer-auth-middleware";
import userRepositories from "../repositories/user.repositories";

const userRoutes = Router();

userRoutes.get('/users', bearerAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await userRepositories.findAllUsers();
        res.status(200).json(users);
    }catch(e){
        next(e);
    }
})

userRoutes.post('/users/login', bearerAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { login, password } = req.body;
        const user = await userRepositories.findUsersByLogin(login, password);
        
        res.status(200).json({user});
    } catch (e) {
        next(e);
    }

})


userRoutes.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newUser = req.body;

        const uuid = await userRepositories.createUser(newUser);
        res.status(201).send(uuid);
    }catch(e){
        next (e);
    }
})

userRoutes.post('/users/change-password', bearerAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { uuid, password, new_password } = req.body;

        const useruuid = await userRepositories.changePassword(uuid, password, new_password);
        res.status(200).send(useruuid);
    }catch(e){
        next (e);
    }
})



export default userRoutes;