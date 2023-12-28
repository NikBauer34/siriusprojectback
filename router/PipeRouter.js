import { Router } from "express";
import roleMiddleware from "../middlewares/role-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import PipeController from '../controllers/PipeController.js'
const PipeRouter = new Router()

PipeRouter.post('/create_pipe', roleMiddleware(['вторая ступень']), PipeController.createPipe)
PipeRouter.get('/get_pipe/:id', authMiddleware, PipeController.getPipe)
PipeRouter.get('/get_pipe_user', roleMiddleware(['вторая ступень']), PipeController.getPipeByUserId)
PipeRouter.get('/get_pipes', authMiddleware, PipeController.getAllPipes)
PipeRouter.post('/new_member/:id', authMiddleware, PipeController.newMember)
PipeRouter.delete('/delete_pipe/:id', roleMiddleware(['вторая ступень']), PipeController.deletePipe)
export default PipeRouter