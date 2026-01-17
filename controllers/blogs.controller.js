const BLOG_SCHEMA=require("../models/blogs.model");
const zod=require("zod");


exports.addBlog=async(req,res)=>{
    const {title,description}=req.body;
    try{
    console.log(req.body);

    let newBlog=await BLOG_SCHEMA.create({title,description});
    res.status(200).json({success:true,msg:"data submitted",newBlog:newBlog});
    }
    catch(e){
        res.status(500).json({success:false,msg:e})
    }
    

};

exports.fetchOneBlog=async(req,res)=>{
    
    try{
        const {id}=req.params;
        const allBlogs=await BLOG_SCHEMA.findOne({_id:id});
        if(!allBlogs){
            res.json({msg:"no data present"})
        }
        res.status(200).json({success:true,msg:"One blocks fetch",data:allBlogs});
}
catch(e){
    res.status(500).json({success:false,msg:e})
}};




exports.fetchAllBlog=async(req,res)=>{
    try{
        const allBlogs=await BLOG_SCHEMA.find();
        if(!allBlogs){
            res.json({msg:"no data present"})
        }
        res.status(200).json({success:true,msg:"all blocks fetch",data:allBlogs});
    }
    catch(e){
        res.status(500).json({success:false,msg:e})
    }
};

exports.deleteBlog=async(req,res)=>{
    
    try{
        const {id}=req.params;
        const Blogs=await BLOG_SCHEMA.findOne({_id:id});
        if(!Blogs){
            res.status(400).json({msg:"no blog found"})
        }
        const allBlogs=await BLOG_SCHEMA.deleteOne({_id:id});
        res.status(200).json({success:true,msg:"delete blocks",data:allBlogs});
    }
    catch(e){
        res.status(500).json({success:false,msg:e})
    }

};

exports.updateBlog=async(req,res)=>{
   
    try{
        const {id}=req.params;
        const {title,description}=req.body;
        const Blogs=await BLOG_SCHEMA.findOne({_id:id});
        if(!Blogs){
            res.status(400).json({msg:"no blog found"})
        }
        const allBlogs = await BLOG_SCHEMA.updateOne({ _id:id }, {$set:{title, description }});

        res.status(200).json({success:true,msg:"update blocks",data:allBlogs});
    }
    catch(e){
        res.status(500).json({success:false,msg:e})
    }
};