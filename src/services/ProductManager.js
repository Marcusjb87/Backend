import fs from 'fs/promises'
import { Product } from '../models/Product.js'

export class ProductManager {
    static proxIdProduct = 1
    products
    constructor({path}) {
        this.path = path
        this.products = []
    }
    async getProducts() {
        await this.readProducts()
        return this.products
    }
    static getIdParaNuevoProduct() {
        return ProductManager.proxIdProduct++
    }

    async readProducts() {
        const productsEnJson = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(productsEnJson)
    }

    async writeProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    async addProduct(propiedades) {
        if (this.products.length !== 0) {
            await writeProducts();
        }
        const idProduct = ProductManager.getIdParaNuevoProduct()
        const product = new Product({ id: idProduct, ...propiedades })
        const codigoExistente = this.products.find((prod) => prod.code === product.code)
        if (codigoExistente) {
            throw new Error("Código ya existente. Por favor, introducir un nuevo código")
        }    
        await this.readProducts()
        this.products.push(product)
        await this.writeProducts()
        return product
    }
    
    async getProductById(idProduct) {
        await this.readProducts()
        const product = this.products.find(p => p.id === idProduct)
        if (!product) {
            throw new Error("Not found")
        }
        return product
    }

    async updateProduct(id, productData) {
        await this.readProducts()
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          const nuevoProduct = new Product({ id, ...this.products[index], ...productData })
          this.products[index] = nuevoProduct
          await this.writeProducts()
          return nuevoProduct
        } else {
          throw new Error('error al actualizar: producto no encontrado')
        }
    }
    
    async deleteProduct(id) {
        await this.readProducts()
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          const arrayConLosBorrados = this.products.splice(index, 1)
          await this.writeProducts()
          return arrayConLosBorrados[0]
        } else {
          throw new Error('error al borrar: producto no encontrado')
        }
    }
}