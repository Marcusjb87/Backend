import express from 'express'
import { ProductManager } from './ProductManager.js'

const productManager = new ProductManager('./db/products.json')

const app = express()

app.get('/products', async (req, res) => {
    const limit = parseInt(String(req.query.limit))
    if (limit) {
        res.json(products.slice(o, limit))
    } else {
        res.json({
            products: await productManager.getProducts()
        })
    }
})

app.get('/products/:pid', async (req, res) => {
    const idProduct = parseInt(req.params['pid'])
    const buscado = await productManager.getProductById(idProduct)
    if (buscado) {
        res.json({ producto: buscado })
    } else {
        res.json({ error: `No se encontró el producto con id ${idProduct}` })
    }
})

app.listen(8080, () => {
    console.log('Conectado al puerto 8080')
})