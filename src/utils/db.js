import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
  } catch (error) {
    throw new Error("Database connection failed");
  }
};

export default connectDB;
