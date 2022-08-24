require('dotenv').config()
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import gamesRoutes from "./routes/games.routes";
import statusRoutes from "./routes/status.routes";
import userRoutes from "./routes/users.routes";

const app = express();

const port = process.env.PORT;

app.use(express.json())

app.use(errorHandler);

app.use(statusRoutes);
app.use(userRoutes);
app.use(gamesRoutes);



app.listen(port, () => console.log(`Server at port: ${port}`));