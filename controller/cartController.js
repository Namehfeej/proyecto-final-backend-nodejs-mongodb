import { Cart } from "../models/Cart.js";

export const createCart = async (req, res) => {
    const {body} = req;

    try {
        
        const cart = await Cart.create(body);
        

        res.json({
            ok: true,
            msg: "Cart created successfully",
            cart
        })
    
    } catch (error) {
        console.log("Error internal server", error);
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        }
        );
    }

}