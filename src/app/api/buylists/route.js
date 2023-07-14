import BuylistData from "@/models/Buylist"
import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";


export const GET = async (request) => {
  try {
    await connectDB();
    const buylists = await BuylistData.find();
    return new NextResponse(JSON.stringify(buylists), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { name, description, user_email } = await request.json();
  await connectDB();
  const user = await User.findOne({ email: user_email });
  const user_id = user._id.toString();
  const newBuylist = new BuylistData({
    user_id: user_id,
    name,
    description,    
  });

  try {
    await newBuylist.save();
    return new NextResponse("BuylistData has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};