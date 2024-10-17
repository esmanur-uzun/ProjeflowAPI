import "express-async-errors"
import express, { Request, Response } from "express";
import { config } from "./@utils/config";
import dbConnection from "./db/dbConnection";
import router from "./routes"
import errorHandlerMiddleware from "./middlewares/errorHandler";
import path from "path"

const app = express();

// middleware
app.use(express.json())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true,parameterLimit:50000}))

app.use(express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(__dirname))

app.use("/api",router)
app.use(errorHandlerMiddleware)

dbConnection()
  .then(() => {
    app.listen(config.port, () => {
      console.log(
        `Express server is listening at http://localhost:${config.port}`
      );
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
