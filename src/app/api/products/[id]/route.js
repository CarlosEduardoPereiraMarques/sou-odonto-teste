import Products from "@/models/Products"
import connectDB from "@/utils/db"
import { NextResponse } from "next/server"


export const GET = async (request, {params}) => {
    const { id } = params
    try{
        await connectDB()
        const products = await Products.find({ id: id })
        return new NextResponse(JSON.stringify(products), {status: 200})
    } catch (error) {
        return new NextResponse("Database Error", {status: 500})
    }    
}