import mongoose from "mongoose";

const { Schema } = mongoose;

let BuylistDatas;

try {
  BuylistDatas = mongoose.model("buylistdatas");
} catch (error) {
  const BuylistDataSchema = new Schema({
    user_id: {
      type: String,
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

  BuylistDatas = mongoose.model("buylistdatas", BuylistDataSchema);
}

export default BuylistDatas;
