require('dotenv').config()
import express from "express";
import statusRoutes from "./routes/status.routes";
import userRoutes from "./routes/users.routes";

const app = express();

const port = process.env.PORT;

app.use(express.json())

app.use(statusRoutes);
app.use(userRoutes);


app.listen(port, () => console.log(`Server at port: ${port}`));