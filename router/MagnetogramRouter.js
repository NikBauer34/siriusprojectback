import { Router } from "express";
import authMiddleware from '../middlewares/auth-middleware.js'
import MagnetogramController from "../controllers/MagnetogramController.js";
const MagnetogramRouter = new Router()

MagnetogramRouter.post('/create_magnetogram', authMiddleware, MagnetogramController.createMagnetogram)
MagnetogramRouter.get('/get_magnetogram/:id', authMiddleware, MagnetogramController.getMagnetogram)
MagnetogramRouter.get('/get_magnetograms', authMiddleware, MagnetogramController.getAllMagnetograms)
MagnetogramRouter.get('/get_pipe_magnetograms/:id', authMiddleware, MagnetogramController.getPipeMagnitograms)
MagnetogramRouter.delete('/delete_magnetogram/:id', authMiddleware, MagnetogramController.deleteMagnetogram)

export default MagnetogramRouter;