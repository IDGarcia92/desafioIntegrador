import { Router } from "express";
import cartDao from "../daos/dbManager/cart.dao.js";

const daoCarritos = new cartDao();

const cartRouter = Router();

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
})