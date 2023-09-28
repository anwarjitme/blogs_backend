const express = require("express");
const { AppModel } = require("../model/appModel");
const {authenticate}=require("../middlewere/authenticator")
const appRouter = express.Router();
appRouter.post("/blogs",async(req,res)=>{
    const Curr_date = new Date();
const blog={
    username:req.body.username,
    title:req.body.title,
    content:req.body.content,
category:req.body.category,
date:Curr_date,
likes:req.body.likes,
comments:req.body.comments
}

  try{
const data= new AppModel(blog)
await data.save()
res.status(200).json({"msg":" blog added succesffuly"})
  }catch(error){
res.status(400).json({"msg":'something wrong!'})
  }
})

appRouter.get("/blogs",async(req,res)=>{
  
try{
       const query = {};
       if (req.query.category) {
         query.category = req.query.category;
       }
   
       if (req.query.title) {
         query.title = { $regex: req.query.title, $options: 'i' };
       }
       let sortKey = { date: 1 }; 
       if (req.query.sort && req.query.order) {
        const sortBy = req.query.sort;
        const sortOrder = req.query.order === 'asc' ? 1 : -1;
        sortKey = { [sortBy]: sortOrder };
      }
       const blogs = await AppModel.find(query).sort(sortKey).exec();
       res.json(blogs);
}catch(err){
res.status(400).json({"msg":"somthing wronge"})
}
})

appRouter.delete('/blogs/:id',authenticate, async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;
    const blog = await AppModel.findOne({ _id: blogId, userId });

    if (!blog) {
      return res.status(404).json({ message: 'r not authorized' });
    }
    await blog.remove();
    res.json({ message: 'item removed' });

  } catch (error) {
    console.log(error);
    return res.json({ message: 'Server error' });
  }
});





module.exports={
          appRouter
}



