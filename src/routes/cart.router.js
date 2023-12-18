import { Router } from "express";
//import cartDao from "../daos/dbManager/cart.dao.js";
import daoCarritos from "../daos/dbManager/cart.dao.js";
//const daoCarritos = new cartDao();

const cartRouter = Router();

//obtiene los carritos
cartRouter.get('/', async (req,res) => {
    try {res.send({
        status: 200,
        payload: await daoCarritos.getAllCarts()
    })}
    catch(err) {
        res.send({
            status: 400,
            payload: err
        })
    }
});

//agrega/crea un carrito
cartRouter.post("/", async (req, res) => {
    try {
        res.send({
        status: 200,
        payload: await daoCarritos.createCart(req.body)
    })}
    catch(err) {
        res.send({
            status: 400,
            payload: err
        })
    }
});

//actualiza un carrito existente, tomando su ID como referencia
cartRouter.put("/:cid", async (req, res) => {
    try {
        res.send({
        status: 200,
        payload: await daoCarritos.updateCart(req.body)
    })}
    catch(err) {
        res.send({
            status: 400,
            payload: err
        })
    }
});

//elimina un carrito por ID
cartRouter.delete("/:id", async (req, res) => {
    try {
        res.send({
        status: 200,
        payload: await daoCarritos.deleteCart(req.body)
    })}
    catch(err) {
        res.send({
            status: 400,
            payload: err
        })
    }
});

export default cartRouter;