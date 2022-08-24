import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import userRepositories from "../repositories/user.repositories";

const userRoutes = Router();

userRoutes.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepositories.findAllUsers();
    res.status(StatusCodes.OK).json(users);
})

userRoutes.get('/users/:login', async (req: Request<{ login: string }>, res: Response, next: NextFunction) => {
    const login = req.params.login;
    const user = await userRepositories.findUsersByLogin(login);

    res.status(StatusCodes.OK).json({user});
})


userRoutes.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    const uuid = await userRepositories.createUser(newUser);
    res.status(StatusCodes.CREATED).send(uuid);
})



export default userRoutes;