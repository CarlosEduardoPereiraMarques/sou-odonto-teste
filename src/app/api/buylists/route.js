import BuylistDatas from "@/models/Buylist";
import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { buylist_id } = params;
  try {
    await connectDB();
    const products = await BuylistDatas.find({ _id: buylist_id });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { name, description, user_email } = await request.json();
  await connectDB();
  const user = await User.findOne({ email: user_email });
  const newBuylist = new BuylistDatas({
    user_id: user._id.toString(),
    name,
    description,
  });

  try {
    await newBuylist.save();
    return new NextResponse("BuylistDatas has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
