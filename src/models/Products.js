import mongoose from "mongoose";

const { Schema } = mongoose;

let Products;

try {
  Products = mongoose.model("products");
} catch (error) {
  const productsSchema = new Schema({
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  });

  Products = mongoose.model("products", productsSchema);
}

export default Products;
