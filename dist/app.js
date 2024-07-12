"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const config_1 = require("./@utils/config");
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.get("/", (req, res) => {
    res.json({
        message: "Hoş geldiniz",
    });
});
app.use("/api", routes_1.default);
app.use(errorHandler_1.default);
(0, dbConnection_1.default)()
    .then(() => {
    app.listen(config_1.config.port, () => {
        console.log(`Express server is listening at http://localhost:${config_1.config.port}`);
    });
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});
