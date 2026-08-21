const express=require("express");
const dotenv=require("dotenv").config();
const dbConnect=require("./config/dbConnect");
const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
dbConnect();

const app=express();

//middlewares
app.use(express.json());
//routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);


//starting the server
const PORT = process.env.PORT || 7002
app.listen(PORT,() =>{
    console.log(`server is running at ${PORT} `);
}

);

