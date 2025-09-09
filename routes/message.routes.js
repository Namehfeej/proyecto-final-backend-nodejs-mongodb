import { Router } from "express";
import { postMessage } from "../controller/messageController.js";

const route = Router();

route.post("/", postMessage);

export default route;