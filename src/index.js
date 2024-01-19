//require('dotenv').config({path:"E:\Main_web_learning\Backend_learning\.env"})

import connectDB from "./db/index.js";
//new recently used syntax not included in offcial document
import dotenv from "dotenv"

dotenv.config({
  path:'E:\Main_web_learning\Backend_learning\.env'
})



connectDB()














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