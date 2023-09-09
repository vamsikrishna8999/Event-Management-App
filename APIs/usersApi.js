
const exp=require('express')

const userApp=exp.Router() 


const expressAsyncHandler = require('express-async-handler')


const bycryptjs=require('bcryptjs')

const jwt=require('jsonwebtoken')

require('dotenv').config()

const verifyToken=require("./middlewares/verifyToken")

//create user 

userApp.use(exp.json())
userApp.post(
    "/user-signup",
    expressAsyncHandler(async (request,response)=>{

    
    const userCollectionObj= request.app.get("userCollectionObj")

    
    const newUser=request.body

    
    let userOfDB=await userCollectionObj.findOne({username:newUser.username})
    
    if(userOfDB!=null){
        response.status(200).send({message:"User already existed"})
    }
    
    else{
        
        let hashedPassword=await bycryptjs.hash(newUser.password,5) //2nd arg gives no of times to be hashed
        //console.log(hashedPassword)

        
        newUser.password=hashedPassword
        
        await userCollectionObj.insertOne(newUser)
        
        response.status(201).send({message:"User created"})

    } 


}))



userApp.get(
    "/get-userevents/:username",
    expressAsyncHandler(async (request,response)=>{

    
    const userCollectionObj=request.app.get('userCollectionObj')

    
    let usernameFromUrl=(request.params.username)

    
    const userOfDB=await userCollectionObj.find({username:usernameFromUrl},{_id:1})

    
    if(userOfDB===null){
        response.status(200).send({message:"user not found"})
    }
    else{
        
        delete userOfDB.password 

        response.status(200).send({message:"user",payload:userOfDB})

    }

    
    
     
   
})) 



userApp.use(exp.json())
//user login
userApp.post(
    "/user-login",
    expressAsyncHandler(async(request,response)=>{
    // console.log(request.headers)

    
    const userCollectionObj=request.app.get('userCollectionObj')

    
    const userCredObj=request.body



    
    let userOfDB=await userCollectionObj.findOne({username:userCredObj.username}) //and type==userCredObj.type
    
    if(userOfDB===null){
        response.status(200).send({message:"invalid username"})
    }
    
    else{
        
        let isEqual=await bycryptjs.compare(userCredObj.password,userOfDB.password)
        if(isEqual===false){
            response.status(200).send({message:"invalid password"})

        }
        
        else{
            
            let jwtToken=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:20})//create and encode token it is sync no await

            
            delete userOfDB.password
            response.status(200).send({message:"success",token:jwtToken,user:userOfDB})

        }

    }
}))


userApp.use(exp.json())
userApp.post(
    "/user-eventregister/:username",
    expressAsyncHandler(async (request,response)=>{

    
    const userCollectionObj= request.app.get("userCollectionObj")

    
    let usernameFromUrl=(request.params.username)

    
    const newRegisteredEvent=request.body

    
    let registeredEventOfDB=await userCollectionObj.findOne({$and:[{username:usernameFromUrl},{registeredEvents:newRegisteredEvent._id}]})
    
    if(registeredEventOfDB!=null){
        response.status(200).send({message:"event already registered"})
    }
    
    else{
        
        
        await userCollectionObj.updateOne({username:usernameFromUrl},{$addToSet:{registeredEvents:newRegisteredEvent._id}})
        
        response.status(201).send({message:"event registered"})

    } 


}))






userApp.get('/test',verifyToken,(request,response)=>{
    //console.log(request.headers)
    response.send({message:"private route"})
})

//export userApp
module.exports=userApp