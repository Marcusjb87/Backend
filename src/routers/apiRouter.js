import { Router } from "express";
import { productRouter } from "./productRouter.js";

export const apiRouter = Router()

apiRouter.use('/products', productRouter)