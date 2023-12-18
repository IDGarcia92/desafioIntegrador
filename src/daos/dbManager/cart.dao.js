
import { cartModel } from "../../models/cart.model.js";

class cartDao {
    constructor() { this.model = cartModel }

    //obtiene todos los productos
    async getAllCarts() {
        return await this.model.find().lean()
    }

    //crea un nuevo carrito
    async createCart(cart) {
        return await this.model.create(cart)
    }

    //obtiene un carrito especifico por ID
    async getCartById(id) {
        return await this.model.findById(id)
    }

    //actualiza un carrito existente, tomando su ID como referencia
    async updateCart(id, cart) {
        return await this.model.findByIdAndUpdate(id, cart)
    }

    //elimina un carrito por ID
    async deleteCart(id) {
        return await this.model.findByIdAndDelete(id)
    }
}

export default new cartDao;