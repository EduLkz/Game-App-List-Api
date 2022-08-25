import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.error";
import ForbidenError from "../models/errors/forbidden.error";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    if(error instanceof DatabaseError){
        res.status(StatusCodes.BAD_REQUEST)
    }else if(error instanceof  ForbidenError){
        res.status(StatusCodes.FORBIDDEN)
    }else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;