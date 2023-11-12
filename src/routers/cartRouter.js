import { Router } from "express"
import { CartManager } from "../services/CartManager.js"
import { productManager } from "./productRouter.js"

const cartManager = new CartManager({ path: '.../db/carrito.json' })

export const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    const datosCart = req.body
    const agregado = await cartManager.addCart(datosCart)
    res.json(agregado)
})

cartRouter.get('/:cid', async (req, res) => {
    const idCart = parseInt(req.params['cid'])
    const buscado = await cartManager.getCartById(idCart)
    if (buscado) {
        res.json({ cart: buscado })
    } else {
        res.json({ error: `No se encontró el carrito con id ${idCart}` })
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const idCart = parseInt(req.params['cid'])
    const idProduct = parseInt(req.params['pid'])
    const cartBuscado = await cartManager.getCartById(idCart)
    const productBuscado = await productManager.getProductById(idProduct)
    const datosActualizados = req.body
    const cartActualizado = await cartManager.updateCart(datosActualizados)
    if (cartBuscado && productBuscado) {
        res.json({ cart: cartActualizado })
    } else {
        res.json({ error: `No se encontró el carrito con id ${idCart} o el producto con id ${idProduct}` })
    }
})