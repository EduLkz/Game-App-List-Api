import { NextFunction, Request, Response } from "express";
import ForbidenError from "../models/errors/forbidden.error";
import userRepositories from "../repositories/user.repositories";
import JWT from 'jsonwebtoken';

async function bearerAuthMiddleware(error: any, req: Request, res: Response, next: NextFunction){
    try {
        const authorizationHeader = req.header('authorization');
        if(!authorizationHeader){
            throw new ForbidenError('Unauthorized');
        }

        const [authType, token] = authorizationHeader.split(' ');

        if(authType !== 'Bearer' || !token){
            throw new ForbidenError('Unauthorized');
        }

        let secret_key = process.env.SECRET;

        if(!secret_key){
            throw new Error('Something went wrong');
        }

        const tokenPayload = JWT.verify(token, secret_key);

        if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
            throw new ForbidenError('Invalid Token');
        }

        const uuid = tokenPayload.sub;

        if(!uuid){
            throw new ForbidenError('Unauthorized');
        }

        const user = tokenPayload.user;
        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
}

export default bearerAuthMiddleware;