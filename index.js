import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {dbConnection} from './database/dbConnection.js';
import productsRoute from './routes/products.routes.js';
import cartRoute from './routes/cart.routes.js';
import imageRoute from './routes/images.routes.js';
import messageRoute from './routes/message.routes.js';
import checkoutRoute from './routes/checkout.routes.js';

const server = express();

const api = async () => {

    // Environment variables
    dotenv.config();

    // DB connection
    await dbConnection();

    server.use(express.json());
    server.use(cors());

    server.use("/images", imageRoute);
    server.use("/api/cart", cartRoute);
    server.use("/api/products", productsRoute);
    server.use("/api/checkout", checkoutRoute);
    server.use("/api/contact", messageRoute);

    server.listen(process.env.PORT, () => console.log("Server running on port ", process.env.PORT));

    

}

api();