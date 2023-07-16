import buylist_datas from "@/models/Buylist";
import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { email } = params;
  try {
    await connectDB();
    const user = await User.findOne({ email: email });
    const buylists = await buylist_datas.find({ user_id: user._id.toString() });
    if (buylists.length === 0) {
      return new NextResponse("Sem lista", { status: 404 });
    } else {
      return new NextResponse(JSON.stringify(buylists), { status: 200 });
    }
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
