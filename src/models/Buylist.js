import mongoose from "mongoose";

const { Schema } = mongoose;

let Buylist;

try {
  Buylist = mongoose.model("buylists");
} catch (error) {
  const buylistSchema = new Schema({
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
    list_name: {
      type: String,
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

  Buylist = mongoose.model("buylists", buylistSchema);
}

export default Buylist;
