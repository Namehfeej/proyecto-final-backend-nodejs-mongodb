import { Router } from "express";
import { createCheckOutPreference } from "../controller/checkoutController.js";

const route = Router();

route.post("/", createCheckOutPreference);

export default route;