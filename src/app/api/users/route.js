import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB();
    const user = await User.find();
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};