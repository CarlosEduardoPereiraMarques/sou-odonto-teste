import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { cpf } = params;
  try {
    await connectDB();
    const products = await User.findOne({ cpf: cpf });
    if (products == null) {
      return new NextResponse("User not found", { status: 404 });
    } else {
      return new NextResponse(JSON.stringify(products), { status: 200 });
    }
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
