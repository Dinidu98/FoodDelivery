import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY) 


const placeOrder=async(req,res)=>{
    try{
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"lkr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.posh({
            price_data:{
                currency:"lkr",
                product_data:{
                    name:"Delivery Chargers"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`http://127.0.0.1:5173/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`http://127.0.0.1:5173/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})
    }catch(error){
console.log(error);
res.json({success:false,message:"error payment"})

    }
    
}

export {placeOrder}
