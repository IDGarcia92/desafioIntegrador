import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";
//import daoCarritos from "../daos/dbManager/cart.dao.js";

const daoProductos = new productDao();

const viewsRouter = Router();

//muestra todos los productos
viewsRouter.get("/", async (req, res) => {
    try {
        const productos = await daoProductos.getAllProducts();
        //const carritos = await daoCarritos.getAllCarts();
        console.log({productos})
        //console.log({carritos})
        res.render('index', {productos});
    } catch(err) {console.log(err)}
});

export default viewsRouter