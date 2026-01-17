const { all } = require("axios");
const USER_SCHEMA = require("../models/users.model");
const { generateToken } = require("../utils/generate.Token");

exports.addUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        let existingUser = await USER_SCHEMA.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ success: false, massage: "already exist user", })
        }
        let newUser = await USER_SCHEMA.create({ username, email, password });


        res.status(200).json({ success: true, massage: "user added sussfully", newUser })

    } catch (error) {
        console.log("error while creating a user");

        res.status(500).json({ success: true, massage: "error" })
    }
}

exports.fetchAllUser = async (req, res) => {
    try {
        let allUser = await USER_SCHEMA.find()
        if(allUser.length===0){
            return res.status(200).json({msg:"no users"});
        }
        res.status(200).json({success:true, massage:"fetch all users data",count:allUser.length, data:allUser} )
        
    } catch (error) {
        console.log("Error while fetching All user data")
        res.status(500).json({
            success: false, massage:"Error"
        })
        
    }
 }

 exports.fetchOneUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from request parameters
        console.log(`Fetching user with ID: ${id}`);

        // Find the user by ID
        const user = await USER_SCHEMA.findById(id);

        // If the user is not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User ID not found in the database",
            });
        }

        // User found
        res.status(200).json({
            success: true,
            message: "Fetched user data successfully",
            user,
        });
    } catch (error) {
        console.error("Error while fetching user data:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user data",
        });
    }
};

exports.updateUser = async (req, res) => { 
   try {
    let {id} = req.params;
    let findOneUser = await USER_SCHEMA.findOne({_id: id});
    if (!findOneUser) {
        return res.status(404),json({success:false, massage:"user not exist", user})
        }
        // await USER_SCHEMA.updateOne({_id: id},{
        //     $set: {title:req.body.title,
        //     email:req.body.email,
        //     password:req.body.password}
        // })

        findOneUser.username=req.body.username|| findOneUser.username;
        findOneUser.email=req.body.email || findOneUser.email;
        findOneUser.password=req.body.password|| findOneUser.password;
     
        const updatedUser = await findOneUser.save();
    res.status(200).json({success:true , massage:"update user data"})
    
   } catch (error) {
    console.log("error while Update Data")
    res.status(500).json({success:false, massage:"error"})
    
   }
}

exports.deleteUser = async (req, res) => { 
    try { 
        const { id } = req.params;

        // Attempt to delete the user directly
        const deletedUser = await USER_SCHEMA.findByIdAndDelete(id);

        // If no user was found, return a 404 response
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found in the database",
            });
        }

        // User successfully deleted
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (error) {
        console.error("Error while deleting user:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the user",
        });
    }
};

exports.login=async (req,res)=>{
    let {email,password}=req.body;
    let findUser=await USER_SCHEMA.findOne({email});

    
    if(!findUser) return res.status(401).json({message:"invalid email"});

    let isMathched=await findUser.verifyPassword(password);
    if(!isMathched){
        return res.status(200).json({msg:"wrong password"});
    }
    let token=generateToken(findUser._id)
    res.cookie("myCookie",token,{
        maxAge:1*60*60*1000,                                                                       //1hr in ms
        httpOnly:true                                                                             //it cannot be modified by browser
    })

    console.log(token)
    return  res.status(200).json({success:true,message:"user logged in",token:token});
}

exports.logout=async(req,res)=>{
    res.clearCookie("myCookie","",{
        maxAge:0,
    });
    res.status(200).json({success:true,message:"user logged out"});
}
