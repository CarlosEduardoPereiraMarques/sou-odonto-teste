import mongoose from "mongoose";

const {Schema} = mongoose;

const productsSchema = new Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    price: {
        type: Decimal128,
        unique: true,
        required: true
    },
    manufacturer: {
        type: String,
        unique: true,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

export default mongoose.model('user', productsSchema);