import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, default: 2 },
    img: { type: String, required: true },
    imgDetails: { type: Object, required: false },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    largeDescription: { type: String, required: false },
    freeDelivery: { type: Boolean, default: false },
    ageFrom: { type: Number },
    ageTo: { type: Number },
    deletedAt: { type: Date },

  }, {timestamps: true});

  productSchema.set("toJSON", {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
    }
      
    })

  export const Products = model("Product", productSchema);