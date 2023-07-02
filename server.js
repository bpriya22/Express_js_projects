const express= require('express')
const mongoose=require('mongoose')
const methodOverride=require("method-override")
const taskRouter=require("./routes/taskRoutes")
let app=express()

//db connection

async function db(){
    await mongoose.connect("mongodb://127.0.0.1:27017/taskDB")//(mongoose.connect gives a promise->so we use async await)
    console.log("db connected")
}
db()

//register template engine->to use home.ejs
app.set("view engine","ejs")

app.get("/home",(req,res)=>{
    res.send("hello")
})

//To get the form data.
app.use(express.urlencoded({extended:false}))    //extended false says that the data submitter is in the type `string'
app.use(methodOverride('_method'))


//inbuilt middleware
//static files
app.use(express.static("public"))   //css file.



app.use("/task",taskRouter)        
//http://localhost:5000/task/
//http://localhost:5000/task/update


app.listen(5000,()=>{
    console.log("this server is running on port 5000")
})