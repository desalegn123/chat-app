import userModel from "../models/user.model.js"
import messageModel from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
export const getUsersForSideBar=async(req, res)=>{
    try{
        const loggedInUserId=req.user._id
        const filteredUsers=await userModel.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers)
    }
    catch(err){
        console.log("error to getUsersForSidebar", err.message)
        res.status(500).json({message:"server internal error"})
    }

}
export const getMessages=async(req, res)=>{
    try{
        const {id:userToChatId}=req.params
        const myId=req.user._id
        const messages=await userModel.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        
        })
        res.status(200).json(messages)
    }
    catch(err){

    }
}
export const sendMessage=async(req,res)=>{
    try{
        const {text, image}=req.body
    const {id:receiverId}=req.params
    const senderId =req.user._id
    let imageUrl
    if(image){
        const uploadResponse=await cloudinary.uploader.upload(image)
        imageUrl=uploadResponse.secure_url
    }
    const newMessage=new messageModel({
        senderId,
        receiverId,
        text,
        image:imageUrl
    })
    await newMessage.save()
    res.status(201).json(newMessage)
    }
    catch(error){
        console.log("error sending message", error.message)
        res.status(500).json("internal server error")

    }
    
} 