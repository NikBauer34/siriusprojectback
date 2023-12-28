import DotenvFlow from "dotenv-flow";
DotenvFlow.config();
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router/routing.js";
import errorMiddleware from "./middlewares/error-middleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions ={
  origin: process.env.CLIENT_URL,
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use('/', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
start()