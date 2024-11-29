import mongoose from "mongoose";

const chekInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    mood:{
        type:Number,
        required:true
    },
    stress:{
        type:Number,
        required:true
    },
    activity:{
        type:String,
        required:true
    },
    thoughts:{
        type:String,
        required:true
    }

})

export const CheckIn = mongoose.model('CheckIn', chekInSchema)

