import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



//app config

const app=express()
const port=4000

//middleware

app.use(express.json())
app.use(cors({
    origin: '*', // only for development
    credentials: true
}));



//db connection
connectDB();


//Api Endpoints
app.use("/api/food",foodRouter)//add new foods
app.use("/images",express.static('uploads')) //access uploaded images
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`Server is started on port ${port}`)
})


//mongodb+srv://dinidu1234:<db_password>@clusterfoodordering.7agyz.mongodb.net/?