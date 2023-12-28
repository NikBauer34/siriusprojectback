import { Router } from "express";
import TokenController from "../controllers/TokenController.js";
const TokenRouter = new Router()

TokenRouter.get('/refresh', TokenController.refresh)

export default TokenRouter