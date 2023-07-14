import mongoose from "mongoose";

const { Schema } = mongoose;

let BuylistProducts;

try {
  BuylistProducts = mongoose.model("buylistproducts");
} catch (error) {
  const BuylistProductsSchema = new Schema({
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

  BuylistProducts = mongoose.model("buylistproducts", BuylistProductsSchema);
}

export default BuylistProducts;
