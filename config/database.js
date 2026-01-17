const mongoose=require("mongoose");
const {MONGODB_URL}=require(".")// "." ka matlab index file ye lena hai
exports.connectDB=async()=>{
    await mongoose.connect(MONGODB_URL);
    console.log("database connected");
}