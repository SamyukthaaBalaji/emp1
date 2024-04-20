const jwt=require("jsonwebtoken")
require("dotenv").config();

function jwtgenerator(user_id){
    const payload={
        user:user_id
    }
     return jwt.sign(payload,process.env.jwtsecret,{expiresIn:"5hr"})

}
module.exports=jwtgenerator