import BuylistDatas from "@/models/Buylist";
import User from "@/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { list_id } = params;
  try {
    await connectDB();
    const products = await BuylistDatas.find({ _id: list_id });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { list_id } = params;
  const { list_name, list_description } = await request.json();

  try {
    await connectDB();
    const existingList = await BuylistDatas.findById(list_id);
    if (!existingList) {
      return new NextResponse("Lista de compras não encontrada", {
        status: 404,
      });
    }
    const updatedFields = {};
    if (list_name !== "") {
      updatedFields.name = list_name;
    }
    if (list_description !== "") {
      updatedFields.description = list_description;
    }
    const updatedList = await BuylistDatas.findByIdAndUpdate(
      list_id,
      updatedFields,
      { new: true }
    );

    return new NextResponse(JSON.stringify(updatedList), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { list_id } = params;

  try {
    await connectDB();
    const deletedList = await BuylistDatas.findByIdAndDelete(list_id);

    if (!deletedList) {
      return new NextResponse("Lista de compras não encontrada", {
        status: 404,
      });
    }

    return new NextResponse("Lista de compras excluída com sucesso", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Erro no banco de dados", { status: 500 });
  }
};
