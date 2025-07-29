import mongoose from "mongoose";

export const connectDb =async()=>{
    await mongoose.connect(process.env.MONGO_DB)
    .then(()=>console.log("DB connected"));
}