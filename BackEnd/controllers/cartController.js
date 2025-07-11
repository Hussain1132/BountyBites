import userModel from "../models/userModel.js"

//adding items to user cart
const addToCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId)
        let cartData= await userData.cartData;
        
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"})
    }
}

//removing items from user cart

const removeFromCart=async(req,res)=>{
    try {
        let userData =await userModel.findById(req.body.userId)
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
            if (cartData[req.body.itemId] <= 0) {
                delete cartData[req.body.itemId];
            }
            
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
            res.json({success:true,message:"Removed From Cart"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Item not in cart"})
    }
}


//fetching the data of userCart


const getCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Nothing in Cart"})
    }
}

export {addToCart,removeFromCart,getCart};