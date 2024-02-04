import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import PipeController from '../controllers/PipeController.js';
const PipeRouter = new Router();

PipeRouter.post('/create_pipe', authMiddleware, PipeController.createPipe)
PipeRouter.get('/get_pipe/:id', authMiddleware, PipeController.getPipe)
PipeRouter.get('/get_pipe_user', authMiddleware, PipeController.getPipeByUserId)
/** 
  * @swagger
  * /pipe/get_pipes:
  *  get:
  *    summary: Получить общий список труб
  *    description: Получить общий список труб
  *    responses:
  *      200:
  *        description: Список труб
  *        content:
  *          application/json:
  *            schema:
  *              type: array
  *              items:
  *                type: object
  *                properties:
  *                  _id:
  *                    type: string
  *                    example: 3gf34hq3j
*/ 
PipeRouter.get('/get_pipes', authMiddleware, PipeController.getAllPipes)
PipeRouter.post('/new_member/:id', authMiddleware, PipeController.newMember)
PipeRouter.post('/new_user_pipe', authMiddleware, PipeController.newUserPipe)
PipeRouter.get('/get_pipe_statistics/:id', authMiddleware, PipeController.getPipeStatistics)
PipeRouter.delete('/delete_pipe/:id', authMiddleware, PipeController.deletePipe)

export default PipeRouter;