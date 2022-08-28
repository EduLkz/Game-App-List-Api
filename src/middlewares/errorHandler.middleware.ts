import { NextFunction, Request, Response } from "express";
import DatabaseError from "../models/errors/database.error";
import ForbidenError from "../models/errors/forbidden.error";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    if(error instanceof DatabaseError){
        res.status(400)
    }else if(error instanceof  ForbidenError){
        res.status(403)
    }else{
        res.status(500);
    }
}

export default errorHandler;