import { Router } from "express";
import { productsDao as api } from "../daos/index.js";
import isAuth from "../utils/isAuth.js";

const mainRouter = Router();

mainRouter.get("/",isAuth, async (req, res) => {
    try {
        const products = await api.getAll();
        products
          ? res.status(200).render("main", {products})
          : res.status(404).json({ message: "No products available" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    
});

export default mainRouter