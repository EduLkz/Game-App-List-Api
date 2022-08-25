import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import ForbidenError from "../models/errors/forbidden.error";

const authRoutes = Router();

authRoutes.post('/token',  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
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
        
    } catch (e) {
        next(e);
    }
})

export default authRoutes;