import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"

// login user
const createtoken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
  const {email,password}=req.body;
  try {
    const user=await UserModel.findOne({email});
    if(!user)
    {
       return res.json({success:false,message:"User not exists"});
    }
    const ismatch=await bcrypt.compare(password,user.password);
    if(!ismatch)
    {
        return res.json({success:false,message:"Incorrect Password"});
    }
    const token=createtoken(user._id);
    res.json({success:true,token});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valod email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, salt);
        const newUser =new UserModel({
            name:name,
            email:email,
            password:hashpass,
        });
      const user=  await newUser.save();
      const token=createtoken(user._id);
      res.json({success:true});
    } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"});

    }

}

export { loginUser, registerUser };
