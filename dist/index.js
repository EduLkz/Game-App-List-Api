"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var cors = require('cors');
const express_1 = __importDefault(require("express"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const games_routes_1 = __importDefault(require("./routes/games.routes"));
const status_routes_1 = __importDefault(require("./routes/status.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
app.use(status_routes_1.default);
app.use(users_routes_1.default);
app.use(auth_routes_1.default);
app.use(games_routes_1.default);
app.use(errorHandler_middleware_1.default);
app.listen(process.env.PORT || 8000);
