import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.error";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction){
    let code;
    if(error instanceof DatabaseError){
        code = StatusCodes.BAD_REQUEST
    }else{
        code = StatusCodes.INTERNAL_SERVER_ERROR
    }
    
    res.status(code);
}

export default errorHandler;