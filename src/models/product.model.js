import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
});

//definimos el modelo productModel, con la función model(), le pasamos la coleccion "products", y el modelo de esquema
const productModel = model("products", productSchema);

export { productModel };