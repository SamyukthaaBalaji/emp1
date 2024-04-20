const jwt=require("jsonwebtoken")
require("dotenv").config();
module.exports=async=(req,res,next)=>{
    try {
        const jwttoken=req.header("token");
        if(!jwttoken){
            return res.status(403).json("not authorized")
        }
        const payload=jwt.verify(jwttoken,process.env.jwtSecret)
        req.user=payload.user
        
    } catch (error) {
        console.log(error.message)
        return res.status(403).json("unauthorized")
        
    }
}