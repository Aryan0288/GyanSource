const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const fileUpload=require('express-fileupload');
const dotenv=require('dotenv');
dotenv.config();

const userRoutes=require('./routes/User');
const profileRoutes=require('./routes/Profile');
const paymentRoutes=require('./routes/Payments');
const courseRoutes=require('./routes/Course');
const contactUs=require('./routes/Contact');

const database=require('./config/database');
const {cloudinaryConnect}=require('./config/cloudinary');

const PORT=process.env.PORT || 4000;

// database connection
database.dbConnection();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"https://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// cloudinary connection
cloudinaryConnect();

// routes

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/contact",contactUs);
 

app.get("/",(req,res)=>{
    return res.json({
        msg:"this is home page",
    })
})

app.listen(PORT,()=>{
    console.log(`App running at ${PORT}`);
})
