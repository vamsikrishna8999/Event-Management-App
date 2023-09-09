
const exp=require('express')

const adminApp=exp.Router() 


const expressAsyncHandler = require('express-async-handler')


const bycryptjs=require('bcryptjs')

const jwt=require('jsonwebtoken')

const verifyToken=require("./middlewares/verifyToken")


adminApp.use(exp.json())



adminApp.use(exp.json())
//user login
adminApp.post(
    "/admin-login",
    expressAsyncHandler(async(request,response)=>{
   

   
    const adminCollectionObj=request.app.get('adminCollectionObj')

    
    const adminCredObj=request.body
    //console.log(adminCredObj)

    
    let adminOfDB=await adminCollectionObj.findOne({username:adminCredObj.username}) 
    
    if(adminOfDB===null){
        response.status(200).send({message:"invalid username"})
    }
    
    else{
        
        if(adminCredObj.password!=adminOfDB.password){
            response.status(200).send({message:"invalid password"})

        }
        
        else{
            
            let jwtToken=jwt.sign({username:adminOfDB.username},'abcdef',{expiresIn:20})//create and encode token it is sync no await

            
            delete adminOfDB.password
            response.status(200).send({message:"success",token:jwtToken,user:adminOfDB})

        }

    }
}))

adminApp.get('/test',verifyToken,(request,response)=>{
    //console.log(request.headers)
    response.send({message:"private route"})
})

//export adminApp
module.exports=adminApp