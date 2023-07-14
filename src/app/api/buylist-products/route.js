import BuylistProducts from "@/models/BuylistProducts";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB();
    const buylists = await BuylistProducts.find();
    return new NextResponse(JSON.stringify(buylists), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};


export const POST = async (request) => {
  const {user_id, buylist_id, product_id, amount, obligatory_item } = await request.json()
  await connectDB();
  const newBuylistProducts = new BuylistProducts({
    user_id: user_id.toString(),
    list_id: buylist_id.toString(),
    product_id: product_id,
    amount,
    obligatory_item
  });
  
  try {
    await newBuylistProducts.save();
    console.log("BuylistProduct has been created");
    return new NextResponse("BuylistProduct has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
}

export const PUT = async (request) => {
  //atualizar as informações dos produtos
}

export const DELETE = async (request) => {
  //deletar produtos
}