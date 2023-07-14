import BuylistData from "@/models/Buylist"
import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, description, user_email } = await request.json();
  await connectDB();
  const user = await User.findOne({ email: user_email });
  const newBuylist = new BuylistData({
    user_id: user._id.toString(),
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

export const PUT = async (request) => {
  //atualizar dados de uma lista de compras
}

export const DELETE = async (request) => {
  //excluir lista de compras
}