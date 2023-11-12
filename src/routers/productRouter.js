import { Router } from "express"
import { ProductManager } from "../services/ProductManager.js"

export const productManager = new ProductManager ({ path: '.../db/productos.json' })

export const productRouter = Router()

productRouter.get('/', async (req, res) => {
    const limit = parseInt(String(req.query.limit))
    if (limit) {
        res.json(products.slice(0, limit))
    } else {
        res.json({
            products: await productManager.getProducts()
        })
    }
})

productRouter.get('/:pid', async (req, res) => {
    const idProduct = parseInt(req.params['pid'])
    const buscado = await productManager.getProductById(idProduct)
    if (buscado) {
        res.json({ producto: buscado })
    } else {
        res.json({ error: `No se encontró el producto con id ${idProduct}` })
    }
})

productRouter.post('/', async (req, res) => {
    const datosProduct = req.body
    const agregado = await productManager.addProduct(datosProduct)
    res.json(agregado)
})

productRouter.put('/:pid', async (req, res) => {
    const idProduct = parseInt(req.params['pid'])
    const buscado = await productManager.getProductById(idProduct)
    const datosActualizados = req.body
    const actualizado = await productManager.updateProduct(datosActualizados)
    if (buscado) {
        res.json({ producto: actualizado })
    } else {
        res.json({ error: `No se encontró el producto con id ${idProduct}` })
    }
})

productRouter.delete('/:pid', async (req, res) => {
    const idProduct = parseInt(req.params['pid'])
    const borrado = await productManager.deleteProduct(idProduct)
    if (borrado) {
        res.json({ producto: borrado })
    } else {
        res.json({ error: `No se encontró el producto con id ${idProduct}` })
    }
})