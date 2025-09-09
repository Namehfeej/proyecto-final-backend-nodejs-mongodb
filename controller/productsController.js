import fs from "fs";
import {Products} from "../models/Products.js";
import { Images } from "../models/Images.js";


export const createProduct = async (req, res) => {
    const {body, file} = req;

    try {

        if(!file) {
            res.status(400).json({
                ok: false,
                msg: "Image cannot save"
            })
        }
        const prod = await Products.findOne({name: body.name});

        if(prod) {
            return res.status(400).json({
                ok: false,
                msg: "Product already exists"
            })
        };

        const imageBuffer = fs.readFileSync("./" + file.path);

        const image = await Images.create({
            filename: file.filename,
            img: { data: imageBuffer, contentType: "image/png" }
        })

        if(!image) {
            res.status(400).json({
                ok: false,
                msg: "Image cannot save"
            })
        }

        const newProd = await Products.create(
            {...body, 
            img: `${process.env.API_BASE_URL}/images/${image._id}`
            }
        );

        fs.rm("./" + file.path, error => {
            if(error) console.log("Error deleting temp file", error);
            else console.log("Temp file deleted");
        });

        res.json({
            ok: true,
            msg: "Product created successfully",
            product: newProd
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

export const getProducts = async (req, res) => {
    const {query} = req; // name pageNumber documentsPerPage

    const documentsPerPage = parseInt(query.documentsPerPage) || 50
    const skip = ((parseInt(query.pageNumber) || 1) - 1) * documentsPerPage

    try {
        const queryRegExp = query.name ? { name: new RegExp(query.name, "i") } : undefined;
         const totalDocs = await Products.countDocuments({
            ...queryRegExp, 
            deletedAt: { $in: [null, undefined] }})

        const products = await Products.find({
            ...queryRegExp, 
            deletedAt: { $in: [null, undefined] }})
            .skip(skip)
            .limit(documentsPerPage)


        res.json({
            ok: true,
            products,
            pageNumber: parseInt(query.pageNumber) || 1,
            totalPages: Math.ceil(totalDocs / documentsPerPage)
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

export const updateProduct = async (req, res) => {
    const { params: {id}, body } = req;

    try {
        const existProduct = await Products.findById(id);

        if(!existProduct || existProduct.deletedAt) {
            return res.status(404).json({
                ok: false,
                msg: "Product not found"
            });
        }

        const newProduct = await Products.findByIdAndUpdate(
            id, 
            body, 
            {new: true});

        res.json({
            ok: true,
            msg: "Product updated successfully",
            product: newProduct
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

export const deleteProduct = async (req, res) => {
    const { params: {id}, body } = req;
    try {
         const existProduct = await Products.findById(id);

        if(!existProduct || existProduct.deletedAt) {
            return res.status(404).json({
                ok: false,
                msg: "Product not found"
            });
        }

         await Products.findByIdAndUpdate(
            id,
            {deletedAt: new Date()}, 
            {new: true});

        res.json({
            ok: true,
            msg: "Product deleted successfully",
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