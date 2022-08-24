import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import userRepositories from "../repositories/user.repositories";

const userRoutes = Router();

userRoutes.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await userRepositories.findAllUsers();
        res.status(StatusCodes.OK).json(users);
    }catch(e){
        next(e);
    }
})

userRoutes.get('/users/:login', async (req: Request<{ login: string, password: string }>, res: Response, next: NextFunction) => {
    try {
        const login = req.params.login;
        const password = req.params.password;
        const user = await userRepositories.findUsersByLogin(login, password);
        
        res.status(StatusCodes.OK).json({user});
    } catch (e) {
        next(e);
    }

})


userRoutes.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newUser = req.body;

        const uuid = await userRepositories.createUser(newUser);
        res.status(StatusCodes.CREATED).send(uuid);
    }catch(e){
        next (e);
    }
})



export default userRoutes;