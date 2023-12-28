import { Router } from "express";
import RequestController from "../controllers/RequestController.js";
import roleMiddleware from "../middlewares/role-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const RequestRouter = new Router();

RequestRouter.get('/get_request/:id', roleMiddleware(['вторая ступень']), RequestController.getRequest)
RequestRouter.get('/get_requests', roleMiddleware(['вторая ступень']), RequestController.getRequests)
RequestRouter.post('/create_request', authMiddleware, RequestController.createRequest)

export default RequestRouter