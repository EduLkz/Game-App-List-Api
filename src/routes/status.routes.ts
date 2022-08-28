import { Request, Response, Router } from "express";

const statusRoutes = Router();

statusRoutes.get('/status', (req: Request, res: Response) =>{ 
    return res.status(200).send('Ok'); 
})


export default statusRoutes;