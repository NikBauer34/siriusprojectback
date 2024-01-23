import { Router } from "express";
import UserRouter from "./UserRouter.js";
import TokenRouter from "./TokenRouter.js";
import RequestRouter from "./RequestRouter.js";
import PipeRouter from "./PipeRouter.js";
import MagnetogramRouter from "./MagnetogramRouter.js";
const router = new Router();

router.use('/user', UserRouter)
router.use('/token', TokenRouter)
router.use('/pipe', PipeRouter)
router.use('/magnetogram', MagnetogramRouter)
router.use('/request', RequestRouter)

export default router;