//require('dotenv').config({path:"E:\Main_web_learning\Backend_learning\.env"})

import connectDB from "./db/index.js";
//new recently used syntax not included in offcial document
import dotenv from "dotenv"
import {app} from "../src/app.js"

dotenv.config({
  path:'E:/Main_web_learning/Backend_learning/.env'
})



connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running at Port :- ${process.env.PORT}`);
  })
})
.catch((err)=>{
  app.on("error",(error)=>{
    console.log(error);
  })
  console.log("MongoDB connection Failed !!",err);
})














//first approach
/*import express from "express";
const app=express();
;(async()=>{
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error",()=>{
      console.log("error",error);
      throw error
    })

    app.listen(process.env.PORT,()=>{
      console.log(`App is running on port number ${process.env.PORT}`);
    })
  } catch (error) {
    console.error("Error",error);
    throw error
  }
})()
*/