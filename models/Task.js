//creating a schema

const mongoose=require("mongoose")

let taskSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true,
        trim:true
        }
})   //creating a schema

let Task=mongoose.model("task",taskSchema)
module.exports=Task