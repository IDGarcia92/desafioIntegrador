import { productModel } from "../../models/product.model.js";

class productDao {
    constructor() { this.model = productModel }

    //obtiene todos los productos
    async getAllProducts() {
        return await this.model.find().lean()
    }

    //obtiene un producto especifico por ID
    async getProductById(id) {
        return await this.model.findById(id)
    }

    //crea un nuevo producto
    async createProduct(product) {
        return await this.model.create(product)
    }

    //actualiza un producto existente, tomando su ID como referencia
    async updateProduct(id, product) {
        return await this.model.findByIdAndUpdate(id, product)
    }

    //elimina un producto por ID
    async deleteProduct(id) {
        return await this.model.findByIdAndDelete(id)
    }
};

export default productDao;