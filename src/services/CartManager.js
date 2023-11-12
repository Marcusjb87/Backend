import fs from 'fs/promises'
import { Cart } from '../models/Cart.js'

export class CartManager {
    static proxIdCart = 1
    carts
    constructor({path}) {
        this.path = path
        this.carts = []
    }
    async getCarts() {
        await this.Carts()
        return this.carts
    }
    static getIdParaNuevoCart() {
        return CartManager.proxIdCart++
    }

    async readCarts() {
        const cartsEnJson = await fs.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(cartsEnJson)
    }

    async writeCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts))
    }

    async addCart(id, products) {
        if (this.carts.length !== 0) {
            await writeCarts();
        }
        const idCart = CartManager.getIdParaNuevoCart()
        const cart = new Cart({ id: idCart, products })    
        await this.readCarts()
        this.carts.push(cart)
        await this.writeCarts()
        return cart
    }
    
    async getCartById(idCart) {
        await this.readCarts()
        const cart = this.carts.find(c => c.id === idCart)
        if (!cart) {
            throw new Error("Not found")
        }
        return cart
    }

    async updateCart(id, products) {
        await this.readCarts()
        const index = this.carts.findIndex(c => c.id === id)
        if (index !== -1) {
          const nuevoCart = new Cart({ id, products })
          this.carts[index] = nuevoCart
          await this.writeCarts()
          return nuevoCart
        } else {
          throw new Error('error al actualizar: carrito no encontrado')
        }
    }
}