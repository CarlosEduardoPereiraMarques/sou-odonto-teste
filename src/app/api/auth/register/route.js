import User from "@/models/User";
import connectDB from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, cpf, email, password } = await request.json();
  await connectDB();
  const hashed_password = await bcrypt.hash(password, 5);
  const new_user = new User({
    name,
    cpf,
    email,
    password: hashed_password,
  });

  try {
    await new_user.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
