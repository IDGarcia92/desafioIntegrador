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
        //console.log({productos})
        //console.log({carritos})
        res.render('index.hbs', {productos});
    } catch(err) {console.log(err)}
});

viewsRouter.get("/realTimeProducts", async (req, res) => {
    try {
        const productos = await daoProductos.getAllProducts();
        res.render('realTimeProducts.hbs', {productos});
    } catch(err) {console.log(err)}
});

/*
//ruta principal donde mostraremos la lista de productos
router.get('/', (req, res) => {
    res.render('home.hbs', {
        title: "Lista de Productos",
        fileCss: 'styles.css',
        products: products
    });
});


// Ruta para "/realTimeProducts" (productos en tiempo real)
router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts.hbs', { 
        title: "Lista de Productos en tiempo real",
        fileCss: 'styles.css',
        products: products 
    });
});

*/
export default viewsRouter