import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    user_id:{
        type: Number,
        unique: true,
        required: true
    },
    list_id:{
        type: Number,
        unique: true,
        required: true
    },
    product_id:{
        type: Number,
        unique: true,
        required: true
    },
    list_name:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        unique: true,
        required: true
    },
    obrigatory_item:{
        type: Boolean,
        unique: true,
        required: true
    }
})

export default mongoose.model('user', userSchema);