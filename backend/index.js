const express=require("express")
const app=express()
const {connection}=require("./config/db")
const {userRouter}=require("./route/userRoute")
const {appRouter}=require("./route/appRoute")
app.get("/",(req,res)=>{
res.send("welcom to blog app")
})
app.use(express.json())
app.use("/api",userRouter)
app.use("/api",appRouter)
app.listen(8080,async()=>{
try{
await connection
console.log("connected with Mongo Db")
}catch(err){
console.log(err)
}
})