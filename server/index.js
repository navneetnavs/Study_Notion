const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const courseRoutes=require("./routes/Course");
const paymentRoutes=require("./routes/Payment");
const contactUsRoute=require("./routes/Contact");
const database=require("./config/database");
const cookieParser=require("cookie-parser");
const {cloudinaryConnect}=require("./config/cloudinary");
const cors=require("cors");
const fileupload=require("express-fileupload");
require("dotenv").config();

const Port=process.env.PORT||5000;

// database connection
database();

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"*",
        credentials:true
    })

)

// cloudinary connection
cloudinaryConnect();

// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach",contactUsRoute);

// def routes
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(Port, () => {
	console.log(`App is running at ${Port}`)
})