import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

export default mongoose.models.User || mongoose.model('users', userSchema);