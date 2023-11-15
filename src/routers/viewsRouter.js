import { Router } from "express"
import { productManager } from "./productRouter"

export const viewsRouter = Router()

viewsRouter.post('/', async (req, res) => {
    await productManager.addProduct(req.body.product)
    req['io'].sockets.emit('products', await productManager.getProducts())
    res.json({ status: 'ok' })
  })

