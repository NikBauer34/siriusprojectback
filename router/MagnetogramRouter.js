import { Router } from "express";
const MagnetogramRouter = new Router()

MagnetogramRouter.post('/create_magnetogram')
MagnetogramRouter.get('/get_magnetogram/:id')
MagnetogramRouter.get('/get_magnetograms/:id')
MagnetogramRouter.delete('/delete_magnetogram/:id')