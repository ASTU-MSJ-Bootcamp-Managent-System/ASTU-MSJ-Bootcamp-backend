const express = require("express");
const verifyToken=require("../middlewares/authMiddleware");
const authorizeRoles=require("../middlewares/roleMiddleware");
const router=express.Router();

//only admin can access thi one
router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
    res.json({message:"welcome admin"})
}
);
//both admin and mentor access
router.get("/mentor",verifyToken,authorizeRoles("admin","mentor"),(req,res)=>{
    res.json({message:"welcome mentor"})
}
);
//all can access
router.get("/student",verifyToken,authorizeRoles("admin","mentor","student"),(req,res)=>{
    res.json({message:"welcome student"})
}
);

module.exports=router;