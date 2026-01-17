const { Router } = require("express");
const { addUser, fetchAllUser,fetchOneUser, updateUser, deleteUser, login,logout } = require("../controllers/users.controller");

const router = Router();
router.post("/add", addUser);
router.get("/all", fetchAllUser);
router.get("/one/:id", fetchOneUser);
router.delete("/del/:id", deleteUser);
router.put("/up/:id", updateUser);
router.post("/login",login)
router.get("/logout",logout)

module.exports = router;