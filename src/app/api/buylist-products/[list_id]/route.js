import buylist_datas from "@/models/Buylist";
import buylist_products from "@/models/BuylistProducts";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { list_id } = params;
  try {
    await connectDB();
    const products = await buylist_products.find({ list_id: list_id });
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
    const existing_list = await buylist_datas.findById(list_id);
    if (!existing_list) {
      return new NextResponse("Lista de compras não encontrada", {
        status: 404,
      });
    }
    const updated_fields = {};
    if (list_name !== "") {
      updated_fields.name = list_name;
    }
    if (list_description !== "") {
      updated_fields.description = list_description;
    }
    const updated_list = await buylist_datas.findByIdAndUpdate(
      list_id,
      updated_fields,
      { new: true }
    );

    return new NextResponse(JSON.stringify(updated_list), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { list_id } = params;

  try {
    await connectDB();
    const deleted_list = await buylist_datas.findByIdAndDelete(list_id);

    if (!deleted_list) {
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
