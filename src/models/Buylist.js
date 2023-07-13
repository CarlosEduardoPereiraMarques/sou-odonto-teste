import mongoose from "mongoose";

const { Schema } = mongoose;

let BuylistData;

try {
  BuylistData = mongoose.model("buylistsdatas");
} catch (error) {
  const BuylistDataSchema = new Schema({
    user_id: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

  BuylistData = mongoose.model("buylistsdatas", BuylistDataSchema);
}

export default BuylistData;
