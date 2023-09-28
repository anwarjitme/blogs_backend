const {UserModel}=require("../model/userModel")
const express=require("express")
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router( )

userRouter.post("/register",async(req,res)=>{

    try{
const {username,avater,email,password}=req.body
const hashPass=await bcrypt.hash(password,3)
const user=new UserModel({
    username:username,avater:avater,email:email,password:hashPass
})
await user.save()
res.status(201).json({"message":"registration successful"})
    }catch(err){
        res.status(500).json({"msg":"not able to register"});
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({"msg":"something went wrong !"});
      }
  
      const decoded_pass = await bcrypt.compare(password, user.password);
      if (!decoded_pass) {
        return res.status(401);
      }
      const token = jwt.sign({ userId: user._id }, "blog");
      res.send({ token: `${token}` });
    } catch (err) {
    res.json({"error":"something went wrong"})
    }
  });
  module.exports={
    userRouter
  }