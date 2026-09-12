import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true,
            minimum:0,
            trim:true
        },
        category:{
            type:String,
            required:true
        },
        stock:{
            String:Number,
            required:true,
            minimum:0,
            trim:true
        },
        published:{
            type:Boolean,
            default : false,
        },
        ownerId :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
            required : true,
        }
        
    },{
        timestamps : true
    }
)

const productModel = mongoose.model("product",productSchema);
export {productModel};