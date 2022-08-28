import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import ForbidenError from "../models/errors/forbidden.error";
import JWT from 'jsonwebtoken';
import basicAuthMiddleware from "../middlewares/basic-auth-middleware";

const authRoutes = Router();

authRoutes.post('/token', basicAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if(!user){
            throw new ForbidenError('Usuario invalidos');
        }
        

        let secret_key = process.env.SECRET;

        if(!secret_key){
            throw new Error();
        }

        if(!user.uuid){
            throw new ForbidenError('Usuario ou senha invalidos');
        }
        
        const jwt = JWT.sign({ user: user }, secret_key, { subject: user.uuid });

        res.status(StatusCodes.OK).json({ user:user, token: jwt });
    } catch (e) {
        next(e);
    }
})

export default authRoutes;