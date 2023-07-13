import productsSchema from "@/models/Products"
import connectDB from "@/utils/db"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try{
        await connectDB()
        const products = await productsSchema.find({ category: "descartaveis" })
        return new NextResponse(JSON.stringify(products), {status: 200})
    } catch (error) {
        return new NextResponse("Database Error", {status: 500})
    }    
}