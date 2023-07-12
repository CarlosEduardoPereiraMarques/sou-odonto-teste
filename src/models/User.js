import mongoose from "mongoose";

const { Schema } = mongoose;

let User;

try {
  User = mongoose.model("User");
} catch (error) {
  const UserSchema = new Schema({
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  User = mongoose.model("User", UserSchema);
}

export default User;
