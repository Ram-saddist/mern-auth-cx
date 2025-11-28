const express=require("express")
const router=express.Router()
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
const User =require("../models/User.js")
const generateTokens = (user) =>{
    const accessToken = jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"15m"} //
    )
    const refreshToken = jwt.sign(
        {id:user._id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"7d"}
    )
    return {accessToken,refreshToken}
}


router.post("/register",async (req,res)=>{
    const {name,email, password,address,mobile,gender}=req.body
    //check existing user or not
    const existingUser= await User.findOne({email})
    console.log(existingUser)
    if(existingUser){
        return res.status(409).json({"message":"User already exists"})
    }
    const hashedPassword =await bcrypt.hash(password,10)
    const newUser=new User({
        name,
        email,
        password:hashedPassword,
        gender,
        address,
        mobile
    }) 
    await newUser.save()
    res.status(201).json({"message":"User created successfully"})
})

router.post("/login",async (req,res)=>{
    const {email,password}= req.body
    const user=await User.findOne({email})
    if(!user)
        return res.status(400).json({"message":"user not found"})
    //compare passsword
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
        return res.status(400).json({"message":"Password is invalid"})
    
    const {accessToken,refreshToken} = generateTokens(user)

    res.cookie("refreshToken", refreshToken,{
        httpOnly:true,
        path: '/',
        secure:false,
        sameSite:"lax"
    })

    res.status(200).json({
        "message":"User identified",
        token:accessToken,
        user:{id:user._id, name:user.name, email:user.email}
    })
})


router.get("/refresh-token",async (req,res)=>{
    const token = req.cookies.refreshToken
    console.log("token from refresh token  route", token)
    console.log(req.cookies)
    if(!token)
        return res.status(401).json({"message":"No token appeared"})
    try{
        const decoded=jwt.verify(token,process.env.JWT_REFRESH_SECRET)
        const user = await User.findById(decoded.id)
        const newAccessToken =jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
        )
        res.json({
            accessToken:newAccessToken,
            user:{id:user._id,email:user.email,name:user.name}
        })
    }
    catch(err){
        console.log("error from refresh token route",err)
        return res.status(401).json({"message":"invalid refresh token"})
    }
})


router.post("/logout",(req,res)=>{
    res.clearCookie("refreshToken")
    res.status(200).json({"message":"Logged out successfully"})
})


module.exports=router