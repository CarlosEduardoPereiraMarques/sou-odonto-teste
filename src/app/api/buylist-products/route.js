import buylist_products from "@/models/BuylistProducts";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB();
    const buylists = await buylist_products.find();
    return new NextResponse(JSON.stringify(buylists), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { user_id, buylist_id, product_id, amount, obligatory_item } =
    await request.json();
  await connectDB();
  const new_buylist_products = new buylist_products({
    user_id: user_id.toString(),
    list_id: buylist_id.toString(),
    product_id: product_id,
    amount: amount,
    obligatory_item: obligatory_item,
  });
  try {
    await new_buylist_products.save();
    return new NextResponse("BuylistProduct has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};

export const PUT = async (request) => {
  const { list_id, amount, obligatory_item } = await request.json();
  try {
    await connectDB();

    const updated_product = await buylist_products.findByIdAndUpdate(
      list_id,
      { $set: { amount: amount, obligatory_item: obligatory_item } },
      { new: true }
    );
    return {
      statusCode: 200,
      body: "Produto atualizado com sucesso",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Erro ao atualizar o produto",
    };
  }
};

export const DELETE = async (request) => {
  const { listId: list_id } = await request.json();
  try {
    await connectDB();
    const deleted_list = await buylist_products.findByIdAndDelete(list_id);

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
