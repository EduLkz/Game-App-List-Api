import { Router, Request, Response } from "express";
import StatusCodes from 'http-status-codes';

const statusRoutes = Router();

statusRoutes.get('/status', (req: Request, res: Response) =>{ 
    return res.status(StatusCodes.OK).send('Ok'); 
})


export default statusRoutes;