const jwt=require('jsonwebtoken')
require('dotenv').config()
//write a middleware function to verify token
const verifyToken=(request,response,next)=>{
    //get bearer token from req.headers
    const bearerToken=request.headers.authorization //Bearer token

    //if bearer token not found
    if(bearerToken===undefined){
        response.send({message:"Unauthorized access pls login first"})
    }
    //if token is existed
    else{
        //get token from bearer token string
        const token=bearerToken.split(" ")[1] //["bearer","token"]
        //verify token
        try{
        jwt.verify(token,process.env.SECRET_KEY) //if invalid throws error
        //call nxt mw
        next()
        }
        catch(err){
            //forward to err handling mw
            next(new Error("session expired relogin"))
        }

    }
}

module.exports=verifyToken