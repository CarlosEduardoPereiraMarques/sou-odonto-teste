import mongoose from "mongoose";

const { Schema } = mongoose;

let buylist_products;

try {
  buylist_products = mongoose.model("buylistproducts");
} catch (error) {
  const buylist_products_schema = new Schema({
    user_id: {
      type: String,
      required: true,
    },
    list_id: {
      type: String,
      required: true,
    },
    product_id: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    obligatory_item: {
      type: Boolean,
      required: true,
    },
  });

  buylist_products = mongoose.model("buylistproducts", buylist_products_schema);
}

export default buylist_products;
