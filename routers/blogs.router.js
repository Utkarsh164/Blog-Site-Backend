const {Router}=require("express");
const { addBlog, fetchOneBlog, fetchAllBlog, deleteBlog, updateBlog } = require("../controllers/blogs.controller");
const { authenticate } = require("../middlewares/auth");

const router=Router()

router.post("/add",authenticate,addBlog)
router.get("/one/:id",authenticate,fetchOneBlog)
router.get("/all",fetchAllBlog)
router.delete("/delete/:id",authenticate,deleteBlog)
router.put("/update/:id",authenticate,updateBlog)
module.exports=router;