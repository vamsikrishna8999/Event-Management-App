//create mini-express app(A router)
const exp=require('express')

const eventApp=exp.Router() //capable of handing all routes


const expressAsyncHandler = require('express-async-handler')


const bycryptjs=require('bcryptjs')

const jwt=require('jsonwebtoken')

const verifyToken=require("./middlewares/verifyToken")
const { ObjectId } = require('mongodb')
const multerObj=require("./middlewares/cloudinaryConfig")
require('dotenv').config()

//create user 

eventApp.use(exp.json())
eventApp.post(
    "/create-event",
    multerObj.single('photo'),
    expressAsyncHandler(async (request,response)=>{

    
    const eventCollectionObj= request.app.get("eventCollectionObj")
    console.log(request.body)

    
    const newEvent=JSON.parse(request.body.event)
    
    newEvent.image=request.file.path;
    await eventCollectionObj.insertOne(newEvent)
    
    response.status(201).send({message:"Event created"})


}))

eventApp.use(exp.json())

eventApp.get(
    "/get-events",
    expressAsyncHandler(async (request,response)=>{
    const eventCollectionObj=request.app.get('eventCollectionObj')

    eventCollectionObj.find().toArray()
    .then((eventslist)=>{
        response.status(200).send({message:"events list",payload:eventslist})
    })
    .catch((err)=>{
        console.log("error in getting events")
        response.send({message:"error",errMessage:err.message})
    })
})
)

eventApp.use(exp.json())
eventApp.get(
    '/get-userevents/:eid',
    expressAsyncHandler(async (request,response)=>{
    const eventCollectionObj=request.app.get('eventCollectionObj')

    let eventid=(request.params.eid)
    //console.log(eventid)

    eventCollectionObj.findOne({_id:new ObjectId(eventid)})
    .then((eventObj)=>{
       // console.log(eventObj)
        response.status(200).send({message:"registerted event found",payload:eventObj})
    })
    .catch((err)=>{
        response.send({message:"error",errMessage:err.message})
    })
    
})
)
 



eventApp.use(exp.json())
eventApp.put(
    "/update-event",
    expressAsyncHandler(async (request,response)=>{
    let updatedevent=request.body
    console.log(updatedevent)
    const eventCollectionObj=request.app.get('eventCollectionObj')
    await eventCollectionObj.updateOne({_id: new ObjectId(updatedevent._id)},{$set:{eventname:updatedevent.eventname,date:updatedevent.date,StartTime:updatedevent.StartTime,Status:updatedevent.Status}})
    .then((dbres)=>{
        response.status(200).send({message:"event updated"})
    })
    .catch((err)=>{
        response.send({message:"error",errMessage:err.message})
    })
})
)

eventApp.use(exp.json())
eventApp.delete(
    "/delete-event",
    expressAsyncHandler(async (request,response)=>{
    let eventtodel=request.body
   // console.log(eventtodel)

    const eventCollectionObj=request.app.get('eventCollectionObj')
    eventCollectionObj.deleteOne({id:eventtodel.id})
    .then((dbres)=>{
        response.status(200).send({message:"event deleted"})
    })

})
)










eventApp.get('/test',verifyToken,(request,response)=>{
    //console.log(request.headers)
    response.send({message:"private route"})
})


module.exports=eventApp