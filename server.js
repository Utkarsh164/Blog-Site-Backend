const express=require("express");
const app=express()
const {PORT}=require("./config/index");
const blogRouter=require("./routers/blogs.router")
const userRouter=require("./routers/users.router")
const {connectDB}=require("./config/database");
const cookieparser=require("cookie-parser");

connectDB()
app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/blogs",blogRouter)
app.use("/users",userRouter)

app.listen(PORT,(err)=>{
    if(err) console.log(err);
    console.log("server running on port: ",PORT);
    console.log(connectDB)
});