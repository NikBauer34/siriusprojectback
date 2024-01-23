import DotenvFlow from "dotenv-flow";
DotenvFlow.config();
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router/routing.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import fileupload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileupload());
app.use(express.static(__dirname + 'public'))
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node js api project for "Газпром"',
      version: '1.0.0'
    },
    servers: {
      url: process.env.API_URL + PORT
    }
  },
  apis: ['index.js']
}
// const swaggerSpec = swaggerJSDoc(swaggerOptions)
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use(cors(corsOptions));
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
start();