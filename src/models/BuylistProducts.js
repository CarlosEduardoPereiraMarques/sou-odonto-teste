import mongoose from "mongoose";

const { Schema } = mongoose;

let BuylistProducts;

try {
  BuylistProducts = mongoose.model("buylistproducts");
} catch (error) {
  const buylistProductSchema = new Schema({
    user_id: {
      type: Number,
      unique: true,
      required: true,
    },
    list_id: {
      type: Number,
      unique: true,
      required: true,
    },
    product_id: {
      type: Number,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      unique: true,
      required: true,
    },
    obligatory_item: {
      type: Boolean,
      unique: true,
      required: true,
    },
  });

  BuylistProducts = mongoose.model("buylistsproducts", buylistProductSchema);
}

export default BuylistProducts;
