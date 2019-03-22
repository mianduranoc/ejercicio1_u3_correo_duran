const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    name:{
        firstName:{
            required:true,
            type:String
        },
        lastName:{
            required:true,
            type:String
        }
    }
});
const userModel=mongoose.model("User",userSchema,"users");

module.exports=userModel;