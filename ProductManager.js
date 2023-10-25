const { promises: fs } = require('fs')

class Product { 
    constructor({id, title, description, price, thumbnail, code, stock}) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

class ProductManager {
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
        const idProduct = ProductManager.getIdParaNuevoProduct()
        const product = new Product({ id: idProduct, ...propiedades })
        const codigoExistente = product.code
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

//Pruebas
async function main() {

    const pm = new ProductManager({path: 'products.json'})

    const prod1 = await pm.addProduct({
    id: 1,
    title: 'CPU',
    description: 'AMD Brand',
    price: 21,
    thumbnail: 'No Img Yet',
    code: 'R7',
    stock: 17
    })

    console.log(prod1)

    console.log(await pm.getProducts())
}

main()