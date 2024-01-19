import { Router } from "express";
import roleMiddleware from "../middlewares/role-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import PipeController from '../controllers/PipeController.js';
const PipeRouter = new Router()

PipeRouter.post('/create_pipe', roleMiddleware(['Начальник']), PipeController.createPipe)
PipeRouter.get('/get_pipe/:id', authMiddleware, PipeController.getPipe)
PipeRouter.get('/get_pipe_user', authMiddleware, PipeController.getPipeByUserId)
PipeRouter.get('/get_pipes', authMiddleware, PipeController.getAllPipes)
PipeRouter.post('/new_member/:id', authMiddleware, PipeController.newMember)
PipeRouter.post('/new_user_pipe', authMiddleware, PipeController.newUserPipe)
PipeRouter.get('/get_pipe_statistics/:id', authMiddleware, PipeController.getPipeStatistics)
PipeRouter.delete('/delete_pipe/:id', roleMiddleware(['Начальник']), PipeController.deletePipe)

export default PipeRouter;