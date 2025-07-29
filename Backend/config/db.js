import mongoose from "mongoose";

export const connectDb =async()=>{
    await mongoose.connect("mongodb+srv://kothaajay456:zYKZ04JGrtBKA7as@cluster0.rpapztd.mongodb.net/food-del")
    .then(()=>console.log("DB connected"));
}