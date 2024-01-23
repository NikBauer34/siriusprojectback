import { Router } from "express";
import RequestController from "../controllers/RequestController.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const RequestRouter = new Router();

RequestRouter.get('/get_request/:id', authMiddleware, RequestController.getRequest)
RequestRouter.get('/get_requests', authMiddleware, RequestController.getRequests)
RequestRouter.post('/create_request', authMiddleware, RequestController.createRequest)

export default RequestRouter;