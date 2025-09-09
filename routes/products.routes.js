import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controller/productsController.js";
import upload from "../utils/storage.js";

const route = express.Router();

route.post("/", upload.single("img"), createProduct);
route.get("/", getProducts);
route.put("/edit/:id", updateProduct);
route.delete("/delete/:id", deleteProduct);

export default route;