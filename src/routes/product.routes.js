import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";

const daoProductos = new productDao();

const productRouter = Router();

//obtiene todos los productos
productRouter.get("/", async (req, res) => {
    try {res.send({
        status: 200,
        payload: await daoProductos.getAllProducts()
    })}
    catch(err) {
        res.send({
            status: 400,
            payload: err
        })
    }
});

//agrega/crea un producto
productRouter.post("/", async (req, res) => {
    try {
        res.send({
        status: 200,
        payload: await daoProductos.createProduct(req.body)
    })}
    catch(err) {
        res.send({
            status: 400,
            payload: err
        })
    }
});

//actualiza un producto existente, tomando su ID como referencia


export default productRouter;