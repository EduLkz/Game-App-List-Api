import { NextFunction, Request, Response } from "express";
import ForbidenError from "../models/errors/forbidden.error";
import userRepositories from "../repositories/user.repositories";

async function basicAuthMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const authorizationHeader = req.headers['authorization']
    
        if(!authorizationHeader){
            throw new ForbidenError('Unauthorized');
        }

        const [authType, token] = authorizationHeader.split(' ');

        if(authType !== 'Basic' || !token){
            throw new ForbidenError('Unauthorized');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [login, password] = tokenContent.split(':');

        if(!login || !password){
            throw new ForbidenError('Unauthorized');
        }

        const user = await userRepositories.findUsersByLogin(login, password)

        if(!user){
            throw new ForbidenError('Usuario ou senha invalidos');
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
}

export default basicAuthMiddleware;