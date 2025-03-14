import mongoose from "mongoose";


export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://hussain:bountybites@clusterbounty.qwbxh.mongodb.net/BountyBites').then(()=>{
        console.log("DB Connected")
    })
}
