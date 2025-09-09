import express from "express";
import { getImage } from "../controller/imageController.js";

const route = express.Router();

route.get("/:idImage", getImage);

export default route;