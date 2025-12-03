const mongoose =require("mongoose")

const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:String,
    mobile:Number,
    address:String,
    gender:String,
    resetOtp:String,
    resetOtpExpires:Date
})


module.exports= mongoose.model("User",userSchema)