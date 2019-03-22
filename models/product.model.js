const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    code: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});

const productModel=mongoose.model("Product",productSchema,"products");

module.exports=productModel;