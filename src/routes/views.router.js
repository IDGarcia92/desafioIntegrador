import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";

const daoProductos = new productDao();

const viewsRouter = Router();

//muestra todos los productos
viewsRouter.get("/", async (req, res) => {
    try {
        const productos = await daoProductos.getAllProducts()
        console.log({productos})
        res.render('index', {productos});
    } catch(err) {console.log(err)}
});

export default viewsRouter