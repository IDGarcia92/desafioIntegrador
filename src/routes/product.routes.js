import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";

const daoProductos = new productDao();

const productRouter = Router();

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

export default productRouter;