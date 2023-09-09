const cloudinary=require("cloudinary").v2
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")
require('dotenv').config()//process.env

//config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
//config cloudinary storage
let clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"vnr2023",
        public_id:(request,file)=>file.fieldname+"-"+Date.now()
    }
})
//config multer
let multerObj=multer({storage:clStorage}) //instead of clStorage if we give some other file name the image will be uploaded there instead of cloud

//export multerObj
module.exports=multerObj