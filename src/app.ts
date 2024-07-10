import express, { Request, Response } from "express";
import { config } from "./@utils/config";
import dbConnection from "./db/dbConnection";
import router from "./routes"

const app = express();

// middleware
app.use(express.json())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true,parameterLimit:50000}))

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hoş geldiniz",
  });
});

app.use("/api",router)


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
