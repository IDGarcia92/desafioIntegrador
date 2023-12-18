import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: 
        [{
            product: { type: Schema.Types.ObjectId, ref: 'Products' }, //hace referencia a la coleccion de productos
            quantity: { type: Number, required: true, default: 1 },
        }],
    });

const cartModel = model("carts", cartSchema);

export { cartModel };

