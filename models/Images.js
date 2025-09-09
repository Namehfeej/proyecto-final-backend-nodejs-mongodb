import { model, Schema } from "mongoose";

const ImagesSchema = new Schema({
    filename: { type: String, required: true, unique: true },
    img: { data: Buffer, contentType: String }
}, { timestamps: true });

export const Images = model("Image", ImagesSchema);