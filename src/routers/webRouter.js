import { Router } from "express"
import { productManager } from "./productRouter.js"

export const webRouter = Router()

webRouter.get('/', (req, res) => {
    res.render('home', { titulo: 'Inicio' })
})
  
webRouter.get('/products', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('products', {
      titulo: 'Products',
      hayProducts: products.length > 0,
      products: products
    })
})