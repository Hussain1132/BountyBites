import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "https://bountybites-frontend.onrender.com/";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Razorpay requires only total amount
    const options = {
      amount: req.body.amount * 100, // Convert ₹ to paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const session = await razorpay.orders.create(options); // ✅ This is correct for Razorpay

    // Keeping line_items just for consistency — not used in Razorpay
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity, // ✅ spelling fix
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1, // ✅ spelling fix
    });

    res.json({
  success: true,
  newOrderId: newOrder._id, // ✅ Add this
  session_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
  session_id: session.id,
  order: session,
  line_items,
});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Order verified and payment successful." });
    } else {
      await orderModel.findByIdAndDelete(orderId); // optional: clean-up
      res.json({ success: false, message: "Payment verification failed!" });
    }
  } catch (err) {
    console.log("Verification error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// user orders for frontEnd UI

const userOrders=async (req,res)=>{
      try {
          const orders=await orderModel.find({userId:req.body.userId})
          res.json({success:true,data:orders})
      } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
      }
}

// List of ordered items for admin
const listOrders=async(req,res)=>{
      try {
          const orders=await orderModel.find({});
          res.json({success:true,data:orders});
      } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
      }
}
// api for order status update by admin

const updateStatus=async(req,res)=>{
      try {
          await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
          res.json({success:true,message:"Status Updated"})
      } catch (error) {
          console.log(error);
          res.json({success:false,message:"Error"})
      }
}
export { placeOrder ,verifyOrder,userOrders,listOrders,updateStatus};
