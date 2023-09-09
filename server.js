//create express app
const exp=require('express')


//console.log(exp) // to know what is exported fom module to variable exp

const app=exp() //Calls the function and returns an express object stored in app

//assign port number
//... express object internally contains http server
require('dotenv').config()
const port=process.env.PORT||3500
app.listen(port,()=>{
    console.log("web server listening in 3500")
})




//import path module
const path=require("path")
//Connect react build
app.use(exp.static(path.join(__dirname,'./build')))
//__dirnmae path of correct fo;der







//get mongo client
const mclient=require("mongodb").MongoClient

//connext to db server using mongo client
mclient
    .connect("mongodb://127.0.0.1:27017")
    .then((dbRef)=>{
        //connecct to a database
        const dbObj=dbRef.db('b1db')

        //connect to collections of this database
        const userCollectionObj=dbObj.collection("userscollection")
        const productCollectionObj=dbObj.collection("productscollection")
        const adminCollectionObj=dbObj.collection("adminCollection")
        const eventCollectionObj=dbObj.collection("eventscollection")
        const registeredEventCollectionObj=dbObj.collection("registeredeventscollection")


        //share collections to APIs
        app.set('userCollectionObj',userCollectionObj)
        app.set('adminCollectionObj',adminCollectionObj)
        app.set('eventCollectionObj',eventCollectionObj)
        


        console.log("db connection success")
    })
    .catch((err)=>console.log("database connect error:",err))







//import userApp
const userApp=require('./APIs/usersApi')


const adminApp=require('./APIs/adminApi')

const eventApp=require('./APIs/eventsApi')





app.use('/user-api',userApp)

app.use('/admin-api',adminApp)

app.use('/event-api',eventApp)







//middleware to deal with page refresh
const pageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("*",pageRefresh)






//dealing with invalid paths with normal mw
const invalidPathMiddleware=(request,response,next)=>{
    response.send({message:"Invalid path"})
}


app.use("*",invalidPathMiddleware)





//dealing with errors using error handling middleware
const errorHandlingMiddleware=(error,request,response,next)=>{
    response.send({message: error.message})
}

//using this for all the requests
app.use(errorHandlingMiddleware)