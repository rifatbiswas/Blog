const express = require("express");
const router = express.Router();



middleware
const{requireSignin, isAdmin}=require ("../middleware/user.js");


//controller..
const{CreatePost, ReadPost, UpdatePost, DeletPost, Search}=require("../controller/crud")



//API Routing.........

router.post("/create" , requireSignin, isAdmin, CreatePost)
router.get("/read" , requireSignin, ReadPost)
router.post("/update/:id" , requireSignin, isAdmin, UpdatePost)
router.get("/delete/:id" ,requireSignin, isAdmin, DeletPost)
router.get("/search/:title", requireSignin, Search);


module.exports=router;