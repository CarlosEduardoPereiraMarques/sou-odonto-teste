import Buylist from "@/models/Buylist";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB();
    const buylists = await Buylist.find();
    return new NextResponse(JSON.stringify(buylists), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
