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
    constructor() {
        this.products = []
    }
    getProducts() {
        return this.products
    }
    static getIdParaNuevoProduct {
        return ProductManager.proxIdProduct++
    }
    addProduct(propiedades) {
        const idProduct = ProductManager.getIdParaNuevoProduct()
        const product = new Product({ id: idProduct, ...propiedades })
        const codigoExistente = product.includes(code)
        if (codigoExistente) {
            throw new Error("Código ya existente. Por favor, introducir un nuevo código")
        }    
        this.products.push(product)
        return product
    }
    getProductById(idProduct) {
        const product = this.products.find(p => p.id === idProduct)
        if (!product) {
            throw new Error("Not found")
        }
        return product
    }
}