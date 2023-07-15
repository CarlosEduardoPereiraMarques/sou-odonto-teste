import mongoose from "mongoose";

const { Schema } = mongoose;

let buylist_datas;

try {
  buylist_datas = mongoose.model("buylistdatas");
} catch (error) {
  const buylist_data_schema = new Schema({
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

  buylist_datas = mongoose.model("buylistdatas", buylist_data_schema);
}

export default buylist_datas;
