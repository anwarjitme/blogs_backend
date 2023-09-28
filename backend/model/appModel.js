const mongoose=require("mongoose")
const appSchema=mongoose.Schema({
    username:String,
    title:String,
    content:String,
    category:String,
    likes:Number,
    comments: [{
        username: String,
        content: String,
      }],
    
})
const AppModel=mongoose.model("blog",appSchema)
module.exports={
AppModel
}
