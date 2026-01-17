const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const USER_SCHEMA=require("../models/users.model")
exports.authenticate=async (req,res,next)=>{
    let token=req?.cookies?.myCookie;
    if(!token){res.status(400).json({message:"please login"})}
    
    let decoded=jwt.verify(token,JWT_SECRET)
    console.log(decoded)
    let user=await USER_SCHEMA.findById(decoded.id)
    console.log(user);
    req.myUser=user //sending user details
    next()
}