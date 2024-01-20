import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { UserSchema } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser=asyncHandler(async(req,res)=>{
  // res.status(200).json({
  //   message:"sonu Kumar"
  // })

  //get user details from user
  //validation-not empty
  //check if user already exists:username , email
  //check for images,check for avatar-compulsory
  //upload to cloudinary,avatar
  //create user object-create entry in db
  //remove password and refresh token field from response
  //check for user creation 
  //return response


  const {fullName,email,username,password}=req.body
  // if(fullName===""){
  //   throw new ApiError(400,"FullName is Requried")
  // }

  if (
    [fullName,email,username,password].some((field)=>
      field?.trim()==="")
  ) {
    throw new ApiError(400,"All fields are requried")
  }

  const existedUser=UserSchema.findOne({
    $or:[{username},{email}]
  })

  if(existedUser){
    throw new ApiError(409,"User with email already exist")
  }
//take the file from multer
  const avatarLocalPath=req.files?.avatar[0]?.path;
  const coverImageLocalPath=req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is requried")
  }

  //cloudinary file uploadation
  const avatar=await uploadOnCloudinary(avatarLocalPath)
  const coverImage=await uploadOnCloudinary(coverImageLocalPath)

  //checking for avatar is uploaded or not
  if(!avatar){
    throw new ApiError(400,"Avatar file is requried")
  }

  //creating user schema
  const user=await UserSchema.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser= await UserSchema.findById(user._id).select(
    "-password -refreshToken "
  )

  if(!createdUser){
    throw new ApiError(500,"Something went wrong registring the user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"user Registerd Succefully")
  )

})

export {registerUser}