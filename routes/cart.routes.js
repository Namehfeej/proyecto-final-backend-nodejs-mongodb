import express from "express";
import { createCart } from "../controller/cartController.js";

const route = express.Router();

route.post("/", createCart);

export default route;
