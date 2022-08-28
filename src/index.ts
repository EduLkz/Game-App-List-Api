require('dotenv').config()
var cors = require('cors')
import express from "express";
import bearerAuthMiddleware from "./middlewares/bearer-auth-middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import authRoutes from "./routes/auth.routes";
import gamesRoutes from "./routes/games.routes";
import statusRoutes from "./routes/status.routes";
import userRoutes from "./routes/users.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());

app.use(statusRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(gamesRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 8000);