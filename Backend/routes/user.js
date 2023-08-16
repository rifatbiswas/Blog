
const express = require('express')
const router = express.Router();

//middleware
const{requireSignin, isAdmin}=require ("../middleware/user.js");

//controller..
const{register, login, updateProfile}=require("../controller/user.js")



router.post("/register",register);
router.post("/login",login);

router.get("/auth", requireSignin, (req,res)=>{res.json({ok:"You are loging person"})});
router.get("/admin",requireSignin,isAdmin,(req,res)=>{res.json({ok:"You admin"})});

router.put("/updateProfile",requireSignin,updateProfile);


module.exports = router;