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
  const { user_id, buylist_id, product_id, amount, obligatory_item } = await request.json();
  await connectDB();
  const newBuylistProducts = new BuylistProducts({
    user_id: user_id.toString(),
    list_id: buylist_id.toString(),
    product_id: product_id,
    amount: amount,
    obligatory_item: obligatory_item,
  });
  console.log(newBuylistProducts);
  try {
    await newBuylistProducts.save();
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
  const {list_id, amount, obligatory_item} = await request.json();
  try {
    await connectDB();

    const updatedProduct = await BuylistProducts.findByIdAndUpdate(
      list_id,
      { $set: { amount: amount, obligatory_item:obligatory_item }},
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
  const { listId } = await request.json();
  try {
    await connectDB();
    const deletedList = await BuylistProducts.findByIdAndDelete(listId);

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

