import { Router } from "express";
import authMiddleware from '../middlewares/auth-middleware.js'
import MagnetogramController from "../controllers/MagnetogramController.js";
const MagnetogramRouter = new Router()

MagnetogramRouter.post('/create_magnetogram', authMiddleware, MagnetogramController.createMagnetogram)
MagnetogramRouter.get('/get_magnetogram/:id', authMiddleware, MagnetogramController.getMagnetogram)
MagnetogramRouter.get('/get_magnetograms', authMiddleware, MagnetogramController.getAllMagnetograms)
// MagnetogramRouter.POST('/create_magnetogram_version', authMiddleware, )
MagnetogramRouter.get('/get_pipe_magnetograms/:id', authMiddleware, MagnetogramController.getPipeMagnitograms)
MagnetogramRouter.get('/get_magnetogram_markup_data', authMiddleware, MagnetogramController.getMagnetogramMarkupData)
MagnetogramRouter.get('/get_magnetogram_versions_data/:id', authMiddleware, MagnetogramController.getMagnetogramVersionsData)
MagnetogramRouter.get('/get_pipe_magnetograms_by_title', authMiddleware, MagnetogramController.getPipeMagnetogramsByTitle)
MagnetogramRouter.get('/get_magnetogram_versions_comparison', authMiddleware, MagnetogramController.getMagnetogramVersionsComparison)
MagnetogramRouter.delete('/delete_magnetogram/:id', authMiddleware, MagnetogramController.deleteMagnetogram)

export default MagnetogramRouter;