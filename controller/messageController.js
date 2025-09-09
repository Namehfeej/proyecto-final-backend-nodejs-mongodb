import { Message } from "../models/Message.js";


export const postMessage = async (req, res) => {
    try {

        await Message.create(req.body);

        res.json({
            ok: true,
            msg: "Message sent successfully"
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