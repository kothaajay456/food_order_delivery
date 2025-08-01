import userModel from "../models/userModel.js"

const addtoCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "REmoved from cart" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const getCart = async (req, res) => {
 try {
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
     res.json({success:true,cartData});
 } catch (error) {
   console.log(error);
    res.json({success:false,message:"Error"});
 }
}

export { addtoCart, removeFromCart, getCart }