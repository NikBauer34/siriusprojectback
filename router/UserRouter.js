import { Router } from "express";
import UserController from "../controllers/UserController.js";
import roleMiddleware from "../middlewares/role-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const UserRouter = new Router()

UserRouter.post('/registration', UserController.registration)
UserRouter.post('/login', UserController.login)
UserRouter.post('/logout', UserController.logout)
UserRouter.get('/rolecheck', roleMiddleware(['Начальник']), UserController.RoleCheck)
UserRouter.get('/authcheck', authMiddleware, UserController.AuthCheck)
export default UserRouter