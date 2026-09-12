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
            min:0
        },
        category:{
            type:String,
            required:true
        },
        stock:{
            type:Number,
            required:true,
            min:0
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
export default productModel;
export {productModel};