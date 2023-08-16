const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.requireSignin = (req,res,next) =>{
    try {
       const decoded = jwt.verify(
        req.headers.token,
        process.env.JWT_SECRET
       );
       req.user = decoded;      
       next(); 
    } catch (err) {
        return res.status(404).json(err);
    }
};

exports.isAdmin = async (req, res, next)=>{
    try {

    console.log(req.user._id);
       const user = await User.findById(req.user._id)
       
       if(user.role !== 1){
        return res.status(404).json({error:"You are not Admin"})
       } else{   
        next();
       }
    } catch (err) {
        console.log(err);
    }
};